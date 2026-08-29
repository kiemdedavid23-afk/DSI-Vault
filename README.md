# DSI Vault — V1

Application Android native (React Native) — bibliothèque multimédia locale et hors ligne
(audio, vidéo, PDF, images), conçue à partir du cahier des charges V1 (8 parties) transmis.

## ⚠️ Ce que contient réellement cette livraison

Ceci est un **squelette de projet complet et fonctionnel dans sa structure**, avec le code
source de l'architecture, des écrans, du modèle de données et des services décrits dans le
cahier des charges. Ce n'est **pas un APK compilé** :

- Je n'ai pas d'accès réseau ni de SDK Android/Xcode dans cet environnement pour exécuter
  `npm install`, lier les modules natifs (audio/vidéo/PDF/OCR/Picture-in-Picture) et produire
  un build réel sur un appareil Android.
- Les écrans, la navigation, le modèle de données local (SQLite) et les services
  (scan de bibliothèque, recherche, mise à jour GitHub, sauvegarde) sont écrits en TypeScript
  et prêts à être installés/compilés sur une machine de développement (Node + Android Studio).
- Les intégrations qui dépendent fortement de modules natifs Android (lecture audio en
  arrière-plan avec notification media, Picture-in-Picture natif, OCR local, accès au
  stockage via SAF) sont posées comme **interfaces claires avec une implémentation de
  référence** et des commentaires `// TODO natif` à l'endroit exact où le module natif
  doit être branché et testé sur un vrai téléphone (comme l'exige la Partie 8 du cahier
  des charges — "un émulateur ne suffit pas").

Cette approche respecte le principe du cahier des charges : ne pas prétendre livrer une
fonctionnalité native que je ne peux pas honnêtement tester ici, tout en fournissant une
base de code réelle, cohérente et immédiatement exploitable.

## Installation (sur votre machine)

```bash
npm install
npx react-native run-android
```

Bibliothèques prévues (à ajuster si besoin lors de l'installation réelle) :
- `@react-navigation/native` + `@react-navigation/bottom-tabs` — navigation 4 espaces
- `expo-sqlite` ou `react-native-sqlite-storage` — stockage local structuré
- `react-native-track-player` — lecture audio arrière-plan + notification media + contrôles Android
- `react-native-video` — lecteur vidéo + Picture-in-Picture
- `react-native-pdf` — lecteur PDF avec recherche texte
- `react-native-fs` — accès aux fichiers locaux
- `@react-native-ml-kit/text-recognition` — OCR local (Android natif via ML Kit, hors ligne)
- `react-native-image-viewing` — visionneuse d'images avec zoom/navigation

## Structure

```
src/
├── theme/            # couleurs, principe "Professionnalisme dans la simplicité"
├── navigation/        # 4 espaces principaux : Accueil, Bibliothèque, Favoris, Paramètres
├── screens/           # écrans (+ screens/players pour les 4 lecteurs)
├── data/              # schéma SQLite local + repositories (favoris, notes, marque-pages,
│                        playlists, historique, progression)
├── services/          # scan de bibliothèque, recherche locale, OCR, miniatures,
│                        mise à jour (API GitHub), sauvegarde/restauration
└── components/        # ContentCard, CategoryTabs, MiniPlayer
```

Voir `ARCHITECTURE.md` pour le détail des choix techniques, le modèle de données,
et les points nécessitant une décision ou un test sur appareil réel.
