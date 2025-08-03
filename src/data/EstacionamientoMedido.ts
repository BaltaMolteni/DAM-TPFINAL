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

  // ZONA AMARILLA
  {
    nombre: "Eje Cívico",
    color: "rgba(255, 255, 0, 1)",
    horarios: "LUNES A VIERNES de 7 a 20hs.",
    calles: [
      // AV. 7 entre 54 y Dardo Rocha
      {
        start: { latitude: -34.916717, longitude: -57.947225 },
        end: { latitude: -34.917901, longitude: -57.945649 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.917901, longitude: -57.945649 },
        end: { latitude: -34.918482, longitude: -57.944732 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.918482, longitude: -57.944732 },
        end: { latitude: -34.91926, longitude: -57.943782 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.91926, longitude: -57.943782 },
        end: { latitude: -34.920347, longitude: -57.942323 },
        width: 10, // metros aprox. de la calle
      },

      // Calle 54 entre diagonal 73 y calle 6
      {
        start: { latitude: -34.92118, longitude: -57.952023 },
        end: { latitude: -34.918682, longitude: -57.949197 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.918682, longitude: -57.949197 },
        end: { latitude: -34.916817, longitude: -57.947264 },
        width: 4, // metros aprox. de la calle
      },

      // Av. 53 entre Moreno y Av. 7
      {
        start: { latitude: -34.920902, longitude: -57.952969 },
        end: { latitude: -34.916348, longitude: -57.947907 },
        width: 10, // metros aprox. de la calle
      },

      // Av. 53 entre San Martin y 4
      {
        start: { latitude: -34.915221, longitude: -57.946739 },
        end: { latitude: -34.914384, longitude: -57.945739 },
        width: 8, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.914384, longitude: -57.945739 },
        end: { latitude: -34.913435, longitude: -57.944725 },
        width: 8, // metros aprox. de la calle
      },

      // Calle 9 entre 54 y 51
      {
        start: { latitude: -34.918682, longitude: -57.949195 },
        end: { latitude: -34.917323, longitude: -57.951016 },
        width: 4, // metros aprox. de la calle
      },

      // Calle 10 entre 54 y 51
      {
        start: { latitude: -34.919568, longitude: -57.950197 },
        end: { latitude: -34.918227, longitude: -57.952055 },
        width: 4, // metros aprox. de la calle
      },

      // Calle 11 entre 54 y 51
      {
        start: { latitude: -34.920480549875755, longitude: -57.95124818085559 },
        end: { latitude: -34.919138, longitude: -57.953079 },
        width: 4, // metros aprox. de la calle
      },

      // 5 e/ 54 y av 51
      {
        start: { latitude: -34.91482, longitude: -57.945144 },
        end: { latitude: -34.913544, longitude: -57.94688 },
        width: 4, // metros aprox. de la calle
      },

      // 4 e/ 54 y av 51
      {
        start: { latitude: -34.913918, longitude: -57.94411 },
        end: { latitude: -34.912617, longitude: -57.945836 },
        width: 4, // metros aprox. de la calle
      },

      // 50 e/ 12 y 14
      {
        start: { latitude: -34.919524, longitude: -57.954876 },
        end: { latitude: -34.919814, longitude: -57.955138 },
        width: 7, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.919814, longitude: -57.955138 },
        end: { latitude: -34.921028, longitude: -57.956442 },
        width: 7, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.921028, longitude: -57.956442 },
        end: { latitude: -34.921364, longitude: -57.956858 },
        width: 7, // metros aprox. de la calle
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
