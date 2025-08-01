import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ParkingInfoModalProps {
  visible: boolean;
  onClose: () => void;
  zoneName: string;
  schedule: string;
}

const ParkingInfoModal: React.FC<ParkingInfoModalProps> = ({ visible, onClose, zoneName, schedule }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          <FontAwesome name="info-circle" size={32} color="#4A90E2" style={styles.icon} />
          
          <Text style={styles.modalTitle}>Horarios por Zona</Text>
          <Text style={styles.zoneName}>{zoneName}</Text>
          <Text style={styles.modalText}>{schedule}</Text>

          <Text style={styles.prohibitedText}>Zona Roja: PROHIBIDO ESTACIONAR</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  icon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  zoneName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  prohibitedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D0021B',
    textAlign: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});


export default ParkingInfoModal;