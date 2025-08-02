interface Point {
  latitude: number;
  longitude: number;
}

export interface Calle {
  start: Point;   // inicio de la calle
  end: Point;     // fin de la calle
  width: number;  // ancho en metros
}

export interface Zona {
  nombre: string;
  color: string;
  horarios: string;
  calles: Calle[];
}

// 🚧 EJEMPLO INICIAL 🚧
export const zonasDeEstacionamiento: Zona[] = [
  {
    nombre: 'Zona Centro',
    color: 'rgba(0, 0, 255, 0.5)',
    horarios: 'LUNES A VIERNES de 7 a 20hs. SÁBADOS de 9 a 20hs.',
    calles: [
      { 
        start: { latitude: -34.912541, longitude: -57.955129 },
        end:   { latitude: -34.914026, longitude: -57.953179 },
        width: 10, // metros aprox. de la calle
      },
      { 
        start: { latitude: -34.911534, longitude: -57.955213 },
        end:   { latitude: -34.919258, longitude: -57.954751 },
        width: 12,
      },
    ],
  },
];

export function generarPoligonoCalle(calle: Calle): { latitude: number; longitude: number }[] {
  const { start, end, width } = calle;

  // Calcular la latitud promedio (para que el coseno sea más preciso)
  const latProm = (start.latitude + end.latitude) / 2;
  const cosLat = Math.cos(latProm * Math.PI / 180);

  // Conversión metros → grados
  const offsetLat = width / 111320;              // en latitud
  const offsetLng = width / (111320 * cosLat);   // en longitud

  // Vector dirección de la calle
  const dx = end.longitude - start.longitude;
  const dy = end.latitude - start.latitude;

  // Vector perpendicular normalizado
  const length = Math.sqrt(dx*dx + dy*dy);
  const nx = -dy / length;
  const ny = dx / length;

  // 🔥 Calculamos los 4 vértices del rectángulo corrigiendo ambos ejes
  const p1 = { latitude: start.latitude + ny * offsetLat, longitude: start.longitude + nx * offsetLng };
  const p2 = { latitude: end.latitude + ny * offsetLat, longitude: end.longitude + nx * offsetLng };
  const p3 = { latitude: end.latitude - ny * offsetLat, longitude: end.longitude - nx * offsetLng };
  const p4 = { latitude: start.latitude - ny * offsetLat, longitude: start.longitude - nx * offsetLng };

  return [p1, p2, p3, p4];
}

