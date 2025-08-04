import { FontAwesome, FontAwesome6, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import inside from 'point-in-polygon';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, {
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
  Region
} from 'react-native-maps';

import DetectedZoneModal from '../src/components/DetectedZoneModal';
import Header from '../src/components/Header';
import InfoButton from '../src/components/InfoButton';
import ParkingInfoModal from '../src/components/ParkingInfoModal';
import PuntoLimiteModal from '../src/components/PuntoLimiteModal';
import TestLocationButton from '../src/components/TestLocationButton';

import {
  pedirPermisosNotificaciones,
  programarNotificacion
} from '../src/utils/notifications';

import {
  generarPoligonoAnillo,
  generarPoligonoCalle,
  zonasDeEstacionamiento as initialZones,
  Zona,
} from '../src/data/EstacionamientoMedido';

import {
  puntosLimite,
  verificarProximidadPuntoLimite,
} from '../src/data/PuntosLimite';


const plazaMorenoLocation = {
  latitude: -34.92145,
  longitude: -57.95459,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen() {
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [carLocation, setCarLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // ✅ Estado para guardar las coordenadas de la ruta a dibujar
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);

  // ✅ ubicación de prueba (si se selecciona desde el menú)
  const [testLocation, setTestLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // ✅ Modal para mostrar la zona detectada al estacionar
  const [modalInfo, setModalInfo] = useState<{
    visible: boolean;
    zone: Zona | null;
  }>({ visible: false, zone: null });

  // ✅ Modal de advertencia de punto límite
  const [showPuntoLimiteModal, setShowPuntoLimiteModal] = useState(false);
  const [puntoLimiteData, setPuntoLimiteData] = useState({
    descripcion: "",
    pendingAction: null as (() => void) | null,
  });

  // ✅ Modal de info general de zonas
  const [showInfoModal, setShowInfoModal] = useState(false);

  // ✅ Controlar visualización de puntos límite
  const [showPuntosLimite, setShowPuntosLimite] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  const [zonas, setZonas] = useState<Zona[]>(initialZones);

  useEffect(() => {
    pedirPermisosNotificaciones();
  }, []);

  useEffect(() => {
    const init = async () => {
      await requestLocationPermission();
      await loadCarLocation();
    };
    init();
  }, []);

  // 👉 ARRAY DE INFO GENERAL PARA EL MODAL
  const zonasInfo = [
    {
      color: "rgba(255, 105, 180, 1)",
      label: "Zona Rosa",
      schedule: "LUNES A VIERNES de 7 a 14hs.",
    },
    {
      color: "rgba(0, 0, 255, 1)",
      label: "Zona Azul",
      schedule: "LUNES A VIERNES de 7 a 20hs. SÁBADOS de 9 a 20hs.",
    },
    {
      color: "rgba(0, 128, 0, 1)",
      label: "Zona Verde",
      schedule: "LUNES A SÁBADOS de 9 a 20hs.",
    },
    {
      color: "rgba(255, 255, 0, 1)",
      label: "Zona Amarilla",
      schedule: "LUNES A VIERNES de 7 a 20hs.",
    },
    {
      color: "rgba(0, 166, 255, 1)",
      label: "Zona Celeste (City Bell)",
      schedule: "LUNES A VIERNES de 7 a 20hs.",
    },
    {
      color: "rgba(255, 0, 0, 1)",
      label: "Zona Roja",
      schedule: "PROHIBIDO ESTACIONAR",
    },
  ];

  useEffect(() => {
    const init = async () => {
      await requestLocationPermission();
      await loadCarLocation();
    };
    init();
  }, []);

  // ✅ Solicitar permisos de ubicación y obtener GPS
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setMapRegion(plazaMorenoLocation);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const currentUserLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setUserLocation(currentUserLocation);
    setMapRegion({
      ...currentUserLocation,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  // ✅ Cargar la última ubicación del auto guardada
  const loadCarLocation = async () => {
    try {
      const stored = await AsyncStorage.getItem("carLocation");
      if (stored) setCarLocation(JSON.parse(stored));
    } catch (error) {
      console.log("Error cargando ubicación del auto:", error);
    }
  };

  // ✅ Botón “Estacionar”
  const estacionarVehiculo = async () => {
    // 🔄 usa ubicación de prueba si está activa, sino la del GPS
    const activeLocation = testLocation || userLocation;
    if (!activeLocation) return;
    
    // Si había una ruta dibujada, la oculta
    if (routeCoordinates.length > 0) setRouteCoordinates([]);

    // 🚨 Verificar si está cerca de un punto límite
    const puntoLimiteCercano = verificarProximidadPuntoLimite(activeLocation);
    if (puntoLimiteCercano) {
      // Mostrar modal de punto límite
      setPuntoLimiteData({
        descripcion: puntoLimiteCercano.descripcion || "",
        pendingAction: () => continuarConEstacionamiento(activeLocation),
      });
      setShowPuntoLimiteModal(true);
      return;
    }

    continuarConEstacionamiento(activeLocation);
  };

  // ✅ Función auxiliar para continuar con el estacionamiento
  const continuarConEstacionamiento = async (activeLocation: {
    latitude: number;
    longitude: number;
  }) => {
    let detectedZone: Zona | null = null;
    const userPoint = [activeLocation.longitude, activeLocation.latitude];

    for (const zona of zonas) {
      for (const calle of zona.calles) {
        const polygon = generarPoligonoCalle(calle).map((p) => [
          p.longitude,
          p.latitude,
        ]);
        if (inside(userPoint, polygon)) {
          detectedZone = zona;
          break;
        }
      }
      if (detectedZone) break;
    }

    // 🚗 Guardar ubicación del auto SIEMPRE, aunque no esté en zona
    setCarLocation(activeLocation);
    try {
      await AsyncStorage.setItem("carLocation", JSON.stringify(activeLocation));
    } catch (error) {
      console.log("Error guardando ubicación del auto:", error);
    }

    // 📍 Si está en una zona medida, abrir modal con info
    if (detectedZone) {
  setModalInfo({ visible: true, zone: detectedZone });

  if (detectedZone.nombre.toLowerCase().includes("tribunales")) {
    const ahora = new Date();
    const horaNotificacion = new Date(ahora.getTime() + 5000); // 5 segundos después

    //if (ahora.getHours() < 23) {
      programarNotificacion(
        "⏰ Cortar SEM",
        "Recordá cortar el SEM, el horario de pago termina a las 14:00.",
        horaNotificacion
      );
    //}
  }


    } else {
      // 📍 Si NO está en zona, igual mostrar alerta de que estacionó en zona libre
      Alert.alert(
        "Estacionado en zona libre",
        "No hay estacionamiento medido en esta ubicación."
      );
    }
  };

  // ✅ Botón “volver a mi ubicación” (ahora también limpia la ruta)
  const goToMyLocation = () => {
    if (routeCoordinates.length > 0) setRouteCoordinates([]); // Oculta la ruta si se está mostrando
    if (testLocation) {
      setTestLocation(null); // vuelve a GPS real si hay test activo
    } else if (userLocation) {
      mapRef.current?.animateToRegion(
        { ...userLocation, latitudeDelta: 0.005, longitudeDelta: 0.005 },
        1000
      );
    }
  };

  // 🗺️ FUNCIÓN ACTUALIZADA: Obtener y dibujar la ruta con OSRM (sin API Key)
  const getDirectionsToCar = async () => {
    // Si la ruta ya se está mostrando, la ocultamos y terminamos.
    if (routeCoordinates.length > 0) {
      setRouteCoordinates([]);
      return;
    }

    if (!carLocation) {
      Alert.alert("Auto no encontrado", "Primero debés estacionar tu auto para poder obtener la ruta.");
      return;
    }
    if (!userLocation) {
        Alert.alert("Ubicación no disponible", "No se puede obtener tu ubicación actual para trazar la ruta.");
        return;
    }

    try {
      const startCoords = `${userLocation.longitude},${userLocation.latitude}`;
      const endCoords = `${carLocation.longitude},${carLocation.latitude}`;
      
      // URL del servidor público de OSRM. No requiere API Key.
      const url = `http://router.project-osrm.org/route/v1/driving/${startCoords};${endCoords}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      const json = await response.json();

      if (json.routes && json.routes.length > 0) {
          const geometry = json.routes[0].geometry.coordinates;
          // OSRM devuelve [longitude, latitude], lo mapeamos al formato que espera Polyline
          const coords = geometry.map((point: number[]) => ({
            latitude: point[1],
            longitude: point[0],
          }));

          setRouteCoordinates(coords);
          
          // Ajustar el mapa para que se vea toda la ruta
          mapRef.current?.fitToCoordinates(coords, {
            edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
            animated: true,
          });
      } else {
          Alert.alert("Ruta no encontrada", "No se pudo calcular una ruta a la ubicación del auto. Código: " + json.code);
      }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Ocurrió un error al obtener la ruta.");
    }
  };


  // ✅ Pantalla de carga si todavía no hay región
  if (!mapRegion) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  // ✅ variable auxiliar para no repetir null checks
  const activeLocation = testLocation || userLocation;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ✅ HEADER */}
      <Header />

      {/* ✅ BOTÓN DE INFO */}
      <InfoButton onPress={() => setShowInfoModal(true)} />

      {/* ✅ BOTÓN DE TEST LOCATIONS */}
      <TestLocationButton
        onSelectLocation={(coords) => setTestLocation(coords)}
        onTogglePuntosLimite={() => setShowPuntosLimite(!showPuntosLimite)}
        showingPuntosLimite={showPuntosLimite}
      />

      {/* 🎯 Botón para volver a mi ubicación */}
      <TouchableOpacity style={styles.locationButton} onPress={goToMyLocation}>
        <Fontisto name="crosshairs" size={22} color="#333" />
      </TouchableOpacity>

      {/* 🗺️ BOTÓN: Ruta al auto */}
      <TouchableOpacity style={styles.directionsButton} onPress={getDirectionsToCar}>
        <FontAwesome name="road" size={22} color="#333" />
      </TouchableOpacity>

      {/* 🚗 Botón estacionar */}
      <TouchableOpacity style={styles.parkButton} onPress={estacionarVehiculo}>
        <FontAwesome name="car" size={24} color="white" />
        <Text style={styles.parkButtonText}>Estacionar</Text>
      </TouchableOpacity>

      {/* 🗺️ MAPA */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={mapRegion}
        region={
          testLocation
            ? { ...testLocation, latitudeDelta: 0.005, longitudeDelta: 0.005 }
            : mapRegion
        }
        mapType="standard"
        pitchEnabled={false}
      >
        {zonas.map((zona) => (
          <React.Fragment key={zona.nombre}>
            {/* Calles */}
            {zona.calles.map((calle, i) => {
              const coords = generarPoligonoCalle(calle);
              return (
                <Polygon
                  key={`${zona.nombre}-calle-${i}`}
                  coordinates={coords}
                  fillColor={zona.color}
                  strokeWidth={0}
                />
              );
            })}

            {/* Rotondas */}
            {zona.rotondas &&
              zona.rotondas.map((rotonda, j) => {
                const { exterior, interior } = generarPoligonoAnillo(rotonda);
                return (
                  <Polygon
                    key={`${zona.nombre}-rotonda-${j}`}
                    coordinates={exterior}
                    holes={[interior]}
                    fillColor={zona.color}
                    strokeWidth={0}
                  />
                );
            })}
          </React.Fragment>
        ))}

        {routeCoordinates.length > 0 && (
            <Polyline
                coordinates={routeCoordinates}
                strokeColor="#3498db"
                strokeWidth={6}
            />
        )}

        {/* ✅ Marker del usuario (test o real) */}
        {activeLocation && (
          <Marker
            coordinate={activeLocation}
            title={testLocation ? "Ubicación de prueba" : "Tu Ubicación"}
          >
            <FontAwesome
              name="circle"
              size={24}
              color={testLocation ? "orange" : "#4A90E2"}
            />
          </Marker>
        )}

        {/* ✅ Marker del auto estacionado */}
        {carLocation && (
          <Marker coordinate={carLocation} title="Auto Estacionado">
            <FontAwesome6 name="car-on" size={32} color="#0000FF" />
          </Marker>
        )}

        {/* ✅ Marcadores de puntos límite */}
        {showPuntosLimite &&
          puntosLimite.map((punto, index) => (
            <Marker
              key={`punto-limite-${index}`}
              coordinate={{
                latitude: punto.latitude,
                longitude: punto.longitude,
              }}
              title="Punto Límite"
              description={punto.descripcion || "Revisar ubicación manualmente"}
            >
              <FontAwesome name="warning" size={20} color="#FF8C00" />
            </Marker>
          ))}
      </MapView>

      {/* ✅ MODAL DE INFO GENERAL */}
      <ParkingInfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        zonas={zonasInfo}
        onOpenMap={() => Linking.openURL("https://ibb.co/jvyg3jV8")}
      />


      {/* ✅ MODAL DE ZONA DETECTADA */}
      {modalInfo.zone && (
        <DetectedZoneModal
          visible={modalInfo.visible}
          onClose={() => setModalInfo({ visible: false, zone: null })}
          zoneName={modalInfo.zone.nombre}
          schedule={modalInfo.zone.horarios}
        />
      )}

      {/* ✅ MODAL DE PUNTO LÍMITE */}
      <PuntoLimiteModal
        visible={showPuntoLimiteModal}
        descripcion={puntoLimiteData.descripcion}
        onClose={() => {
          setShowPuntoLimiteModal(false);
          if (puntoLimiteData.pendingAction) puntoLimiteData.pendingAction();
        }}
        onOpenMap={() => Linking.openURL("https://ibb.co/jvyg3jV8")}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 95,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadingText: { color: "white", marginTop: 10 },

  /* 🎯 Botón ubicación */
  locationButton: {
    position: "absolute",
    top: 160,
    right: 20,
    backgroundColor: "white",
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  /* 🗺️ Botón de ruta al auto */
  directionsButton: {
    position: 'absolute',
    top: 220, 
    right: 20,
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  /* 🚗 Botón estacionar */
  parkButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    zIndex: 1,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  parkButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
