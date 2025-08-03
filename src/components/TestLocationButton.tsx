import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TestLocationButtonProps {
  onSelectLocation: (
    coords: { latitude: number; longitude: number } | null
  ) => void;
}

export default function TestLocationButton({
  onSelectLocation,
}: TestLocationButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Botón principal */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setOpen(!open)}
      >
        <FontAwesome name="map-marker" size={24} color="white" />
      </TouchableOpacity>

      {open && (
        <View style={styles.menu}>
          {/* Zona Centro */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLocation({ latitude: -34.916699, longitude: -57.954104 });
              setOpen(false);
            }}
          >
            <Text style={styles.menuText}>📍 Zona Centro</Text>
          </TouchableOpacity>

          {/* Prohibido Estacionar */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLocation({ latitude: -34.916341, longitude: -57.947719 });
              setOpen(false);
            }}
          >
            <Text style={styles.menuText}>🚫 Prohibido Estacionar</Text>
          </TouchableOpacity>

          {/* Zona Libre */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLocation({ latitude: -34.91934, longitude: -57.948302 });
              setOpen(false);
            }}
          >
            <Text style={styles.menuText}>✅ Zona Libre</Text>
          </TouchableOpacity>

          {/* Zona Límite */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLocation({ latitude: -34.912632, longitude: -57.945927 });
              setOpen(false);
            }}
          >
            <Text style={styles.menuText}>⚠️ Zona Límite</Text>
          </TouchableOpacity>

          {/* Volver al GPS */}
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: "#4A90E2" }]}
            onPress={() => {
              onSelectLocation(null);
              setOpen(false);
            }}
          >
            <Text style={[styles.menuText, { color: "white" }]}>
              🎯 Volver a GPS
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 230, // 🔽 Ajustar la posición en pantalla
    right: 20,
    alignItems: "flex-end",
    zIndex: 10,
  },
  mainButton: {
    backgroundColor: "#4A90E2",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menu: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 200,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});
