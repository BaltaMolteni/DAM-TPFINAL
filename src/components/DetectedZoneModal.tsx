import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

interface DetectedZoneModalProps {
  visible: boolean;
  onClose: () => void;
  zoneName: string;
  schedule: string;
}

export default function DetectedZoneModal({ visible, onClose, zoneName, schedule }: DetectedZoneModalProps) {

  const abrirSEM = () => {
    Linking.openURL("https://play.google.com/store/apps/details?id=ar.edu.unlp.semmobile.laplata");
  };

  const esProhibido = schedule.toUpperCase().includes("PROHIBIDO");

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{zoneName}</Text>
          <Text style={styles.schedule}>{schedule}</Text>

          {/* ✅ Solo mostramos el botón de SEM si NO es zona prohibida */}
          {!esProhibido && (
            <TouchableOpacity style={styles.semButton} onPress={abrirSEM}>
              <Text style={styles.semButtonText}>Abrir SEM</Text>
            </TouchableOpacity>
          )}

          {/* 🔴 Botón para cerrar modal */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  container: { 
    width: 300, 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  schedule: { 
    fontSize: 16, 
    marginBottom: 20, 
    textAlign: 'center'
  },

  /* ✅ Botón azul */
  semButton: { 
    backgroundColor: '#4A90E2', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    marginBottom: 10,
    width: 200,
    alignItems: 'center'
  },
  semButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  },

  /* 🔴 Botón rojo */
  closeButton: { 
    backgroundColor: '#FF3B30', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8,
    width: 200,
    alignItems: 'center'
  },
  closeButtonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  },
});
