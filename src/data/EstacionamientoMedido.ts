interface Point {
  latitude: number;
  longitude: number;
}

interface Calle {
  points: Point[];
}

export interface Zona {
  nombre: string;
  color: string;
  calles: Calle[];
  horarios: string;
}

export const zonasDeEstacionamiento: Zona[] = [
  {
    nombre: 'Zona Azul (Tribunales)',
    color: 'rgba(0, 0, 255, 0.5)',
    horarios: 'LUNES A VIERNES de 7 a 20hs. SÁBADOS de 9 a 20hs.',
    calles: [
      { // Ejemplo de una calle/polígono para la zona
        points: [
          { latitude: -34.919, longitude: -57.955 },
          { latitude: -34.922, longitude: -57.952 },
          { latitude: -34.925, longitude: -57.958 },
          { latitude: -34.921, longitude: -57.960 },
        ],
      },
      // Puedes agregar más polígonos para esta zona aquí
    ],
  },
  // Ejemplo de cómo agregarías otra zona
  // {
  //   nombre: 'Zona Rosa',
  //   color: 'rgba(255, 105, 180, 0.5)', // Rosa con transparencia
  //   horarios: 'LUNES A VIERNES de 7 a 14hs.',
  //   calles: [
  //      {
  //       points: [
  //         // Coordenadas del polígono para la Zona Rosa
  //       ],
  //      }
  //   ],
  // }
];