import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

interface DetectedZoneModalProps {
  visible: boolean;
  onClose: () => void;
  zoneName: string;
  schedule: string;
}

export default function DetectedZoneModal({
  visible,
  onClose,
  zoneName,
  schedule,
}: DetectedZoneModalProps) {
  const abrirSEM = () => {
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=ar.edu.unlp.semmobile.laplata"
    );
  };

  const esProhibido = schedule.toUpperCase().includes("PROHIBIDO");

  // ✅ Lógica de horarios
  const now = new Date();
  const day = now.getDay(); // 0=Dom, 1=Lun, ...
  const hour = now.getHours();

  let mensajeHorario = "✅ Estás fuera de horario de pago";

  if (esProhibido) {
    mensajeHorario = "🚫 PROHIBIDO ESTACIONAR";
  } else if (schedule.toUpperCase().includes("LUNES A VIERNES") && schedule.toUpperCase().includes("SÁBADOS")) {
    // Zona Centro
    if ((day >= 1 && day <= 5 && hour >= 7 && hour < 20) || (day === 6 && hour >= 9 && hour < 20)) {
      mensajeHorario = "💰 Ahora debes pagar estacionamiento";
    }
  } else if (schedule.toUpperCase().includes("LUNES A VIERNES")) {
    // City Bell, Eje Cívico
    if (day >= 1 && day <= 5 && hour >= 7 && hour < 20) {
      mensajeHorario = "💰 Ahora debes pagar estacionamiento";
    }
  } else if (schedule.toUpperCase().includes("LUNES A SÁBADOS")) {
    // Calle 12
    if (day >= 1 && day <= 6 && hour >= 9 && hour < 20) {
      mensajeHorario = "💰 Ahora debes pagar estacionamiento";
    }
  } else if (schedule.toUpperCase().includes("LUNES A VIERNES") && schedule.includes("14hs")) {
    // Tribunales
    if (day >= 1 && day <= 5 && hour >= 7 && hour < 14) {
      mensajeHorario = "💰 Ahora debes pagar estacionamiento";
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{zoneName}</Text>
          <Text style={styles.schedule}>{schedule}</Text>

          {/* ✅ MOSTRAMOS EL ESTADO */}
          <Text
            style={[
              styles.statusText,
              esProhibido && { color: "red", fontWeight: "bold" },
            ]}
          >
            {mensajeHorario}
          </Text>

          {/* ✅ Solo mostramos SEM si NO es prohibido */}
          {!esProhibido && (
            <TouchableOpacity style={styles.semButton} onPress={abrirSEM}>
              <Text style={styles.semButtonText}>Abrir SEM</Text>
            </TouchableOpacity>
          )}

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  schedule: { fontSize: 16, marginBottom: 10, textAlign: "center" },
  statusText: { fontSize: 16, marginBottom: 15, textAlign: "center", color: "#333" },
  semButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  semButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  closeButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  closeButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
