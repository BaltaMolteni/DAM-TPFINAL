interface Point {
  latitude: number;
  longitude: number;
}

export interface Calle {
  start: Point; // inicio de la calle
  end: Point; // fin de la calle
  width: number; // ancho en metros
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
    nombre: "Zona Centro",
    color: "rgba(0, 0, 255, 1)",
    horarios: "LUNES A VIERNES de 7 a 20hs. SÁBADOS de 9 a 20hs.",
    calles: [
      {
        start: { latitude: -34.912541, longitude: -57.955129 },
        end: { latitude: -34.91397, longitude: -57.953185 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.911534, longitude: -57.955213 },
        end: { latitude: -34.919258, longitude: -57.954751 },
        width: 10,
      },
      {
        start: { latitude: -34.914227, longitude: -57.955126 },
        end: { latitude: -34.917284, longitude: -57.951068 },
        width: 10,
      },
      {
        start: { latitude: -34.916096, longitude: -57.954931 },
        end: { latitude: -34.918184, longitude: -57.952114 },
        width: 10,
      },
      {
        start: { latitude: -34.917788, longitude: -57.95486 },
        end: { latitude: -34.919112, longitude: -57.953115 },
        width: 10,
      },
      {
        start: { latitude: -34.915457, longitude: -57.949121 },
        end: { latitude: -34.919964, longitude: -57.95415 },
        width: 10,
      },
      {
        start: { latitude: -34.919413, longitude: -57.954764 },
        end: { latitude: -34.912028, longitude: -57.946675 },
        width: 10,
      },
      {
        start: { latitude: -34.914261, longitude: -57.947902 },
        end: { latitude: -34.912573, longitude: -57.945977 },
        width: 10,
      },
      {
        start: { latitude: -34.919413, longitude: -57.954764 },
        end: { latitude: -34.912028, longitude: -57.946675 },
        width: 10,
      },
      {
        start: { latitude: -34.912542, longitude: -57.945938 },
        end: { latitude: -34.910071, longitude: -57.949301 },
        width: 10,
      },
      {
        start: { latitude: -34.913466, longitude: -57.94698 },
        end: { latitude: -34.910301, longitude: -57.951235 },
        width: 10,
      },
      {
        start: { latitude: -34.913877, longitude: -57.948685 },
        end: { latitude: -34.910589, longitude: -57.953061 },
        width: 10,
      },
      {
        start: { latitude: -34.910009, longitude: -57.948834 },
        end: { latitude: -34.910693, longitude: -57.954251 },
        width: 10,
      },
      {
        start: { latitude: -34.907112, longitude: -57.94901 },
        end: { latitude: -34.91387, longitude: -57.948578 },
        width: 10,
      },
    ],
  },

  {
    nombre: "Prohibido Estacionar",
    color: "rgba(255, 0, 0, 1)",
    horarios: "Prohibido estacionar en todo momento.",
    calles: [
      {
        start: { latitude: -34.911281, longitude: -57.954544 },
        end: { latitude: -34.914773, longitude: -57.949806 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.91488, longitude: -57.949665 },
        end: { latitude: -34.916708, longitude: -57.947238 },
        width: 10,
      },
      {
        start: { latitude: -34.914051, longitude: -57.953153 },
        end: { latitude: -34.9163, longitude: -57.95013 },
        width: 10,
      },
    ],
  },

  {
    nombre: "City Bell",
    color: "rgba(0, 166, 255, 1)",
    horarios: "LUNES A VIERNES de 7 a 20hs.",
    calles: [
      {
        start: { latitude: -34.870977, longitude: -58.047267 },
        end: { latitude: -34.871158, longitude: -58.046887 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.871789, longitude: -58.045592 },
        end: { latitude: -34.872009, longitude: -58.045211 },
        width: 10,
      },
      {
        start: { latitude: -34.870944, longitude: -58.045836 },
        end: { latitude: -34.866132, longitude: -58.042417 },
        width: 10,
      },
      {
        start: { latitude: -34.870093, longitude: -58.046634 },
        end: { latitude: -34.871042, longitude: -58.044519 },
        width: 10,
      },
      {
        start: { latitude: -34.869201, longitude: -58.045978 },
        end: { latitude: -34.869677, longitude: -58.044973 },
        width: 10,
      },
      {
        start: { latitude: -34.868738, longitude: -58.045636 },
        end: { latitude: -34.870177, longitude: -58.043903 },
        width: 10,
      },
      {
        start: { latitude: -34.868313, longitude: -58.045363 },
        end: { latitude: -34.869274, longitude: -58.043261 },
        width: 10,
      },
      {
        start: { latitude: -34.867353, longitude: -58.044678 },
        end: { latitude: -34.868366, longitude: -58.042599 },
        width: 10,
      },
      {
        start: { latitude: -34.866528, longitude: -58.04406 },
        end: { latitude: -34.867473, longitude: -58.041966 },
        width: 10,
      },
    ],
  },

  // ZONA ROSA
  {
    nombre: "City Bell",
    color: "rgba(255, 105, 180, 1)",
    horarios: "LUNES A VIERNES de 7 a 14hs.",
    calles: [
      // 14 e/ 44 y av 50
      {
        start: { latitude: -34.921392, longitude: -57.956957 },
        end: { latitude: -34.918992, longitude: -57.960291 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.918992, longitude: -57.960291 },
        end: { latitude: -34.91737420721228, longitude: -57.96239033807741 },
        width: 4, // metros aprox. de la calle
      },
      // av 13 e/ 44 y av 50
      {
        start: { latitude: -34.920405, longitude: -57.955957 },
        end: { latitude: -34.916834, longitude: -57.960789 },
        width: 10, // metros aprox. de la calle
      },
      // 12 e/ 44 y av 50
      {
        start: { latitude: -34.919433, longitude: -57.954897 },
        end: { latitude: -34.91545, longitude: -57.960274 },
        width: 10, // metros aprox. de la calle
      },
      // 11 e/ 44 y av 48
      {
        start: { latitude: -34.917694, longitude: -57.954991 },
        end: { latitude: -34.914533, longitude: -57.959259 },
        width: 4, // metros aprox. de la calle
      },
      // 10 e/ 44 y av 47
      {
        start: { latitude: -34.915993, longitude: -57.955057 },
        end: { latitude: -34.913613, longitude: -57.958253 },
        width: 4, // metros aprox. de la calle
      },
      // 9 e/ 44 y av 46
      {
        start: { latitude: -34.914169, longitude: -57.955201 },
        end: { latitude: -34.912686, longitude: -57.957255 },
        width: 4, // metros aprox. de la calle
      },
      // 49 e/ 15 y 11
      {
        start: { latitude: -34.921438, longitude: -57.958245 },
        end: { latitude: -34.918419, longitude: -57.954964 },
        width: 4, // metros aprox. de la calle
      },
      // 48 e/ 15 y 11
      {
        start: { latitude: -34.921195, longitude: -57.959423 },
        end: { latitude: -34.9203248897087, longitude: -57.95843053592877 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.9203248897087, longitude: -57.95843053592877 },
        end: { latitude: -34.917157, longitude: -57.955016 },
        width: 4, // metros aprox. de la calle
      },
      // 47 e/ 15 y 10
      {
        start: { latitude: -34.920547, longitude: -57.960305 },
        end: { latitude: -34.917752, longitude: -57.957203 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.917752, longitude: -57.957203 },
        end: { latitude: -34.91575, longitude: -57.955085 },
        width: 4, // metros aprox. de la calle
      },
      // 46 e/ 15 y 9
      {
        start: { latitude: -34.919836, longitude: -57.961277 },
        end: { latitude: -34.918991, longitude: -57.960291 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.918991, longitude: -57.960291 },
        end: { latitude: -34.916076, longitude: -57.95718 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.916076, longitude: -57.95718 },
        end: { latitude: -34.914254, longitude: -57.95516 },
        width: 4, // metros aprox. de la calle
      },
      // 45 e/ 15 y 8
      {
        start: { latitude: -34.919046, longitude: -57.962304 },
        end: { latitude: -34.918178, longitude: -57.961322 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.918178, longitude: -57.961322 },
        end: { latitude: -34.913458, longitude: -57.956173 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.913458, longitude: -57.956173 },
        end: { latitude: -34.912557, longitude: -57.955299 },
        width: 4, // metros aprox. de la calle
      },
    ],
  },
];

