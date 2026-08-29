import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
// TODO natif : import Video from 'react-native-video';

import { getById } from '../../data/contentRepository';
import { getProgress, saveProgress } from '../../data/progressRepository';
import type { Content } from '../../data/models';
import type { RootStackParamList } from '../../navigation/types';
import { lightTheme } from '../../theme/colors';

type Route = RouteProp<RootStackParamList, 'VideoPlayer'>;

/**
 * Lecteur vidéo (Partie 4 §14-21, Partie 7 §13-14) : plein écran, reprise, PiP natif.
 * Le rendu vidéo réel doit venir de react-native-video — voir // TODO natif.
 */
export default function VideoPlayerScreen() {
  const { params } = useRoute<Route>();
  const [content, setContent] = useState<Content | null>(null);
  const [pleinEcran, setPleinEcran] = useState(true);
  const positionRef = useRef(0);

  useEffect(() => {
    getById(params.contentId).then(setContent);
    getProgress(params.contentId).then((p) => {
      if (p?.positionSecondes) positionRef.current = p.positionSecondes;
    });
  }, [params.contentId]);

  useEffect(() => {
    // Bouton retour Android : quitte d'abord le plein écran (Partie 2 §22, Partie 7 §6).
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (pleinEcran) {
        setPleinEcran(false);
        return true; // événement consommé, ne ferme pas l'écran
      }
      return false;
    });
    return () => sub.remove();
  }, [pleinEcran]);

  useEffect(() => {
    return () => {
      // Sauvegarde de la position à la fermeture (Partie 4 §17).
      saveProgress(params.contentId, { positionSecondes: positionRef.current });
    };
  }, [params.contentId]);

  function declencherPiP() {
    // TODO natif : déclenchement du mode Picture-in-Picture Android natif
    // (Activity.enterPictureInPictureMode côté module natif) — Partie 4 §18.
    // Ne doit jamais être simulé par une fausse fenêtre flottante en JS.
  }

  if (!content) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.zoneVideo}>
        {/*
          TODO natif :
          <Video
            source={{ uri: content.uri }}
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
            paused={false}
            onProgress={(e) => (positionRef.current = e.currentTime)}
          />
        */}
        <Text style={styles.placeholder}>🎬 {content.nom}</Text>
      </View>

      {pleinEcran ? (
        <Pressable style={styles.overlayTouch} onPress={() => setPleinEcran(false)} />
      ) : (
        <View style={styles.controles}>
          <Pressable onPress={declencherPiP}>
            <Text style={styles.bouton}>Picture-in-Picture</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  zoneVideo: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholder: { color: '#FFFFFF', fontSize: 16 },
  overlayTouch: { ...StyleSheet.absoluteFillObject },
  controles: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bouton: { color: lightTheme.accent, fontSize: 14 },
});
