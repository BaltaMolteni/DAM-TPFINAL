import { FontAwesome, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import inside from 'point-in-polygon';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View, StatusBar, Alert } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import ParkingInfoModal from '../src/components/ParkingInfoModal';
import Header from '../src/components/Header';
import InfoButton from '../src/components/InfoButton';
import DetectedZoneModal from '../src/components/DetectedZoneModal';
import TestLocationButton from '../src/components/TestLocationButton';

import { zonasDeEstacionamiento as initialZones, Zona, generarPoligonoCalle } from '../src/data/EstacionamientoMedido';

const plazaMorenoLocation = {
  latitude: -34.92145,
  longitude: -57.95459,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen() {
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [carLocation, setCarLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // ✅ ubicación de prueba (si se selecciona desde el menú)
  const [testLocation, setTestLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // ✅ Modal para mostrar la zona detectada al estacionar
  const [modalInfo, setModalInfo] = useState<{ visible: boolean; zone: Zona | null }>({ visible: false, zone: null });

  // ✅ Modal de info general de zonas
  const [showInfoModal, setShowInfoModal] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  const [zonas, setZonas] = useState<Zona[]>(initialZones);

  // 👉 ARRAY DE INFO GENERAL PARA EL MODAL
  const zonasInfo = [
    { color: 'rgba(255, 105, 180, 1)', label: 'Zona Rosa', schedule: 'LUNES A VIERNES de 7 a 14hs.' },
    { color: 'rgba(0, 0, 255, 1)', label: 'Zona Azul', schedule: 'LUNES A VIERNES de 7 a 20hs. SÁBADOS de 9 a 20hs.' },
    { color: 'rgba(0, 128, 0, 1)', label: 'Zona Verde', schedule: 'LUNES A SÁBADOS de 9 a 20hs.' },
    { color: 'rgba(255, 255, 0, 1)', label: 'Zona Amarilla', schedule: 'LUNES A VIERNES de 7 a 20hs.' },
    { color: 'rgba(0, 166, 255, 1)', label: 'Zona Celeste (City Bell)', schedule: 'LUNES A VIERNES de 7 a 20hs.' },
    { color: 'rgba(255, 0, 0, 1)', label: 'Zona Roja', schedule: 'PROHIBIDO ESTACIONAR' },
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
    if (status !== 'granted') {
      setMapRegion(plazaMorenoLocation);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const currentUserLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setUserLocation(currentUserLocation);
    setMapRegion({ ...currentUserLocation, latitudeDelta: 0.005, longitudeDelta: 0.005 });
  };

  // ✅ Cargar la última ubicación del auto guardada
  const loadCarLocation = async () => {
    try {
      const stored = await AsyncStorage.getItem('carLocation');
      if (stored) setCarLocation(JSON.parse(stored));
    } catch (error) {
      console.log('Error cargando ubicación del auto:', error);
    }
  };

  // ✅ Botón “Estacionar”
  const estacionarVehiculo = async () => {
    // 🔄 usa ubicación de prueba si está activa, sino la del GPS
    const activeLocation = testLocation || userLocation;
    if (!activeLocation) return;

    let detectedZone: Zona | null = null;
    const userPoint = [activeLocation.longitude, activeLocation.latitude];

    for (const zona of zonas) {
      for (const calle of zona.calles) {
        const polygon = generarPoligonoCalle(calle).map(p => [p.longitude, p.latitude]); 
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
      await AsyncStorage.setItem('carLocation', JSON.stringify(activeLocation));
    } catch (error) {
      console.log('Error guardando ubicación del auto:', error);
    }

    // 📍 Si está en una zona medida, abrir modal con info
    if (detectedZone) {
      setModalInfo({ visible: true, zone: detectedZone });
    } else {
      // 📍 Si NO está en zona, igual mostrar alerta de que estacionó en zona libre
      Alert.alert("Estacionado en zona libre", "No hay estacionamiento medido en esta ubicación.");
    }
  };

  // ✅ Botón “volver a mi ubicación”
  const goToMyLocation = () => {
    if (testLocation) {
      setTestLocation(null); // vuelve a GPS real si hay test activo
    } else if (userLocation) {
      mapRef.current?.animateToRegion({ ...userLocation, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
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
      <TestLocationButton onSelectLocation={(coords) => setTestLocation(coords)} />

      {/* 🎯 Botón para volver a mi ubicación */}
      <TouchableOpacity style={styles.locationButton} onPress={goToMyLocation}>
        <Fontisto name="crosshairs" size={22} color="#333" />
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
        {/* Dibujar polígonos */}
        {zonas.map((zona) =>
          zona.calles.map((calle, i) => {
            const coords = generarPoligonoCalle(calle);
            return (
              <Polygon
                key={`${zona.nombre}-${i}`}
                coordinates={coords}
                fillColor={zona.color}
                strokeWidth={0}
              />
            );
          })
        )}

        {/* ✅ Marker del usuario (test o real) */}
        {activeLocation && (
          <Marker
            coordinate={activeLocation}
            title={testLocation ? "Ubicación de prueba" : "Tu Ubicación"}
          >
            <FontAwesome name="circle" size={24} color={testLocation ? "orange" : "#4A90E2"} />
          </Marker>
        )}

        {/* ✅ Marker del auto estacionado */}
        {carLocation && (
          <Marker coordinate={carLocation} title="Auto Estacionado">
            <FontAwesome name="car" size={32} color="#0000FF" />
          </Marker>
        )}
      </MapView>

      {/* ✅ MODAL DE INFO GENERAL */}
      <ParkingInfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        zonas={zonasInfo}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 95,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingText: { color: 'white', marginTop: 10 },

  /* 🎯 Botón ubicación */
  locationButton: {
    position: 'absolute',
    top: 160,
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
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    zIndex: 1,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  parkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
