import * as Notifications from "expo-notifications";

// ✅ Configuración global de cómo se mostrarán las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   
    shouldPlaySound: false,  
    shouldSetBadge: false,   
    shouldShowBanner: true,  
    shouldShowList: true,    
  }),
});

// ✅ Función para pedir permisos y obtener el token de notificación (solo para push)
export async function pedirPermisosNotificaciones() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("❌ Permiso para notificaciones denegado.");
    return null;
  }


  return true;
}

// ✅ Función para programar una notificación
export async function programarNotificacion(titulo: string, cuerpo: string, fecha: Date) {
  try {
    const ahora = new Date();
    const diffEnSegundos = Math.max(1, Math.floor((fecha.getTime() - ahora.getTime()) / 1000));

        await Notifications.scheduleNotificationAsync({
          content: {
            title: titulo,
            body: cuerpo,
          },
          trigger: {
            type: "timeInterval" as any,
            seconds: diffEnSegundos,
            repeats: false,
          },
        });



    console.log("✅ Notificación programada para:", fecha);
  } catch (error) {
    console.log("❌ Error al programar la notificación:", error);
  }
}
