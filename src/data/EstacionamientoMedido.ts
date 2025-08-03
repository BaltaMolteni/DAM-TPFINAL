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
        end: { latitude: -34.913975, longitude: -57.95324 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.911534, longitude: -57.955213 },
        end: { latitude: -34.91247, longitude: -57.955189 },
        width: 10.5,
      },
      {
        start: { latitude: -34.91247, longitude: -57.955189 },
        end: { latitude: -34.914078, longitude: -57.955069 },
        width: 10.5,
      },
      {
        start: { latitude: -34.914078, longitude: -57.955069 },
        end: { latitude: -34.919258, longitude: -57.954751 },
        width: 10.5,
      },
      {
        start: { latitude: -34.914227, longitude: -57.955126 },
        end: { latitude: -34.917284, longitude: -57.951068 },
        width: 4,
      },
      {
        start: { latitude: -34.916096, longitude: -57.954931 },
        end: { latitude: -34.918184, longitude: -57.952114 },
        width: 4,
      },
      {
        start: { latitude: -34.917788, longitude: -57.95486 },
        end: { latitude: -34.919112, longitude: -57.953115 },
        width: 4,
      },
      {
        start: { latitude: -34.915423, longitude: -57.949085 },
        end: { latitude: -34.917274, longitude: -57.951056 },
        width: 4,
      },
      {
        start: { latitude: -34.917274, longitude: -57.951056 },
        end: { latitude: -34.918159, longitude: -57.952083 },
        width: 4,
      },
      {
        start: { latitude: -34.918159, longitude: -57.952083 },
        end: { latitude: -34.919094, longitude: -57.953097 },
        width: 4,
      },
      {
        start: { latitude: -34.919094, longitude: -57.953097 },
        end: { latitude: -34.919983, longitude: -57.954173 },
        width: 4,
      },
      {
        start: { latitude: -34.919413, longitude: -57.954764 },
        end: { latitude: -34.916754, longitude: -57.951838 },
        width: 4,
      },
      {
        start: { latitude: -34.916754, longitude: -57.951838 },
        end: { latitude: -34.914911, longitude: -57.949824 },
        width: 4,
      },
      {
        start: { latitude: -34.914911, longitude: -57.949824 },
        end: { latitude: -34.914345, longitude: -57.949166 },
        width: 8,
      },
      {
        start: { latitude: -34.914345, longitude: -57.949166 },
        end: { latitude: -34.91375, longitude: -57.948557 },
        width: 8,
      },
      {
        start: { latitude: -34.914261, longitude: -57.947902 },
        end: { latitude: -34.912573, longitude: -57.945977 },
        width: 8,
      },
      {
        start: { latitude: -34.919413, longitude: -57.954764 },
        end: { latitude: -34.912028, longitude: -57.946675 },
        width: 4,
      },
      {
        start: { latitude: -34.912542, longitude: -57.945938 },
        end: { latitude: -34.910071, longitude: -57.949301 },
        width: 4,
      },
      {
        start: { latitude: -34.913466, longitude: -57.94698 },
        end: { latitude: -34.910301, longitude: -57.951235 },
        width: 4,
      },
      {
        start: { latitude: -34.911003, longitude: -57.952615 },
        end: { latitude: -34.910589, longitude: -57.953061 },
        width: 4,
      },
      {
        start: { latitude: -34.911003, longitude: -57.952615 },
        end: { latitude: -34.911457, longitude: -57.952037 },
        width: 4,
      },
      {
        start: { latitude: -34.911457, longitude: -57.952037 },
        end: { latitude: -34.912101, longitude: -57.951086 },
        width: 4,
      },
      {
        start: { latitude: -34.912101, longitude: -57.951086 },
        end: { latitude: -34.913874, longitude: -57.948687 },
        width: 4,
      },
      {
        start: { latitude: -34.910696, longitude: -57.954273 },
        end: { latitude: -34.910583, longitude: -57.95339 },
        width: 4,
      },
      {
        start: { latitude: -34.910583, longitude: -57.95339 },
        end: { latitude: -34.910584, longitude: -57.953054 },
        width: 4,
      },
      {
        start: { latitude: -34.910584, longitude: -57.953054 },
        end: { latitude: -34.9103, longitude: -57.951236 },
        width: 4,
      },
      {
        start: { latitude: -34.9103, longitude: -57.951236 },
        end: { latitude: -34.910271, longitude: -57.950759 },
        width: 4,
      },
      {
        start: { latitude: -34.910271, longitude: -57.950759 },
        end: { latitude: -34.91002, longitude: -57.948909 },
        width: 4,
      },
      {
        start: { latitude: -34.907112, longitude: -57.94901 },
        end: { latitude: -34.912076, longitude: -57.948689 },
        width: 10,
      },
      {
        start: { latitude: -34.912076, longitude: -57.948689 },
        end: { latitude: -34.911497, longitude: -57.948693 },
        width: 10,
      },
      {
        start: { latitude: -34.911497, longitude: -57.948693 },
        end: { latitude: -34.910001, longitude: -57.948826 },
        width: 10,
      },
      {
        start: { latitude: -34.910001, longitude: -57.948826 },
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
        end: { latitude: -34.911573, longitude: -57.954098 },
        width: 10, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.911573, longitude: -57.954098 },
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
        width: 4,
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
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.871789, longitude: -58.045592 },
        end: { latitude: -34.872009, longitude: -58.045211 },
        width: 4,
      },
      {
        start: { latitude: -34.870944, longitude: -58.045836 },
        end: { latitude: -34.869423, longitude: -58.044754 },
        width: 4,
      },
      {
        start: { latitude: -34.869423, longitude: -58.044754 },
        end: { latitude: -34.866132, longitude: -58.042417 },
        width: 4,
      },
      {
        start: { latitude: -34.866132, longitude: -58.042417 },
        end: { latitude: -34.86875, longitude: -58.044257 },
        width: 4,
      },
      {
        start: { latitude: -34.86875, longitude: -58.044257 },
        end: { latitude: -34.86616, longitude: -58.042436 },
        width: 4,
      },
      {
        start: { latitude: -34.870093, longitude: -58.046634 },
        end: { latitude: -34.8706, longitude: -58.045579 },
        width: 4,
      },
      {
        start: { latitude: -34.8706, longitude: -58.045579 },
        end: { latitude: -34.871042, longitude: -58.044519 },
        width: 4,
      },
      {
        start: { latitude: -34.869201, longitude: -58.045978 },
        end: { latitude: -34.869677, longitude: -58.044973 },
        width: 4,
      },
      {
        start: { latitude: -34.868738, longitude: -58.045636 },
        end: { latitude: -34.86942, longitude: -58.044752 },
        width: 4,
      },
      {
        start: { latitude: -34.86942, longitude: -58.044752 },
        end: { latitude: -34.870177, longitude: -58.043903 },
        width: 4,
      },
      {
        start: { latitude: -34.868313, longitude: -58.045363 },
        end: { latitude: -34.868746, longitude: -58.044254 },
        width: 4,
      },
      {
        start: { latitude: -34.868746, longitude: -58.044254 },
        end: { latitude: -34.869274, longitude: -58.043261 },
        width: 4,
      },
      {
        start: { latitude: -34.867353, longitude: -58.044678 },
        end: { latitude: -34.867845, longitude: -58.043604 },
        width: 4,
      },
      {
        start: { latitude: -34.867845, longitude: -58.043604 },
        end: { latitude: -34.868366, longitude: -58.042599 },
        width: 4,
      },
      {
        start: { latitude: -34.866528, longitude: -58.04406 },
        end: { latitude: -34.867473, longitude: -58.041966 },
        width: 4,
      },
    ],
  },

  {
    nombre: "Calle 12",
    color: "rgba(0, 128, 0, 1)",
    horarios: "LUNES A SÁBADOS de 9 a 20hs.",
    calles: [
      {
        start: { latitude: -34.92892, longitude: -57.942159 },
        end: { latitude: -34.922605, longitude: -57.950727 },
        width: 4, // metros aprox. de la calle
      },
      {
        start: { latitude: -34.922605, longitude: -57.950727 },
        end: { latitude: -34.921894, longitude: -57.951521 },
        width: 4,
      },
      {
        start: { latitude: -34.921894, longitude: -57.951521 },
        end: { latitude: -34.921429, longitude: -57.952293 },
        width: 4,
      },
      {
        start: { latitude: -34.921378, longitude: -57.950989 },
        end: { latitude: -34.922819, longitude: -57.952494 },
        width: 4,
      },
      {
        start: { latitude: -34.921696, longitude: -57.949779 },
        end: { latitude: -34.923455, longitude: -57.951698 },
        width: 4,
      },
      {
        start: { latitude: -34.922356, longitude: -57.948886 },
        end: { latitude: -34.924117, longitude: -57.950863 },
        width: 4,
      },
      {
        start: { latitude: -34.923811, longitude: -57.946857 },
        end: { latitude: -34.925593, longitude: -57.948849 },
        width: 4,
      },
      {
        start: { latitude: -34.923016, longitude: -57.947905 },
        end: { latitude: -34.924806, longitude: -57.949889 },
        width: 4,
      },
      {
        start: { latitude: -34.924676, longitude: -57.945715 },
        end: { latitude: -34.925967, longitude: -57.947135 },
        width: 10,
      },
      {
        start: { latitude: -34.925544, longitude: -57.944492 },
        end: { latitude: -34.92732, longitude: -57.946501 },
        width: 4,
      },
      {
        start: { latitude: -34.926359, longitude: -57.943406 },
        end: { latitude: -34.928138, longitude: -57.945342 },
        width: 4,
      },
      {
        start: { latitude: -34.92718, longitude: -57.942304 },
        end: { latitude: -34.928992, longitude: -57.944266 },
        width: 4,
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

  // Calculamos los 4 vértices del rectángulo corrigiendo ambos ejes
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
