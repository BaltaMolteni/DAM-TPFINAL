import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import { mapStyle } from '../src/components/mapStyle';

// Coordenadas de Plaza Moreno, La Plata (ubicación por defecto)
const plazaMorenoLocation = {
  latitude: -34.92145,
  longitude: -57.95459,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen() {
  const [mapRegion, setMapRegion] = useState(null);
  // Estado para guardar específicamente la ubicación del usuario
  const [userLocation, setUserLocation] = useState(null);

  // useRef para tener una referencia directa al componente del mapa
  const mapRef = useRef(null);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado.');
        setMapRegion(plazaMorenoLocation); // si no hay permiso, usa la ubicación por defecto
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentUserLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005, // Un zoom más cercano para la ubicación del usuario
        longitudeDelta: 0.005,
      };

      // Guardamos la ubicación del usuario y la región del mapa
      setUserLocation(currentUserLocation);
      setMapRegion(currentUserLocation);
    };

    requestLocation();
  }, []);

  // Función para animar el mapa hacia la ubicación del usuario
  const goToMyLocation = () => {
    if (userLocation) {
      mapRef.current.animateToRegion(userLocation, 1000);
    }
  };

  if (!mapRegion) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userLocation && (
          <TouchableOpacity style={styles.locationButton} onPress={goToMyLocation}>
            // después esto puede ser un auto o un usuario y otro para el auto
            // cuando guarda la ubicación del auto
            <Text style={styles.buttonText}>📍</Text>
          </TouchableOpacity>
      )}

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        customMapStyle={mapStyle}
        region={mapRegion}
        mapType="standard"
        pitchEnabled={false}
        // aca showsUserLocation que supuestamente muestra la ubicacion pero no me funcionó,
        // por eso agregué el marker con la ubicación del mapRegion (que se actualiza porque es un
        // State)
      >
        <Marker
            coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
            title="Tu Ubicación"
            description="Aquí te encuentras"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  locationButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 24,
  }
});