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
    color: 'rgba(0, 0, 255, 1)',
    horarios: 'LUNES A VIERNES de 7 a 20hs. SÁBADOS de 9 a 20hs.',
    calles: [
      { 
        start: { latitude: -34.912541, longitude: -57.955129 },
        end:   { latitude: -34.913970, longitude: -57.953185 },
        width: 10, // metros aprox. de la calle
      },
      { 
        start: { latitude: -34.911534, longitude: -57.955213 },
        end:   { latitude: -34.919258, longitude: -57.954751 },
        width: 10,
      },
      { 
        start: { latitude: -34.914227, longitude: -57.955126 },
        end:   { latitude: -34.917284, longitude: -57.951068 },
        width: 10,
      },
      { 
        start: { latitude: -34.916096, longitude: -57.954931 },
        end:   { latitude: -34.918184, longitude: -57.952114 },
        width: 10,
      },
      { 
        start: { latitude: -34.917788, longitude: -57.954860 },
        end:   { latitude: -34.919112, longitude: -57.953115 },
        width: 10,
      },
      { 
        start: { latitude: -34.915457, longitude: -57.949121 },
        end:   { latitude: -34.919964, longitude: -57.954150 },
        width: 10,
      },
      { 
        start: { latitude: -34.919413, longitude: -57.954764 },
        end:   { latitude: -34.912028, longitude: -57.946675 },
        width: 10,
      },
      { 
        start: { latitude: -34.914261, longitude: -57.947902 },
        end:   { latitude: -34.912573, longitude: -57.945977 },
        width: 10,
      },
      { 
        start: { latitude: -34.919413, longitude: -57.954764 },
        end:   { latitude: -34.912028, longitude: -57.946675 },
        width: 10,
      },
      { 
        start: { latitude: -34.912542, longitude: -57.945938 },
        end:   { latitude: -34.910071, longitude: -57.949301 },
        width: 10,
      },
      { 
        start: { latitude: -34.913466, longitude: -57.946980 },
        end:   { latitude: -34.910301, longitude: -57.951235 },
        width: 10,
      },
      { 
        start: { latitude: -34.913877, longitude: -57.948685 },
        end:   { latitude: -34.910589, longitude: -57.953061 },
        width: 10,
      },
      { 
        start: { latitude: -34.910009, longitude: -57.948834 },
        end:   { latitude: -34.910693, longitude: -57.954251 },
        width: 10,
      },
      { 
        start: { latitude: -34.907112, longitude: -57.949010},
        end:   { latitude: -34.913870, longitude: -57.948578 },
        width: 10,
      },
    ],
  },

  {
    nombre: 'Prohibido Estacionar',
    color: 'rgba(255, 0, 0, 1)',
    horarios: 'Prohibido estacionar en todo momento.',
    calles: [
      { 
        start: { latitude: -34.911281, longitude: -57.954544 },
        end:   { latitude: -34.914773, longitude: -57.949806 },
        width: 10, // metros aprox. de la calle
      },
      { 
        start: { latitude: -34.914880, longitude: -57.949665 },
        end:   { latitude: -34.916708, longitude: -57.947238 },
        width: 10,
      },
      { 
        start: { latitude: -34.914051, longitude: -57.953153 },
        end:   { latitude: -34.916300, longitude: -57.950130 },
        width: 10,
      },
    ],
  },

  {
    nombre: 'City Bell',
    color: 'rgba(0, 166, 255, 1)',
    horarios: 'LUNES A VIERNES de 7 a 20hs.',
    calles: [
      { 
        start: { latitude: -34.870977, longitude: -58.047267 },
        end:   { latitude: -34.871158, longitude: -58.046887 },
        width: 10, // metros aprox. de la calle
      },
      { 
        start: { latitude: -34.871789, longitude: -58.045592 },
        end:   { latitude: -34.872009, longitude: -58.045211 },
        width: 10,
      },
      { 
        start: { latitude: -34.870944, longitude: -58.045836 },
        end:   { latitude: -34.866132, longitude: -58.042417 },
        width: 10,
      },
      { 
        start: { latitude: -34.870093, longitude: -58.046634 },
        end:   { latitude: -34.871042, longitude: -58.044519 },
        width: 10,
      },
      { 
        start: { latitude: -34.869201, longitude: -58.045978 },
        end:   { latitude: -34.869677, longitude: -58.044973 },
        width: 10,
      },
      { 
        start: { latitude: -34.868738, longitude: -58.045636 },
        end:   { latitude: -34.870177, longitude: -58.043903 },
        width: 10,
      },
      { 
        start: { latitude: -34.868313, longitude: -58.045363 },
        end:   { latitude: -34.869274, longitude: -58.043261 },
        width: 10,
      },
      { 
        start: { latitude: -34.867353, longitude: -58.044678 },
        end:   { latitude: -34.868366, longitude: -58.042599 },
        width: 10,
      },
      { 
        start: { latitude: -34.866528, longitude: -58.044060 },
        end:   { latitude: -34.867473, longitude: -58.041966 },
        width: 10,
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

