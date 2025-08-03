// 📍 Puntos límite donde el usuario debe revisar manualmente su ubicación
export interface PuntoLimite {
  latitude: number;
  longitude: number;
  descripcion?: string; // Descripción opcional del punto límite
}

export const puntosLimite: PuntoLimite[] = [
  {
    latitude: -34.912608,
    longitude: -57.945888,
    descripcion: "Zona Límite - Revisar ubicación manualmente",
  },
];

/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine
 * @param lat1 Latitud del primer punto
 * @param lon1 Longitud del primer punto
 * @param lat2 Latitud del segundo punto
 * @param lon2 Longitud del segundo punto
 * @returns Distancia en metros
 */
export function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Verifica si el usuario está cerca de algún punto límite (10 metros o menos)
 * @param userLocation Ubicación actual del usuario
 * @returns Punto límite más cercano si está a 10m o menos, null si no
 */
export function verificarProximidadPuntoLimite(userLocation: {
  latitude: number;
  longitude: number;
}): PuntoLimite | null {
  const DISTANCIA_LIMITE = 10; // 10 metros

  for (const punto of puntosLimite) {
    const distancia = calcularDistancia(
      userLocation.latitude,
      userLocation.longitude,
      punto.latitude,
      punto.longitude
    );

    if (distancia <= DISTANCIA_LIMITE) {
      return punto;
    }
  }

  return null;
}
