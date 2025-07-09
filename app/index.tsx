import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import EstacionarButton from '../src/components/EstacionarButton';

import { mapStyle } from '../src/components/mapStyle';
import { streetData } from '../src/data/coloresCalle';

const plazaMorenoLocation = {
  latitude: -34.92145,
  longitude: -57.95459,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen() {
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [carLocation, setCarLocation] = useState<Region | null>(null);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    const init = async () => {
      await requestLocationPermission();
      await loadCarLocation();
    };
    init();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permiso de ubicación denegado.');
      setMapRegion(plazaMorenoLocation);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const currentUserLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    setUserLocation(currentUserLocation);
    setMapRegion(currentUserLocation);
  };

  const loadCarLocation = async () => {
    try {
      const stored = await AsyncStorage.getItem('carLocation');
      if (stored) {
        const parsed = JSON.parse(stored);
        setCarLocation(parsed);
      }
    } catch (error) {
      console.log('Error cargando ubicación del auto:', error);
    }
  };

  const estacionarVehiculo = async () => {
  if (userLocation) {
    const newLocation: Region = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setCarLocation(newLocation);
    try {
      await AsyncStorage.setItem('carLocation', JSON.stringify(newLocation));
      console.log('Ubicación del auto guardada');
    } catch (error) {
      console.log('Error guardando ubicación del auto:', error);
    }
  }
};

  const goToMyLocation = () => {
    if (userLocation) {
      mapRef.current?.animateToRegion(userLocation, 1000);

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
      <TouchableOpacity style={styles.locationButton} onPress={goToMyLocation}>
        <Text style={styles.buttonText}>📍</Text>
      </TouchableOpacity>

      <EstacionarButton onPress={estacionarVehiculo} />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        customMapStyle={mapStyle}
        region={mapRegion}
        mapType="standard"
        pitchEnabled={false}
      >
        {streetData.map((street, index) => (
          <Polyline
            key={index}
            coordinates={street.points}
            strokeColor={street.color}
            strokeWidth={street.width}
          />
        ))}

        <Marker
          coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
          title="Tu Ubicación"
          description="Aquí te encontrás"
        />

        {carLocation && (
          <Marker
            coordinate={carLocation}
            title="Auto Estacionado"
            description="Ubicación guardada"
            pinColor="blue"
          />
        )}
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
  estacionarButton: {
    position: 'absolute',
    top: 60,
    right: 20,
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
  },
});