export function generarPoligonoCalle(
  calle: Calle
): { latitude: number; longitude: number }[] {
  const { start, end, width } = calle;

  // Calcular la latitud promedio (para que el coseno sea más preciso)
  const latProm = (start.latitude + end.latitude) / 2;
  const cosLat = Math.cos((latProm * Math.PI) / 180);

  // Conversión metros → grados
  const offsetLat = width / 111320; // en latitud
  const offsetLng = width / (111320 * cosLat); // en longitud

  // Vector dirección de la calle
  const dx = end.longitude - start.longitude;
  const dy = end.latitude - start.latitude;

  // Vector perpendicular normalizado
  const length = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / length;
  const ny = dx / length;

  // 🔥 Calculamos los 4 vértices del rectángulo corrigiendo ambos ejes
  const p1 = {
    latitude: start.latitude + ny * offsetLat,
    longitude: start.longitude + nx * offsetLng,
  };
  const p2 = {
    latitude: end.latitude + ny * offsetLat,
    longitude: end.longitude + nx * offsetLng,
  };
  const p3 = {
    latitude: end.latitude - ny * offsetLat,
    longitude: end.longitude - nx * offsetLng,
  };
  const p4 = {
    latitude: start.latitude - ny * offsetLat,
    longitude: start.longitude - nx * offsetLng,
  };

  return [p1, p2, p3, p4];
}
