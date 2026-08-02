import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
// Reutilizamos la lógica correcta para expo-video que aprendimos antes
import { useVideoPlayer, VideoView, VideoSource, ContentFit } from 'expo-video';

// 1. Apuntamos al video en tu repositorio (ajusta la ruta si es necesario)
// Asumimos que está en: assets/bigbuckbunny.mp4
const videoFile = require('../../assets/videos/yo.mp4');

// Configuración de la fuente, compatible con Web y Móvil para evitar errores
const videoSource: VideoSource = {
  [Platform.OS === 'web' ? 'uri' : 'assetId']: videoFile,
};

export default function PresentacionScreen() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  // 2. Configuramos el reproductor: autoplay, loop y mute (ideal para presentación)
  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = true; // Reproducción infinita
    playerInstance.muted = true; // Silenciado por defecto (mejor UX)
    playerInstance.play(); // Iniciar automáticamente
  });

  return (
    <View style={styles.screenContainer}>
      
        {/* === CONTENEDOR PRINCIPAL (FILA) === */}
      <View style={styles.profileRow}>

        {/* 3. === EL CÍRCULO CON EL VIDEO === */}
        <View style={styles.videoCircleContainer}>
          
          {/* Mostramos un cargando mientras el video se prepara */}
          {!isVideoReady && (
            <ActivityIndicator size="small" color="#6200ee" style={styles.loader} />
          )}

          <VideoView
            style={styles.videoElement}
            player={player}
            // Importante: 'cover' asegura que el video llene el círculo sin deformarse
            contentFit={'cover' as ContentFit} 
            // Desactivamos controles para que parezca una foto de perfil animada
            useNativeControls={false}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
            onLoad={() => setIsVideoReady(true)}
          />
        </View>

        {/* 4. === LA PRESENTACIÓN (TEXTOS) A LADO === */}
        <View style={styles.textContainer}>
          <Text style={styles.label}>Hola, soy</Text>
          {/* Reemplaza con tu nombre real */}
          <Text style={styles.nameText}>Tu Nombre Aquí</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>Me dedico a</Text>
          {/* Reemplaza con tu profesión real */}
          <Text style={styles.professionText}>Desarrollador Mobile & Web</Text>
          <Text style={styles.bioText}>Apasionado por crear experiencias digitales increíbles con React Native y Expo.</Text>
        </View>

      </View>

    </View>
  );
}

// 5. === ESTILOS (Limpios y Modernos) ===
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'red', // Fondo gris muy claro
    justifyContent: 'center', // Centra la fila verticalmente en la pantalla
    alignItems: 'center',
    padding: 20,
  },
  profileRow: {
    flexDirection: 'row', // Alinea video y texto horizontalmente
    alignItems: 'center', // Centra verticalmente los elementos de la fila
    backgroundColor: '#ffffff', // Fondo blanco para la tarjeta
    padding: 25,
    borderRadius: 20,
  
  },
  // --- Estilos del Círculo ---
  videoCircleContainer: {
    width: 120,  // Tamaño del círculo
    height: 120, // Tamaño del círculo (debe ser igual al width)
    borderRadius: 60, // La mitad del tamaño para hacerlo círculo perfecto
    overflow: 'hidden', // CRUCIAL: Recorta el video para que no salga del círculo
    borderWidth: 4, // Borde decorativo
    borderColor: '#6200ee', // Color del borde (morado)
    backgroundColor: '#e0e0e0', // Fondo mientras carga
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20, // Espacio entre el video y el texto
  },
  videoElement: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  // --- Estilos de Texto ---
  textContainer: {
    flex: 1, // Ocupa el resto del espacio disponible en la fila
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#8e8e93', // Gris para etiquetas pequeñas
    textTransform: 'uppercase', // Mayúsculas
    letterSpacing: 1,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#e5e5ea',
    width: 40,
    marginBottom: 12,
  },
  professionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6200ee', // Color destacado para la profesión
    marginBottom: 6,
  },
  bioText: {
    fontSize: 14,
    color: '#3a3a3c',
    lineHeight: 20, // Mejor legibilidad
  },
});