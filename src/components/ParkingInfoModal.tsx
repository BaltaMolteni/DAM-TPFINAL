import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

interface ZonaInfo {
  color: string;
  label: string;
  schedule: string;
}

interface ParkingInfoModalProps {
  visible: boolean;
  onClose: () => void;
  zonas: ZonaInfo[];
  onOpenMap: () => void;
}

const ParkingInfoModal: React.FC<ParkingInfoModalProps> = ({ visible, onClose, zonas, onOpenMap }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>

          {/* Botón de Cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={24} color="#333" />
          </TouchableOpacity>

          {/* Header con icono y título */}
          <View style={styles.header}>
            <FontAwesome name="info-circle" size={28} color="#4A90E2" style={{ marginRight: 8 }} />
            <Text style={styles.modalTitle}>Horarios por Zona</Text>
          </View>

          <Text style={styles.subTitle}>(según color en el mapa)</Text>

          {/* Lista de zonas */}
          <FlatList
            data={zonas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.zoneRow}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.zoneLabel}>{item.label}:</Text>
                  <Text style={styles.zoneSchedule}>{item.schedule}</Text>
                </View>
              </View>
            )}
          />

          {/* Botón para abrir el mapa en navegador */}
          <TouchableOpacity style={styles.mapButton} onPress={onOpenMap}>
            <Text style={styles.mapButtonText}>🗺️ Ver Mapa Municipal</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    marginLeft: 4,
  },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 3,
  },
  zoneLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  zoneSchedule: {
    fontSize: 15,
    color: '#555',
  },
  mapButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  mapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ParkingInfoModal;
