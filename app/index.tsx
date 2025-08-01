import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
// --- ¡CAMBIO AQUÍ! ---
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import inside from 'point-in-polygon'; // 1. Importamos la nueva librería
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import ParkingInfoModal from '../src/components/ParkingInfoModal';
import { zonasDeEstacionamiento as initialZones, Zona } from '../src/data/EstacionamientoMedido';

// --- ¡CAMBIO AQUÍ! ---
// 2. Eliminamos por completo la función manual isPointInPolygon. ¡Ya no la necesitamos!

const plazaMorenoLocation = {
    latitude: -34.92145,
    longitude: -57.95459,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

export default function MapScreen() {
    // El resto de los estados y la lógica inicial permanecen iguales
    const [mapRegion, setMapRegion] = useState<Region | null>(null);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [carLocation, setCarLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [modalInfo, setModalInfo] = useState<{ visible: boolean; zone: Zona | null }>({ visible: false, zone: null });
    const mapRef = useRef<MapView | null>(null);
    const [zonas, setZonas] = useState<Zona[]>(initialZones);

    useEffect(() => {
        const init = async () => {
            await requestLocationPermission();
            await loadCarLocation();
        };
        init();
    }, []);
    
    useEffect(() => {
        if (userLocation) {
            const size = 0.0001; 
            const testZone: Zona = {
                nombre: "Zona de Prueba",
                color: 'rgba(0, 255, 0, 0.5)',
                horarios: "Esto es solo una prueba. ¡El modal funciona!",
                calles: [{
                    points: [
                        { latitude: userLocation.latitude - size, longitude: userLocation.longitude - size },
                        { latitude: userLocation.latitude + size, longitude: userLocation.longitude - size },
                        { latitude: userLocation.latitude + size, longitude: userLocation.longitude + size },
                        { latitude: userLocation.latitude - size, longitude: userLocation.longitude + size },
                    ]
                }]
            };
            setZonas([...initialZones, testZone]);
        }
    }, [userLocation]);

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

    const loadCarLocation = async () => {
        try {
            const stored = await AsyncStorage.getItem('carLocation');
            if (stored) setCarLocation(JSON.parse(stored));
        } catch (error) {
            console.log('Error cargando ubicación del auto:', error);
        }
    };

    const estacionarVehiculo = async () => {
        if (!userLocation) return;

        let detectedZone: Zona | null = null;
        
        // --- ¡CAMBIO AQUÍ! ---
        // 3. Adaptamos el chequeo para usar la librería
        
        // La librería espera el formato [longitud, latitud]
        const userPoint = [userLocation.longitude, userLocation.latitude];

        for (const zona of zonas) {
            for (const calle of zona.calles) {
                // Convertimos el polígono al formato que espera la librería: [[lon1, lat1], [lon2, lat2], ...]
                const polygonPoints = calle.points.map(p => [p.longitude, p.latitude]);

                // Usamos la función 'inside' de la librería
                if (inside(userPoint, polygonPoints)) {
                    detectedZone = zona;
                    break;
                }
            }
            if (detectedZone) break;
        }

        if (detectedZone) {
            setModalInfo({ visible: true, zone: detectedZone });
        }

        setCarLocation(userLocation);
        try {
            await AsyncStorage.setItem('carLocation', JSON.stringify(userLocation));
        } catch (error) {
            console.log('Error guardando ubicación del auto:', error);
        }
    };

    const goToMyLocation = () => {
        if (userLocation) {
            mapRef.current?.animateToRegion({ ...userLocation, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
        }
    };

    // El resto del componente (la parte del renderizado) permanece exactamente igual
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
                <Fontisto name="crosshairs" size={22} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.parkButton} onPress={estacionarVehiculo}>
                <FontAwesome name="car" size={24} color="white" />
                <Text style={styles.parkButtonText}>Estacionar</Text>
            </TouchableOpacity>

            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={mapRegion}
                mapType="standard"
                pitchEnabled={false}
            >
                {zonas.map((zona) =>
                    zona.calles.map((calle, i) => (
                        <Polygon
                            key={`${zona.nombre}-${i}`}
                            coordinates={calle.points}
                            fillColor={zona.color}
                            strokeWidth={0}
                        />
                    ))
                )}
                {userLocation && (
                    <Marker coordinate={userLocation} title="Tu Ubicación">
                        <FontAwesome name="circle" size={24} color="#4A90E2" />
                    </Marker>
                )}
                {carLocation && (
                    <Marker coordinate={carLocation} title="Auto Estacionado">
                        <FontAwesome name="car" size={32} color="#0000FF" />
                    </Marker>
                )}
            </MapView>
            {modalInfo.zone && (
                <ParkingInfoModal
                    visible={modalInfo.visible}
                    onClose={() => setModalInfo({ visible: false, zone: null })}
                    zoneName={modalInfo.zone.nombre}
                    schedule={modalInfo.zone.horarios}
                />
            )}
        </View>
    );
}

// Los estilos permanecen iguales
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
    loadingText: { color: 'white', marginTop: 10 },
    locationButton: {
        position: 'absolute',
        top: 60,
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