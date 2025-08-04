import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PuntoLimiteModalProps {
  visible: boolean;
  onClose: () => void;
  descripcion: string;
  onOpenMap?: () => void;  // Nuevo prop opcional
}

export default function PuntoLimiteModal({
  visible,
  onClose,
  descripcion,
  onOpenMap,
}: PuntoLimiteModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.title}>Zona Límite Detectada</Text>
          <Text style={styles.message}>
            Te encuentras cerca de una zona límite. Por favor, revisa
            manualmente tu ubicación para asegurarte de que el estacionamiento
            esté permitido en este lugar.
          </Text>


          {/* BOTÓN NUEVO para abrir mapa */}
          {onOpenMap && (
            <TouchableOpacity style={styles.mapButton} onPress={onOpenMap}>
              <Text style={styles.mapButtonText}>Ver Mapa Municipal</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.continueButton} onPress={onClose}>
            <Text style={styles.continueButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: 320,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  warningIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FF8C00", // Color naranja para advertencia
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 22,
    color: "#333",
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
    color: "#666",
  },
  continueButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  mapButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    marginBottom: 10,
    
  },
  mapButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
