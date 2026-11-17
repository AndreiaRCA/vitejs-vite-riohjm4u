import React, { useState, useEffect } from 'react';
import {
  Dumbbell, Crown, Check, AlertCircle, Menu, Timer, MapPin,
  Link2, Copy, Share2, Image as ImageIcon, Zap, CalendarCheck, Medal,
  X, Lock, CheckCircle2, Camera, Upload, Flame, Sparkles, Heart, Trophy, RefreshCw, Play, Pause, ShieldCheck, Clock, Plus
} from 'lucide-react';

// ============================================================================
// CONSTANTES GLOBALES & CONFIGURATION DES AVATARS / POSTES
// ============================================================================

const RUGBY_XMAS_AVATARS = [
  { id: 'av1', name: 'Père Noël', emoji: '🎅', bg: 'from-red-600 to-red-900', border: 'border-red-300', badge: '🎄' },
  { id: 'av2', name: 'Renne', emoji: '🦌', bg: 'from-amber-700 to-amber-950', border: 'border-amber-300', badge: '❄️' },
  { id: 'av3', name: 'Lutin', emoji: '🧝', bg: 'from-emerald-600 to-emerald-900', border: 'border-emerald-300', badge: '⭐' },
  { id: 'av4', name: 'Licorne de Noël', emoji: '🦄', bg: 'from-pink-500 to-purple-700', border: 'border-pink-300', badge: '🎁' },
  { id: 'av5', name: 'Joueur de Rugby Noël', emoji: '🏉', bg: 'from-blue-700 to-indigo-950', border: 'border-blue-300', badge: '🏉' },
];

const PLAYER_ROLES = [
  { id: '5D', label: '5 de Devant (Avants)', shortLabel: '5 de Devant', group: 'Avants' },
  { id: '3L', label: '3ème Ligne', shortLabel: '3ème Ligne', group: 'Avants' },
  { id: '34', label: 'Trois-Quarts (¾)', shortLabel: 'Trois-Quarts', group: 'Trois-quarts' },
];

const RcaCrestBadge = ({ size = 40, customLogo }) => {
  if (customLogo) {
    return (
      <img
        src={customLogo}
        alt="Logo Club Noël"
        style={{ width: size, height: size }}
        className="rounded-xl object-contain border border-[#FACC15]/60 shadow"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-gradient-to-br from-[#0A1E3F] to-[#1D4ED8] border-2 border-[#FACC15] flex items-center justify-center shadow-lg shrink-0 relative"
      title="RCA Amiens 1900"
    >
      <span className="text-xl">🦄🎅</span>
      <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-[#FACC15] text-slate-950 px-1 rounded">
        1900
      </span>
    </div>
  );
};

const PlayerAvatarBadge = ({ avatarId, size = 'md' }) => {
  const av = RUGBY_XMAS_AVATARS.find((a) => a.id === avatarId) || RUGBY_XMAS_AVATARS[0];
  const sizeClasses = size === 'sm' ? 'w-9 h-9 text-base' : 'w-12 h-12 text-2xl';
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${av.bg} border-2 ${av.border} flex items-center justify-center shadow-md shrink-0 relative ${sizeClasses}`}>
      <span>{av.emoji}</span>
      <span className="absolute -bottom-1 -right-1 text-[10px] bg-slate-950 text-white px-1 rounded-full border border-blue-500">
        {av.badge}
      </span>
    </div>
  );
};

// ============================================================================
// DONNÉES DE LA PRÉPA HIVER (21 DÉCEMBRE - 2 JANVIER) + EXTRAS
// ============================================================================

const INITIAL_SESSIONS = [
  {
    id: 1,
    week: 'Semaine 1',
    date: '21 Décembre',
    title: 'Séance 1 : Musculation Full Body n°1',
    subtitle: 'Circuit abdos + E2MOM 24\' + EMOM 10\'',
    type: 'main',
    points: 100,
    duration: '45 min',
    deadlineDate: '25 Décembre',
    hasEquipmentVariants: true,
    mapPos: { x: 24, y: 84 },
    gymBlocks: [
      { name: 'Circuit abdos 6\' (3 tours)', details: '- 30\'\' gainage militaire\n- 30\'\' parachutiste\n- 30\'\' obliques\n- 30\'\' obliques' },
      { name: 'E2MOM 24\'', details: '- 6/J Pistol Squat + 6/J Relevé de bassin 1 jambe\n- 10 Burpees + 6/J Fentes latérales\n- 45\'\' Dips chaise + 8/côté Bird dog\n(R: 2\')' },
      { name: 'EMOM 10\'', details: 'Step Up : 4/4/2 ; 6/4/2/2 ; 4/4/2\n+\nPompes : 2/4/6/ ; 2/4/6/8 ; 6/6/ max' }
    ],
    homeBlocks: [
      { name: '0\' - 5\'', details: '- 10 Oiseau bouteilles d\'eau\n- Single leg deadlift' },
      { name: '5\' - 10\'', details: '- 20\'\' burpees\n- 6/ côté pompes ouverture' },
      { name: '10\' - 15\'', details: '- 5 sauts sur chaise\n- 30\'\' planche' },
      { name: '15\' - 20\'', details: '- 5 Pompes sautées\n- 10 Développement militaire bouteilles d\'eau' },
      { name: '20\' - 25\'', details: '- 15->0 Tractions australiennes\n- Squates sautées' },
      { name: '25\' - 30\'', details: '- 2 Dips (x2 à chaque nouveau tour)\n- Fentes marchées' },
      { name: '35\' - 40\'', details: '- 30\'\' Sit up\n- 30\'\' russian twist' }
    ],
    timerPresets: [
      { label: 'E2MOM 24\'', seconds: 1440 },
      { label: 'EMOM 10\'', seconds: 600 },
      { label: 'Circuit 6\'', seconds: 360 }
    ],
    perfPlaceholder: 'Score / Répétitions max...'
  },
  {
    id: 2,
    week: 'Semaine 1',
    date: '23 Décembre',
    title: 'Séance 2 : Course n°1',
    subtitle: 'Endurance & Course continue',
    type: 'main',
    points: 100,
    duration: '45 min',
    deadlineDate: '27 Décembre',
    hasEquipmentVariants: false,
    mapPos: { x: 68, y: 74 },
    roleDistances: {
      '5D': { distance: '6 KM (Course n°1)', note: 'Allure régulière et gestion du pack' },
      '3L': { distance: '6.5 KM (Course n°1)', note: 'Rythme intercalé' },
      '34': { distance: '7 KM For Time (Course n°1)', note: 'Vitesse et relances' }
    },
    blocks: [
      { name: 'Course n°1', details: 'Avants : 6 km | 3ème Ligne : 6,5 km | ¾ : 7 km for time' },
      { name: 'EXTRA : Course n°2', details: '→ 5\' échauffement gammes\n→ 3x 4\' - 20\' course - 20\' footing\n2\' récup entre chaque bloc\n→ 2x 3\'-10\'/10\' ; 1\'30 récup' }
    ],
    timerPresets: [
      { label: 'Chrono Course', seconds: 2700 }
    ],
    perfPlaceholder: 'Temps réalisé (ex: 32m 45s)...'
  },
  {
    id: 3,
    week: 'Spécial Noël',
    date: '25 Décembre',
    title: '🎁 Cadeau Noël : Photo en Famille',
    subtitle: 'Partage ta photo de Noël en famille (+80 PTS)',
    type: 'bonus',
    points: 80,
    duration: 'Instantané',
    deadlineDate: '29 Décembre',
    hasEquipmentVariants: false,
    mapPos: { x: 30, y: 63 },
    blocks: [
      { name: 'Défi Famille Noël', details: 'Prends une photo avec ta famille pour célébrer Noël aux couleurs du club !' }
    ],
    perfPlaceholder: 'Légende de la photo de famille...'
  },
  {
    id: 4,
    week: 'Semaine 2',
    date: '26 Décembre',
    title: 'Séance 3 : Musculation Full Body n°2',
    subtitle: 'W.UP + EMOM 24\' + For Time',
    type: 'main',
    points: 100,
    duration: '50 min',
    deadlineDate: '30 Décembre',
    hasEquipmentVariants: true,
    mapPos: { x: 70, y: 52 },
    gymBlocks: [
      { name: 'W.UP (3 tours)', details: '- 2 x marche de l\'ours carré 5m\n- Goblet squat (10/20/30)\n- Tractions australiennes (10/15/20)\n- Step up (10/20/30)' },
      { name: 'EMOM 24\'', details: '- 3 fentes sur place alternés avt/arrière\n- 10 Développé militaire barre\n- 40\'\' Dead bug\n- bike (2x 10\'\'/10\'\')\n- Farmer walk 40\'\' (2x 35kg)\n- 40\'\' Max Burpee' },
      { name: 'For time', details: '1 Combo = 2 tirage buste penché / 1 arraché haltères\n- 7 combos + 42 cal Row\n- 5 combos + 30 Kcal\n- 3 combos + 18Kcal' }
    ],
    homeBlocks: [
      { name: 'Échauffement', details: 'Mobilité au choix' },
      { name: '24\' E2MOM', details: '1. 15 pompes + 15 pompes australiennes table\n2. 45\'\' Crunches + 45\'\' planche\n3. 15 Dips chaise + 15 pompes piquées' },
      { name: 'FOR TIME HAUT', details: '50 pompes diamants\n40 burpees\n30 Pompes ouverture\n30 biceps curl bouteille d\'eau (1L)' }
    ],
    timerPresets: [
      { label: 'EMOM 24\'', seconds: 1440 },
      { label: 'W.UP', seconds: 300 }
    ],
    perfPlaceholder: 'Temps / charge réalisée...'
  },
  {
    id: 5,
    week: 'Semaine 2',
    date: '28 Décembre',
    title: 'Séance 4 : Course Intermittent 30"/30"',
    subtitle: 'Intermittent qui tue avec changements de direction',
    type: 'main',
    points: 100,
    duration: '45 min',
    deadlineDate: '01 Janvier',
    hasEquipmentVariants: false,
    mapPos: { x: 28, y: 41 },
    roleDistances: {
      '5D': { distance: '62m navette (Intermittent 30"/30")', note: 'Adapté 5 de devant' },
      '3L': { distance: '62.5m navette (Intermittent 30"/30")', note: 'Adapté 3ème ligne' },
      '34': { distance: '64.5m navette (Intermittent 30"/30")', note: 'Adapté Trois-quarts' }
    },
    blocks: [
      { name: 'Intermittent qui tue', details: '→ 5\' échauffement gammes\n→ 3 x 6\'-30\'\'/30\'\' ; récup 3\' 100% VMA (avec changements de direction)' }
    ],
    timerPresets: [
      { label: 'Bloc 6\'', seconds: 360 }
    ],
    perfPlaceholder: 'Distance totale / ressenti...'
  },
  {
    id: 6,
    week: 'Semaine 2',
    date: '30 Décembre',
    title: 'Séance 5 : Musculation Full Body n°3',
    subtitle: '4 Tours + EMOM 24\' + EMOM 10\'',
    type: 'main',
    points: 100,
    duration: '50 min',
    deadlineDate: '03 Janvier',
    hasEquipmentVariants: true,
    mapPos: { x: 68, y: 31 },
    gymBlocks: [
      { name: '4 Tours, 1\'', details: '- 30\'\' rameur max cal\n- 30\'\' gainage au choix\n- 6-8 Devil Burpee' },
      { name: 'EMOM 24\'', details: '- 4 x Squat @RIR 3 -> 4/J Single leg haltères\n- 4x épaulé -> 5 Burpee overbar\n- 4x Tirage gorille alterné -> 8x KB swing\n- Passes ou manip balle rugby 30\'\'\n(R: 1\'30)\n- 3\' UB dynamique (R: 1\'30)' },
      { name: 'EMOM 10\' (10->1)', details: '- Pull up 10, 9, 8...\n- 1-10 Box jump' }
    ],
    homeBlocks: [
      { name: 'EMOM (3 tours - 6/8/10 reps)', details: '1. Dips\n2. 15 pompes australiennes table\n3. 30\'\'- Gainage militaire\n4. Hand released push up\n5. Marche de l\'ours' },
      { name: 'FOR TIME BAS', details: '50 squats poids du corps\n50 relevée de bassin\n50 burpees\n25 fentes révérence' }
    ],
    timerPresets: [
      { label: 'EMOM 24\'', seconds: 1440 },
      { label: 'EMOM 10\'', seconds: 600 }
    ],
    perfPlaceholder: 'Score / répétitions...'
  },
  {
    id: 7,
    week: 'Jour de l\'An',
    date: '31 Décembre',
    title: '🥂 Cadeau Nouvel An : Photo Réveillon',
    subtitle: 'Partage ta photo du Nouvel An (+80 PTS)',
    type: 'bonus',
    points: 80,
    duration: 'Instantané',
    deadlineDate: '04 Janvier',
    hasEquipmentVariants: false,
    mapPos: { x: 34, y: 21 },
    blocks: [
      { name: 'Célébration Réveillon', details: 'Poste ta photo pour fêter le passage à la nouvelle année avec l\'esprit rugby !' }
    ],
    perfPlaceholder: 'Bonne année au club !'
  },
  {
    id: 8,
    week: 'Semaine 2',
    date: '02 Janvier',
    title: 'Séance 6 : Course Intermittent Court + Sprints',
    subtitle: 'Intermittent court et sprints 100%',
    type: 'main',
    points: 100,
    duration: '45 min',
    deadlineDate: '06 Janvier',
    hasEquipmentVariants: false,
    mapPos: { x: 50, y: 12 },
    roleDistances: {
      '5D': { distance: '62m navette | Sprints 20m', note: 'Adapté 5 de devant' },
      '3L': { distance: '62.5m navette | Sprints 30m', note: 'Adapté 3ème ligne' },
      '34': { distance: '64.5m navette | Sprints 30m', note: 'Adapté Trois-quarts' }
    },
    blocks: [
      { name: 'Intermittent court', details: '→ 5\' échauffement gammes\n→ 2x 3\' - 15\'\'/15\'\' 2 - 90% VMA ; 3 min\n→ Sprints 20m avants / 30m les autres : 3 x 3 répétitions 100% ; 1\'15 entre chaque sprint' }
    ],
    timerPresets: [
      { label: 'Sprints Timer', seconds: 300 }
    ],
    perfPlaceholder: 'Temps / ressenti sprints...'
  },
  {
    id: 'extra-muscu',
    week: 'EXTRA',
    date: 'Optionnel',
    title: '🔥 Séance EXTRA Musculation',
    subtitle: 'Débloquée dès la 1ère séance de muscu validée',
    type: 'extra',
    unlockAfterId: 1,
    unlockLabel: 'Séance 1 (Musculation n°1)',
    points: 120,
    duration: '50 min',
    deadlineDate: '06 Janvier',
    hasEquipmentVariants: true,
    mapPos: { x: 13, y: 54 },
    gymBlocks: [
      { name: 'Circuit Extra Muscu', details: '- 4 Tours, 1\' : 30\'\' rameur max cal + 30\'\' gainage au choix + 6-8 Devil Burpee\n- EMOM 24\' : Squats, Épaulé, Tirage gorille, Manip balle rugby\n- EMOM 10\' (10->1) Pull up & Box jump' }
    ],
    homeBlocks: [
      { name: 'Circuit Extra Maison', details: '- EMOM 3 tours (6/8/10 reps) Dips, Pompes australiennes table, Gainage militaire, Marche de l\'ours\n- For Time Bas : 50 squats, 50 relevé de bassin, 50 burpees, 25 fentes révérence' }
    ],
    timerPresets: [{ label: 'EMOM 24\'', seconds: 1440 }],
    perfPlaceholder: 'Score séance extra...'
  },
  {
    id: 'extra-course',
    week: 'EXTRA',
    date: 'Optionnel',
    title: '⚡ Séance EXTRA Course',
    subtitle: 'Débloquée dès la 1ère course validée',
    type: 'extra',
    unlockAfterId: 2,
    unlockLabel: 'Séance 2 (Course n°1)',
    points: 120,
    duration: '45 min',
    deadlineDate: '06 Janvier',
    hasEquipmentVariants: false,
    mapPos: { x: 86, y: 42 },
    roleDistances: {
      '5D': { distance: '62m navette ou 6km Endurance', note: 'Option course extra 5D' },
      '3L': { distance: '62.5m navette ou 6.5km Endurance', note: 'Option course extra 3L' },
      '34': { distance: '64.5m navette ou 7km For Time', note: 'Option course extra ¾' }
    },
    blocks: [
      { name: 'Choix Course Extra', details: 'Soit 6km for time, soit 3 x 5\' de 30"/30" + 3\' de 10"/10"' }
    ],
    timerPresets: [{ label: 'Timer Course Extra', seconds: 2700 }],
    perfPlaceholder: 'Chrono ou distance...'
  }
];

const INITIAL_PLAYERS = [
  { id: 'p1', name: 'Maxime L.', roleId: '3L', poste: '3ème Ligne', group: 'Avants', avatarId: 'av1', points: 450, trainingMinutes: 180, extraCount: 2, perfScore: 94, bestPerfNote: '32m 10s sur Course 1', completedIds: [1, 2, 3], pendingIds: [], finishOrder: null },
  { id: 'p2', name: 'Thomas B.', roleId: '5D', poste: '5 de Devant', group: 'Avants', avatarId: 'av2', points: 350, trainingMinutes: 140, extraCount: 1, perfScore: 88, bestPerfNote: '6 km bouclés en 28m', completedIds: [1, 2], pendingIds: [], finishOrder: null },
  { id: 'p3', name: 'Lucas R.', roleId: '34', poste: 'Trois-Quarts (¾)', group: 'Trois-quarts', avatarId: 'av5', points: 550, trainingMinutes: 220, extraCount: 3, perfScore: 98, bestPerfNote: '7 km for time en 26m', completedIds: [1, 2, 3, 4], pendingIds: [], finishOrder: null },
  { id: 'p4', name: 'Romain D.', roleId: '34', poste: 'Trois-Quarts (¾)', group: 'Trois-quarts', avatarId: 'av3', points: 200, trainingMinutes: 80, extraCount: 0, perfScore: 82, bestPerfNote: 'E2MOM validé', completedIds: [1], pendingIds: [], finishOrder: null },
];

const INITIAL_SUBMISSIONS = [
  { id: 'sub-1', playerId: 'p3', playerName: 'Lucas R.', sessionId: 1, sessionTitle: 'Séance 1 : Musculation Full Body n°1', status: 'validated', photoUrl: 'simulated', caption: 'Gros circuit abdos avec le bonnet de Noël ! 🎅', perfResult: '24 rounds complets', date: '21 Décembre', likes: 5, likedByMe: false },
  { id: 'sub-2', playerId: 'p1', playerName: 'Maxime L.', sessionId: 2, sessionTitle: 'Séance 2 : Course n°1', status: 'validated', photoUrl: 'simulated', caption: '6,5 km avalés sous la neige givrée ❄️', perfResult: '32m 10s', date: '23 Décembre', likes: 3, likedByMe: true },
];

// ============================================================================
// MODALE AJOUT SÉANCE EXTRA LIBRE (+20 PTS AVEC PREUVE PHOTO OBLIGATOIRE)
// ============================================================================

const CustomExtraModal = ({ isOpen, onClose, onSubmitCustomExtra }) => {
  if (!isOpen) return null;

  const [activityTitle, setActivityTitle] = useState('');
  const [activityType, setActivityType] = useState('Musculation / Renfo');
  const [durationMin, setDurationMin] = useState('45');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityTitle.trim()) {
      setErrorMsg('Indique le nom ou contenu de ta séance extra.');
      return;
    }
    if (!photoPreview) {
      setErrorMsg('⚠️ Obligatoire : Ajoute une photo justificative de ta séance extra !');
      return;
    }
    onSubmitCustomExtra({
      title: `➕ Extra : ${activityTitle.trim()} (${activityType})`,
      durationMin: parseInt(durationMin, 10) || 30,
      photoUrl: photoPreview,
      caption: caption || `Séance extra libre (${durationMin} min)`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0A1E3F] border-2 border-[#FACC15] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-white relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#061024] border border-blue-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
            +20 POINTS BONUS
          </span>
          <h2 className="text-xl font-black text-white">Ajouter une Séance Extra Libre</h2>
          <p className="text-xs text-blue-200">
            Tu as fait une séance en plus du programme (footing, vélo, muscu, mobilité, rugby...) ? Déclare-la avec une photo pour gagner 20 points !
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-sky-200 block mb-1">Type d'activité</label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#061024] border border-blue-700 text-xs text-white"
              >
                <option>Musculation / Renfo</option>
                <option>Course / Footing</option>
                <option>Vélo / Natation / Ergo</option>
                <option>Mobilité / Gainage</option>
                <option>Terrain / Passes / Jeu au pied</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-sky-200 block mb-1">Durée (en minutes)</label>
              <input
                type="number"
                min="10"
                max="240"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#061024] border border-blue-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-sky-200 block mb-1">Détail de la séance extra</label>
            <input
              type="text"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              placeholder="Ex: Footing récupération 40 min ou Séance haut du corps"
              className="w-full px-3 py-2.5 rounded-xl bg-[#061024] border border-blue-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#FACC15] flex items-center gap-1.5 mb-1">
              <Camera className="w-4 h-4" /> Preuve Photo Obligatoire
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-700 hover:border-[#FACC15] rounded-xl p-4 cursor-pointer transition bg-blue-950/30 min-h-[115px]">
              {photoPreview ? (
                <img src={photoPreview} alt="Aperçu séance extra" className="h-28 rounded-lg object-cover w-full" />
              ) : (
                <div className="text-center space-y-1">
                  <Upload className="w-6 h-6 text-[#FACC15] mx-auto" />
                  <span className="text-xs font-bold text-sky-200 block">Importer la photo de ta séance extra</span>
                  <span className="text-[10px] text-slate-400">Montre GPS, Strava, selfie salle/terrain...</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-xs font-bold text-sky-200 block mb-1">Commentaire (optionnel)</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ex: Petite sortie cardio en plus avant le réveillon !"
              className="w-full px-3 py-2 rounded-xl bg-[#061024] border border-blue-700 text-xs text-white"
            />
          </div>

          {errorMsg && <p className="text-xs font-black text-rose-400 text-center">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Envoyer ma Séance Extra (+20 PTS)
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT PODIUMS (ÉQUIPE & PAR POSTE)
// ============================================================================

const PodiumView = ({ players, submissions, onToggleLike }) => {
  const [subTab, setSubTab] = useState('team'); // 'team' or 'postes'

  const sortedGrosMoteur = [...players].sort((a, b) => b.completedIds.length - a.completedIds.length || b.points - a.points);
  const sortedMostActive = [...players].sort(
    (a, b) =>
      (b.completedIds.length + (b.extraCount || 0)) - (a.completedIds.length + (a.extraCount || 0)) ||
      (b.extraCount || 0) - (a.extraCount || 0) ||
      b.points - a.points
  );

  const avants = players.filter((p) => p.group === 'Avants');
  const troisQuarts = players.filter((p) => p.group === 'Trois-quarts');
  const avgAvants = avants.length ? (avants.reduce((acc, p) => acc + p.completedIds.length, 0) / avants.length).toFixed(1) : 0;
  const avgTroisQuarts = troisQuarts.length ? (troisQuarts.reduce((acc, p) => acc + p.completedIds.length, 0) / troisQuarts.length).toFixed(1) : 0;

  const sortedTime = [...players].sort((a, b) => (b.trainingMinutes || 0) - (a.trainingMinutes || 0));

  const players5D = [...players.filter((p) => p.roleId === '5D')].sort((a, b) => b.points - a.points);
  const players3L = [...players.filter((p) => p.roleId === '3L')].sort((a, b) => b.points - a.points);
  const players34 = [...players.filter((p) => p.roleId === '34')].sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex bg-[#0A1E3F] border border-blue-800 p-1 rounded-xl max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setSubTab('team')}
          className={`flex-1 py-2 rounded-lg text-xs font-black transition ${
            subTab === 'team' ? 'bg-[#1D4ED8] text-white shadow' : 'text-slate-300 hover:text-white'
          }`}
        >
          🏆 Podiums Équipe & Défis
        </button>
        <button
          type="button"
          onClick={() => setSubTab('postes')}
          className={`flex-1 py-2 rounded-lg text-xs font-black transition ${
            subTab === 'postes' ? 'bg-[#1D4ED8] text-white shadow' : 'text-slate-300 hover:text-white'
          }`}
        >
          🏉 Podiums par Poste (5D • 3L • ¾)
        </button>
      </div>

      {subTab === 'team' ? (
        <div className="space-y-6">
          {/* PODIUM JOUEUR LE PLUS ACTIF (PROGRAMME + EXTRAS LIBRES +20 PTS) */}
          <div className="bg-gradient-to-br from-[#0A1E3F] to-emerald-950/70 border-2 border-emerald-400/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-800 pb-3">
              <Flame className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-lg font-black text-white">⚡ Podium "Le Joueur le Plus Actif"</h3>
                <p className="text-xs text-emerald-200">Cumul total des séances du programme + les séances extras ajoutées via le bouton + (+20 pts/extra).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sortedMostActive.slice(0, 3).map((p, idx) => {
                const totalSessions = p.completedIds.length + (p.extraCount || 0);
                return (
                  <div
                    key={p.id}
                    className={`bg-[#061024] border rounded-xl p-4 flex items-center gap-3 relative overflow-hidden ${
                      idx === 0 ? 'border-emerald-400 ring-2 ring-emerald-400/30' : 'border-blue-800'
                    }`}
                  >
                    <span className="absolute top-2 right-2 text-xl font-black opacity-60">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                    </span>
                    <PlayerAvatarBadge avatarId={p.avatarId} size="md" />
                    <div>
                      <h4 className="text-sm font-black text-white">{p.name}</h4>
                      <p className="text-[11px] text-sky-300">{p.poste}</p>
                      <p className="text-xs font-black text-emerald-400 mt-1">
                        {totalSessions} séances totales ({p.extraCount || 0} extra{(p.extraCount || 0) > 1 ? 's' : ''})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0A1E3F]/95 border-2 border-[#FACC15] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-800 pb-3">
              <Trophy className="w-6 h-6 text-[#FACC15]" />
              <div>
                <h3 className="text-lg font-black text-white">Le Podium "Gros Moteur"</h3>
                <p className="text-xs text-blue-200">Les joueurs les plus réguliers sur les 6 séances et bonus.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sortedGrosMoteur.slice(0, 3).map((p, idx) => (
                <div
                  key={p.id}
                  className={`bg-[#061024] border rounded-xl p-4 flex items-center gap-3 relative overflow-hidden ${
                    idx === 0 ? 'border-[#FACC15] ring-2 ring-[#FACC15]/30' : 'border-blue-800'
                  }`}
                >
                  <span className="absolute top-2 right-2 text-xl font-black opacity-40">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </span>
                  <PlayerAvatarBadge avatarId={p.avatarId} size="md" />
                  <div>
                    <h4 className="text-sm font-black text-white">{p.name}</h4>
                    <p className="text-[11px] text-sky-300">{p.poste}</p>
                    <p className="text-xs font-bold text-[#FACC15] mt-1">{p.completedIds.length} séances • {p.points} PTS</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A1E3F]/95 border border-blue-700 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-800 pb-3">
              <Clock className="w-6 h-6 text-sky-300" />
              <div>
                <h3 className="text-lg font-black text-white">⏱️ Le Joueur avec le Plus de Temps (Tous Postes)</h3>
                <p className="text-xs text-blue-200">Volume horaire cumulé d'entraînement pendant la trêve.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sortedTime.slice(0, 3).map((p, idx) => (
                <div key={p.id} className="bg-[#061024] border border-blue-800 rounded-xl p-4 flex items-center gap-3">
                  <PlayerAvatarBadge avatarId={p.avatarId} size="sm" />
                  <div>
                    <h4 className="text-sm font-black text-white">{p.name}</h4>
                    <p className="text-[11px] text-sky-300">{p.poste}</p>
                    <p className="text-xs font-black text-[#FACC15] mt-0.5">{p.trainingMinutes || 0} minutes d'effort</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-950 to-[#0A1E3F] border-2 border-blue-600 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-800 pb-3">
              <Zap className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-lg font-black text-white">⚔️ Le Choc des Titans (Avants vs Trois-Quarts)</h3>
                <p className="text-xs text-blue-200">Moyenne des séances validées par clan. L'équipe perdante paie sa tournée ou range le matériel en janvier !</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#061024] border-2 border-amber-500/60 rounded-xl p-5 text-center space-y-2">
                <span className="text-2xl">🛡️</span>
                <h4 className="text-base font-black text-white">Pack des Avants (5D + 3L)</h4>
                <p className="text-3xl font-black text-[#FACC15]">{avgAvants} <span className="text-xs text-slate-300">séances/joueur</span></p>
                <p className="text-xs text-slate-300">Effectif : {avants.length} joueurs</p>
              </div>

              <div className="bg-[#061024] border-2 border-sky-500/60 rounded-xl p-5 text-center space-y-2">
                <span className="text-2xl">⚡</span>
                <h4 className="text-base font-black text-white">Trois-Quarts (¾)</h4>
                <p className="text-3xl font-black text-sky-400">{avgTroisQuarts} <span className="text-xs text-slate-300">séances/joueur</span></p>
                <p className="text-xs text-slate-300">Effectif : {troisQuarts.length} joueurs</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1E3F]/95 border border-blue-700 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-blue-800 pb-3">
              <Camera className="w-6 h-6 text-rose-400" />
              <div>
                <h3 className="text-lg font-black text-white">🎅 Le Prix du "Père Noël le plus créatif"</h3>
                <p className="text-xs text-blue-200">Vote pour la meilleure photo de séance insolite (bonnet de Noël, famille, neige...).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submissions.map((sub) => (
                <div key={sub.id} className="bg-[#061024] border border-blue-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{sub.playerName}</span>
                    <span className="text-[10px] text-sky-300">{sub.sessionTitle}</span>
                  </div>
                  <div className="h-40 rounded-lg bg-blue-950/70 border border-blue-800 flex items-center justify-center overflow-hidden">
                    {sub.photoUrl && sub.photoUrl !== 'simulated' ? (
                      <img src={sub.photoUrl} alt="Créa Noël" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-3xl">🎄📸</span>
                        <p className="text-xs text-slate-300 mt-2 italic">« {sub.caption} »</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#FACC15] font-bold">Perf : {sub.perfResult || 'Validé'}</span>
                    <button
                      type="button"
                      onClick={() => onToggleLike(sub.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition ${
                        sub.likedByMe ? 'bg-rose-600 text-white' : 'bg-blue-950 text-slate-300 border border-blue-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${sub.likedByMe ? 'fill-current' : ''}`} />
                      {sub.likes || 0} votes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A1E3F]/95 border-2 border-amber-500/70 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="border-b border-blue-800 pb-3">
              <h3 className="text-base font-black text-white">🛡️ Meilleur 5 de Devant</h3>
              <p className="text-[11px] text-blue-200">Classement spécifique des avants</p>
            </div>
            <div className="space-y-3">
              {players5D.map((p, idx) => (
                <div key={p.id} className="bg-[#061024] border border-blue-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-[#FACC15]">#{idx + 1}</span>
                    <PlayerAvatarBadge avatarId={p.avatarId} size="sm" />
                    <div>
                      <h4 className="text-xs font-black text-white">{p.name}</h4>
                      <p className="text-[10px] text-sky-300">{p.completedIds.length} séances</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#FACC15]">{p.points} PTS</span>
                </div>
              ))}
              {players5D.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">Aucun joueur dans ce poste</p>}
            </div>
          </div>

          <div className="bg-[#0A1E3F]/95 border-2 border-emerald-500/70 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="border-b border-blue-800 pb-3">
              <h3 className="text-base font-black text-white">🦌 Meilleur 3ème Ligne</h3>
              <p className="text-[11px] text-blue-200">Classement spécifique des 3ème lignes</p>
            </div>
            <div className="space-y-3">
              {players3L.map((p, idx) => (
                <div key={p.id} className="bg-[#061024] border border-blue-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-[#FACC15]">#{idx + 1}</span>
                    <PlayerAvatarBadge avatarId={p.avatarId} size="sm" />
                    <div>
                      <h4 className="text-xs font-black text-white">{p.name}</h4>
                      <p className="text-[10px] text-sky-300">{p.completedIds.length} séances</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#FACC15]">{p.points} PTS</span>
                </div>
              ))}
              {players3L.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">Aucun joueur dans ce poste</p>}
            </div>
          </div>

          <div className="bg-[#0A1E3F]/95 border-2 border-sky-500/70 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="border-b border-blue-800 pb-3">
              <h3 className="text-base font-black text-white">⚡ Meilleur Trois-Quarts (¾)</h3>
              <p className="text-[11px] text-blue-200">Classement spécifique des ¾</p>
            </div>
            <div className="space-y-3">
              {players34.map((p, idx) => (
                <div key={p.id} className="bg-[#061024] border border-blue-800 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-[#FACC15]">#{idx + 1}</span>
                    <PlayerAvatarBadge avatarId={p.avatarId} size="sm" />
                    <div>
                      <h4 className="text-xs font-black text-white">{p.name}</h4>
                      <p className="text-[10px] text-sky-300">{p.completedIds.length} séances</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#FACC15]">{p.points} PTS</span>
                </div>
              ))}
              {players34.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">Aucun joueur dans ce poste</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// ESPACE PRÉPARATEUR PHYSIQUE (PROTÉGÉ PAR CODE COACH & VALIDATION)
// ============================================================================

const CoachValidationView = ({
  submissions,
  onApprove,
  onReject,
  customFieldImage,
  onUploadFieldImage,
  onResetFieldImage,
  customLogoImage,
  onUploadLogoImage,
  onResetLogoImage,
  coachPin,
  onUpdateCoachPin
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (enteredPin === coachPin) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Code coach incorrect ! (Par défaut : 1900)');
    }
  };

  const handleSaveNewPin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      onUpdateCoachPin(newPin.trim());
      setNewPin('');
      setSuccessMsg('Code coach mis à jour avec succès !');
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg('Le code doit comporter au moins 4 caractères.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto w-full mt-12 bg-[#0A1E3F]/95 border-2 border-[#FACC15] rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#FACC15] text-slate-950 flex items-center justify-center mx-auto text-xl shadow">
            🛡️
          </div>
          <h2 className="text-xl font-black text-white">Accès Réservé au Prépa</h2>
          <p className="text-xs text-blue-200">Entre ton code secret de préparateur physique pour accéder au panneau de validation.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              maxLength={8}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="Code secret (ex: 1900)"
              className="w-full px-4 py-3 rounded-xl bg-[#061024] border border-blue-700 text-center text-lg font-black tracking-widest text-[#FACC15] focus:outline-none focus:border-[#FACC15]"
            />
            {errorMsg && <p className="text-xs text-red-400 text-center mt-1.5 font-bold">{errorMsg}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white font-black text-sm shadow-lg transition"
          >
            Déverrouiller l'Espace Prépa
          </button>
        </form>
      </div>
    );
  }

  const handleFileRead = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 pb-8">
      <div className="bg-[#061024] border border-blue-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-black text-[#FACC15] uppercase">Sécurité Espace Prépa</h3>
          <p className="text-xs text-slate-300">Modifie ton code secret coach pour bloquer l'accès aux joueurs.</p>
        </div>
        <form onSubmit={handleSaveNewPin} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Nouveau code..."
            className="px-3 py-1.5 rounded-lg bg-[#0A1E3F] border border-blue-700 text-xs text-white w-32"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition"
          >
            Changer
          </button>
        </form>
      </div>
      {successMsg && <p className="text-xs text-emerald-400 font-bold text-center">{successMsg}</p>}

      <div className="bg-[#0A1E3F]/95 border-2 border-[#FACC15] rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 border-b border-blue-800 pb-4">
          <RcaCrestBadge size={44} customLogo={customLogoImage} />
          <div>
            <h2 className="text-xl font-black text-white">Personnalisation Club • Terrain & Logo Noël</h2>
            <p className="text-xs text-blue-200">
              Importez la photo du terrain du club ainsi que le logo du club en version Noël.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#061024] border border-blue-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#FACC15] uppercase flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" /> Fond du Parcours (Terrain du Club)
              </span>
              {customFieldImage && (
                <button
                  type="button"
                  onClick={onResetFieldImage}
                  className="text-[11px] font-bold text-rose-400 hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-700 hover:border-[#FACC15] rounded-xl p-4 cursor-pointer transition bg-blue-950/30 min-h-[120px]">
              {customFieldImage ? (
                <img src={customFieldImage} alt="Terrain du club" className="max-h-28 rounded-lg object-cover w-full" />
              ) : (
                <div className="text-center space-y-1">
                  <Upload className="w-6 h-6 text-[#FACC15] mx-auto" />
                  <span className="text-xs font-bold text-sky-200 block">Importer la photo du terrain du club</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileRead(e, onUploadFieldImage)}
                className="hidden"
              />
            </label>
          </div>

          <div className="bg-[#061024] border border-blue-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#FACC15] uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Logo du Club (Version Noël)
              </span>
              {customLogoImage && (
                <button
                  type="button"
                  onClick={onResetLogoImage}
                  className="text-[11px] font-bold text-rose-400 hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-700 hover:border-[#FACC15] rounded-xl p-4 cursor-pointer transition bg-blue-950/30 min-h-[120px]">
              {customLogoImage ? (
                <img src={customLogoImage} alt="Logo Noël" className="h-24 w-24 rounded-xl object-contain" />
              ) : (
                <div className="text-center space-y-1">
                  <Upload className="w-6 h-6 text-[#FACC15] mx-auto" />
                  <span className="text-xs font-bold text-sky-200 block">Importer le logo du club Noël</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileRead(e, onUploadLogoImage)}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-[#0A1E3F]/95 border border-blue-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="border-b border-blue-800 pb-3">
          <h2 className="text-lg font-black text-white">Contrôle des Preuves Photo ({submissions.length})</h2>
          <p className="text-xs text-blue-200">
            Valide ou annule à tout moment une séance. En cas d'annulation, le niveau suivant se re-verrouille automatiquement.
          </p>
        </div>

        <div className="space-y-3">
          {submissions.map((sub) => {
            const statusBadgeClass = sub.status === 'validated'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : sub.status === 'rejected'
              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40';

            const statusLabel = sub.status === 'validated' ? 'VALIDÉE' : sub.status === 'rejected' ? 'ANNULÉE' : 'EN ATTENTE';

            return (
              <div
                key={sub.id}
                className="bg-[#061024] border border-blue-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-blue-950 border border-blue-700 flex items-center justify-center overflow-hidden shrink-0">
                    {sub.photoUrl && sub.photoUrl !== 'simulated' ? (
                      <img src={sub.photoUrl} alt="Preuve" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">📸</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-white">{sub.playerName}</span>
                      <span className="text-[11px] font-bold text-sky-300">• {sub.sessionTitle}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${statusBadgeClass}`}>
                        {statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic mt-1">« {sub.caption} »</p>
                    {sub.perfResult && (
                      <p className="text-[11px] font-bold text-[#FACC15] mt-0.5">Perf : {sub.perfResult}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {sub.status !== 'validated' && (
                    <button
                      type="button"
                      onClick={() => onApprove(sub)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition"
                    >
                      ✅ Valider
                    </button>
                  )}
                  {sub.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => onReject(sub)}
                      className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition"
                    >
                      ❌ Annuler / Bloquer
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CARTE TERRAIN DE RUGBY RCA EN MODE NOËL
// ============================================================================

const ChristmasRugbyMap = ({
  sessions,
  completedIds,
  pendingIds,
  onSelectSession,
  selectedRole,
  customFieldImage,
  customLogoImage
}) => {
  const [lockedAlert, setLockedAlert] = useState(null);

  const getStatus = (session) => {
    if (completedIds.includes(session.id)) return 'completed';
    if (pendingIds.includes(session.id)) return 'pending';
    if (session.type === 'extra') {
      return completedIds.includes(session.unlockAfterId) ? 'available' : 'locked';
    }
    const routeSessions = sessions.filter((s) => s.type !== 'extra');
    const prevRouteSessions = routeSessions.slice(0, routeSessions.findIndex((s) => s.id === session.id));
    const allPrevDone = prevRouteSessions.every((s) => completedIds.includes(s.id));
    return allPrevDone || prevRouteSessions.length === 0 ? 'available' : 'locked';
  };

  const mainRouteSessions = sessions.filter((s) => s.type !== 'extra');
  const routePointsStr = mainRouteSessions.map((s) => `${s.mapPos.x},${s.mapPos.y}`).join(' ');

  return (
    <div className="relative w-full h-[560px] sm:h-[620px] rounded-2xl overflow-hidden border-2 border-[#FACC15]/70 shadow-2xl bg-gradient-to-b from-[#06152d] via-[#0d2b45] to-[#113d2e] select-none">
      {customFieldImage ? (
        <img
          src={customFieldImage}
          alt="Terrain du club en mode Noël"
          className="absolute inset-0 w-full h-full object-cover opacity-65 brightness-90 contrast-110 pointer-events-none"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#061024]/60 via-[#0A1E3F]/35 to-[#061024]/70 pointer-events-none" />
      )}

      <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {!customFieldImage && (
          <>
            <rect x="6" y="6" width="88" height="88" fill="none" stroke="#ffffff" strokeWidth="0.6" />
            <line x1="6" y1="16" x2="94" y2="16" stroke="#ffffff" strokeWidth="0.5" />
            <line x1="6" y1="84" x2="94" y2="84" stroke="#ffffff" strokeWidth="0.5" />
            <line x1="6" y1="32" x2="94" y2="32" stroke="#FACC15" strokeWidth="0.4" strokeDasharray="1.5,1.5" />
            <line x1="6" y1="68" x2="94" y2="68" stroke="#FACC15" strokeWidth="0.4" strokeDasharray="1.5,1.5" />
            <line x1="6" y1="50" x2="94" y2="50" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="#FACC15" strokeWidth="0.4" />
          </>
        )}
        <polyline
          fill="none"
          stroke="#FACC15"
          strokeWidth="0.9"
          strokeDasharray="1.8,1.5"
          points={routePointsStr}
        />
      </svg>

      {customLogoImage && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <img src={customLogoImage} alt="Blason central Noël" className="w-32 h-32 object-contain rounded-full" />
        </div>
      )}

      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-black px-3 py-1 rounded-full bg-[#0A1E3F]/90 border border-[#FACC15] text-[#FACC15] shadow z-10">
        🥅 En-but Nord • Reprise Janvier
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-black px-3 py-1 rounded-full bg-[#0A1E3F]/90 border border-sky-400 text-sky-200 shadow z-10">
        🎄 En-but Sud • Coup d'envoi 21 Décembre
      </div>

      {sessions.map((session) => {
        const status = getStatus(session);
        const roleDist = session.roleDistances?.[selectedRole.id];
        const isExtra = session.type === 'extra';
        const isBonus = session.type === 'bonus';

        let statusBg = 'bg-[#1D4ED8] border-[#FACC15] text-white ring-4 ring-[#FACC15]/40';
        if (status === 'completed') statusBg = 'bg-emerald-600 border-white text-white';
        else if (status === 'pending') statusBg = 'bg-amber-500 border-white text-slate-950 animate-pulse';
        else if (status === 'available') {
          if (isExtra) statusBg = 'bg-purple-700 border-[#FACC15] text-white ring-4 ring-purple-400/40';
          else if (isBonus) statusBg = 'bg-rose-700 border-[#FACC15] text-white ring-4 ring-rose-400/40';
        } else if (status === 'locked') {
          statusBg = 'bg-slate-900/90 border-slate-600 text-slate-400 opacity-85';
        }

        return (
          <div
            key={session.id}
            style={{ left: `${session.mapPos.x}%`, top: `${session.mapPos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => {
                if (status === 'locked') {
                  if (isExtra) {
                    setLockedAlert(`🔒 Séance EXTRA verrouillée ! Valide d'abord la séance correspondante (${session.unlockLabel}).`);
                  } else {
                    setLockedAlert(`🔒 Verrouillé ! Valide d'abord l'étape précédente pour débloquer « ${session.title} ».`);
                  }
                  setTimeout(() => setLockedAlert(null), 3500);
                } else {
                  onSelectSession(session);
                }
              }}
              className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center border-2 transition-transform hover:scale-110 shadow-xl ${statusBg}`}
            >
              <span className="text-xl sm:text-2xl">{status === 'locked' ? '🔒' : isBonus ? '🎁' : isExtra ? '🔥' : '🏉'}</span>
              <span className="text-[9px] font-black uppercase tracking-tight">
                {status === 'completed' ? 'Validé' : status === 'pending' ? 'En revue' : isExtra ? 'EXTRA' : session.date}
              </span>
            </button>

            <div className="mt-1 px-2 py-0.5 rounded bg-[#061024]/90 border border-blue-800/80 text-center max-w-[145px]">
              <p className="text-[10px] font-black text-white truncate">{session.title.replace(/^Séance \d+ : /, '')}</p>
              {roleDist && <p className="text-[9px] font-bold text-[#FACC15] truncate">{roleDist.distance}</p>}
            </div>
          </div>
        );
      })}

      {lockedAlert && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-2xl border border-white/40 text-center max-w-md">
          {lockedAlert}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MODALE LIEN D'INVITATION & CHOIX D'AVATAR (5 AVATARS DE NOËL)
// ============================================================================

const InviteOnboardingModal = ({ isOpen, onClose, onJoinPlayer, clubName, inviteCode, customLogoImage }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [roleId, setRoleId] = useState('3L');
  const [selectedAvatarId, setSelectedAvatarId] = useState('av1');

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onJoinPlayer({ name: name.trim(), roleId, avatarId: selectedAvatarId });
  };

  const copyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    alert('Lien d\'invitation copié dans le presse-papier !');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0A1E3F] border-2 border-[#FACC15] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#061024] border border-blue-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <RcaCrestBadge size={56} customLogo={customLogoImage} />
          </div>
          <h2 className="text-xl font-black text-white">Rejoindre le Défi • {clubName}</h2>
          <p className="text-xs text-blue-200">Entre ton prénom, choisis ton poste et sélectionne ton avatar de Noël pour intégrer l'équipe !</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-sky-200 block mb-1">Prénom & Nom du Joueur</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Arthur Dupont"
              className="w-full px-4 py-3 rounded-xl bg-[#061024] border border-blue-700 text-sm text-white focus:outline-none focus:border-[#FACC15]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-sky-200 block mb-1">Ton Poste sur le Terrain</label>
            <div className="grid grid-cols-3 gap-2">
              {PLAYER_ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRoleId(r.id)}
                  className={`py-2 px-1 rounded-xl text-xs font-black border transition ${
                    roleId === r.id
                      ? 'bg-[#1D4ED8] border-[#FACC15] text-white shadow'
                      : 'bg-[#061024] border-blue-900 text-slate-300'
                  }`}
                >
                  {r.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-sky-200 block mb-2">Choisis ton Avatar de Noël (5 choix)</label>
            <div className="grid grid-cols-5 gap-2">
              {RUGBY_XMAS_AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setSelectedAvatarId(av.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition ${
                    selectedAvatarId === av.id
                      ? 'border-[#FACC15] bg-[#1D4ED8]/60 ring-2 ring-[#FACC15]/40 scale-105'
                      : 'border-blue-900 bg-[#061024] opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[9px] font-black mt-1 text-slate-200 truncate">{av.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#061024] border border-blue-800 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Code d'invitation club</span>
              <span className="text-xs font-black text-[#FACC15]">{inviteCode}</span>
            </div>
            <button
              type="button"
              onClick={copyLink}
              className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-slate-200 text-xs font-black border border-blue-800 flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" /> Copier le lien
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-xl transition"
          >
            C'est parti, entrer dans le XV de Noël ! 🏉🎄
          </button>
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT EFFET NEIGE HIVERNALE
// ============================================================================

const Snowfall = () => {
  const snowflakes = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {snowflakes.map((_, i) => {
        const leftPos = (i * 4.2) % 100;
        const animDuration = 6 + (i % 7);
        const animDelay = (i * 0.3) % 5;
        return (
          <div
            key={i}
            style={{
              left: `${leftPos}%`,
              animationDuration: `${animDuration}s`,
              animationDelay: `${animDelay}s`,
            }}
            className="absolute top-[-10px] text-white/40 text-xs animate-bounce"
          >
            ❄️
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// APPLICATION PRINCIPALE
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [clubName] = useState('RCA Rugby Amiens (1900)');
  const [inviteCode] = useState('RCA-NOEL-1900');
  const [coachPin, setCoachPin] = useState('1900');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCustomExtraModal, setShowCustomExtraModal] = useState(false);

  const [customFieldImage, setCustomFieldImage] = useState(null);
  const [customLogoImage, setCustomLogoImage] = useState(null);

  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [currentPlayerId, setCurrentPlayerId] = useState('p1');
  const [selectedRoleId, setSelectedRoleId] = useState('3L');
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [selectedSession, setSelectedSession] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const currentPlayer = players.find((p) => p.id === currentPlayerId) || players[0];
  const selectedRole = PLAYER_ROLES.find((r) => r.id === selectedRoleId) || PLAYER_ROLES[1];

  const handleJoinViaInvite = ({ name, roleId, avatarId }) => {
    const roleObj = PLAYER_ROLES.find((r) => r.id === roleId) || PLAYER_ROLES[1];
    const newId = `p-${Date.now()}`;
    const newPlayer = {
      id: newId,
      name,
      roleId,
      poste: roleObj.label,
      group: roleObj.group,
      avatarId,
      points: 50,
      trainingMinutes: 0,
      extraCount: 0,
      perfScore: 80,
      bestPerfNote: 'Inscrit via lien',
      completedIds: [],
      pendingIds: [],
      finishOrder: null,
    };
    setPlayers((prev) => [newPlayer, ...prev]);
    setCurrentPlayerId(newId);
    setSelectedRoleId(roleId);
    setShowInviteModal(false);
    setToastMessage(`Bienvenue ${name} ! +50 PTS offerts.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSubmitCustomExtra = ({ title, durationMin, photoUrl, caption }) => {
    const newSub = {
      id: `sub-extra-${Date.now()}`,
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      sessionId: `custom-extra-${Date.now()}`,
      sessionTitle: title,
      isCustomExtra: true,
      customPoints: 20,
      customMinutes: durationMin,
      status: 'pending',
      photoUrl,
      caption,
      perfResult: `${durationMin} min (+20 PTS)`,
      date: 'Extra Libre',
      likes: 0,
      likedByMe: false,
    };
    setSubmissions((prev) => [newSub, ...prev]);
    setShowCustomExtraModal(false);
    setToastMessage('Séance extra (+20 PTS) transmise au préparateur physique pour validation !');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleSubmitProof = (session, proofData) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      sessionId: session.id,
      sessionTitle: session.title,
      status: 'pending',
      photoUrl: proofData.photoUrl,
      caption: proofData.caption || 'Séance validée !',
      perfResult: proofData.perfResult,
      date: session.date,
      likes: 0,
      likedByMe: false,
    };
    setSubmissions((prev) => [newSub, ...prev]);

    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id !== currentPlayer.id) return p;
        return {
          ...p,
          pendingIds: [...(p.pendingIds || []), session.id],
        };
      })
    );

    setSelectedSession(null);
    setToastMessage('Preuve transmise au préparateur physique avec succès ! En attente de validation.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleCoachApprove = (sub) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: 'validated' } : s))
    );

    if (sub.isCustomExtra) {
      const ptsToAdd = sub.customPoints || 20;
      const minsToAdd = sub.customMinutes || 30;
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id !== sub.playerId) return p;
          return {
            ...p,
            points: p.points + ptsToAdd,
            trainingMinutes: (p.trainingMinutes || 0) + minsToAdd,
            extraCount: (p.extraCount || 0) + 1,
          };
        })
      );
      setToastMessage(`Séance extra de ${sub.playerName} validée ! +${ptsToAdd} PTS.`);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const sessionObj = INITIAL_SESSIONS.find((s) => s.id === sub.sessionId);
    const ptsToAdd = sessionObj ? sessionObj.points : 100;
    const minsToAdd = sessionObj ? 45 : 45;

    setPlayers((prev) => {
      return prev.map((p) => {
        if (p.id !== sub.playerId) return p;
        const alreadyDone = p.completedIds.includes(sub.sessionId);
        const newCompleted = alreadyDone
          ? p.completedIds
          : [...p.completedIds, sub.sessionId];
        const newPending = (p.pendingIds || []).filter((id) => id !== sub.sessionId);
        return {
          ...p,
          points: alreadyDone ? p.points : p.points + ptsToAdd,
          trainingMinutes: alreadyDone ? (p.trainingMinutes || 0) : (p.trainingMinutes || 0) + minsToAdd,
          completedIds: newCompleted,
          pendingIds: newPending,
        };
      });
    });

    setToastMessage(`Séance de ${sub.playerName} validée par le coach ! +${ptsToAdd} PTS.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleLike = (subId) => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id !== subId) return s;
        const alreadyLiked = Boolean(s.likedByMe);
        return {
          ...s,
          likedByMe: !alreadyLiked,
          likes: (s.likes || 0) + (alreadyLiked ? -1 : 1),
        };
      })
    );
  };

  const handleCoachReject = (sub) => {
    const wasValidated = sub.status === 'validated';
    setSubmissions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: 'rejected' } : s))
    );

    if (sub.isCustomExtra) {
      if (wasValidated) {
        setPlayers((prev) =>
          prev.map((p) => {
            if (p.id !== sub.playerId) return p;
            return {
              ...p,
              points: Math.max(0, p.points - (sub.customPoints || 20)),
              trainingMinutes: Math.max(0, (p.trainingMinutes || 0) - (sub.customMinutes || 30)),
              extraCount: Math.max(0, (p.extraCount || 0) - 1),
            };
          })
        );
      }
      setToastMessage(`Séance extra de ${sub.playerName} annulée par le coach.`);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id !== sub.playerId) return p;
        return {
          ...p,
          completedIds: p.completedIds.filter((id) => id !== sub.sessionId),
          pendingIds: (p.pendingIds || []).filter((id) => id !== sub.sessionId),
        };
      })
    );

    setToastMessage(`Séance de ${sub.playerName} rejetée/annulée par le coach. Niveau re-verrouillé.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const navItems = [
    { id: 'map', label: 'Terrain RCA Noël', icon: '🏟️' },
    { id: 'podium', label: 'Podiums', icon: '🏆' },
    { id: 'coach', label: 'Espace Prépa (Validation)', icon: '🛡️', badge: submissions.filter(s => s.status === 'pending').length || null },
  ];

  return (
    <div className="min-h-screen bg-[#061024] text-slate-100 flex flex-col md:flex-row font-sans relative overflow-x-hidden">
      <Snowfall />

      <aside className="w-full md:w-64 bg-[#0A1E3F]/95 backdrop-blur-xl border-b md:border-b-0 md:border-r border-blue-900/80 flex flex-col justify-between z-30">
        <div>
          <div className="p-4 border-b border-blue-800/80 flex items-center gap-3 bg-gradient-to-r from-[#0A1E3F] to-[#1D4ED8]">
            <RcaCrestBadge size={40} customLogo={customLogoImage} />
            <div>
              <span className="text-[10px] font-black uppercase text-[#FACC15]">RCA 1900</span>
              <h1 className="font-black text-sm text-white">Le XV de Noël</h1>
            </div>
          </div>

          <nav className="p-3 flex md:flex-col gap-1.5 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 md:w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
                  activeTab === item.id ? 'bg-[#1D4ED8] text-white shadow-lg' : 'text-blue-100 hover:bg-blue-950'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 text-[11px] font-black rounded-full bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3.5 border-t border-blue-900 bg-[#061024] flex md:flex-col items-center md:items-stretch justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <PlayerAvatarBadge avatarId={currentPlayer.avatarId} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate">{currentPlayer.name}</p>
              <p className="text-[10px] text-sky-300 truncate">{currentPlayer.poste}</p>
            </div>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-3 py-2 rounded-lg bg-[#FACC15] hover:bg-yellow-300 text-slate-950 text-xs font-black transition flex items-center justify-center gap-1.5"
          >
            <Link2 className="w-3.5 h-3.5" /> Rejoindre par Lien
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 z-10">
        <header className="h-16 px-4 sm:px-6 border-b border-blue-800 flex items-center justify-between bg-[#0A1E3F]/90">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-sky-300 shrink-0">Poste :</span>
            {PLAYER_ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRoleId(r.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold shrink-0 ${
                  selectedRoleId === r.id ? 'bg-[#FACC15] text-slate-950' : 'text-blue-200'
                }`}
              >
                {r.shortLabel}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowCustomExtraModal(true)}
              title="Ajouter une séance extra libre (+20 PTS)"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg flex items-center gap-1 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Séance Extra</span>
              <span className="text-[10px] bg-slate-950/40 px-1.5 py-0.5 rounded">+20 PTS</span>
            </button>
            <div className="bg-[#061024] border border-blue-700 px-3 py-1 rounded-xl text-xs font-black text-[#FACC15]">
              🪙 {currentPlayer.points} PTS
            </div>
          </div>
        </header>

        {toastMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-center text-xs font-black shadow-lg">
            {toastMessage}
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto flex flex-col">
          {activeTab === 'map' && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h2 className="text-xl font-black text-white">Terrain du Club • 6 Séances + 2 Cadeaux + 2 Extras</h2>
                <span className="text-xs text-sky-300 font-bold">Règle : 4 jours max pour valider chaque étape</span>
              </div>
              <ChristmasRugbyMap
                sessions={INITIAL_SESSIONS}
                completedIds={currentPlayer.completedIds}
                pendingIds={currentPlayer.pendingIds || []}
                onSelectSession={(s) => setSelectedSession(s)}
                selectedRole={selectedRole}
                customFieldImage={customFieldImage}
                customLogoImage={customLogoImage}
              />
            </div>
          )}

          {activeTab === 'podium' && (
            <PodiumView
              players={players}
              submissions={submissions}
              onToggleLike={handleToggleLike}
            />
          )}

          {activeTab === 'coach' && (
            <CoachValidationView
              submissions={submissions}
              onApprove={handleCoachApprove}
              onReject={handleCoachReject}
              customFieldImage={customFieldImage}
              onUploadFieldImage={(img) => {
                setCustomFieldImage(img);
                setToastMessage('Photo du terrain du club appliquée en fond du parcours !');
                setTimeout(() => setToastMessage(null), 4000);
              }}
              onResetFieldImage={() => setCustomFieldImage(null)}
              customLogoImage={customLogoImage}
              onUploadLogoImage={(img) => {
                setCustomLogoImage(img);
                setToastMessage('Logo Noël du club mis à jour !');
                setTimeout(() => setToastMessage(null), 4000);
              }}
              onResetLogoImage={() => setCustomLogoImage(null)}
              coachPin={coachPin}
              onUpdateCoachPin={(p) => setCoachPin(p)}
            />
          )}
        </main>
      </div>

      <InviteOnboardingModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onJoinPlayer={handleJoinViaInvite}
        clubName={clubName}
        inviteCode={inviteCode}
        customLogoImage={customLogoImage}
      />

      <CustomExtraModal
        isOpen={showCustomExtraModal}
        onClose={() => setShowCustomExtraModal(false)}
        onSubmitCustomExtra={handleSubmitCustomExtra}
      />

      <SessionModal
        session={selectedSession}
        status={
          selectedSession
            ? currentPlayer.completedIds.includes(selectedSession.id)
              ? 'completed'
              : (currentPlayer.pendingIds || []).includes(selectedSession.id)
              ? 'pending'
              : 'available'
            : 'available'
        }
        onClose={() => setSelectedSession(null)}
        onSubmitProof={handleSubmitProof}
        selectedRole={selectedRole}
      />

      {/* BOUTON FLOTTANT "+" EN BAS À DROITE POUR AJOUTER UNE SÉANCE EXTRA (+20 PTS) */}
      <button
        type="button"
        onClick={() => setShowCustomExtraModal(true)}
        title="Ajouter une séance extra (+20 PTS)"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl border-2 border-[#FACC15] flex items-center justify-center transition-transform hover:scale-110"
      >
        <Plus className="w-7 h-7 stroke-[3]" />
      </button>
    </div>
  );
}

// ============================================================================
// MODALE DÉTAIL D'UNE SÉANCE & VALIDATION PHOTO OBLIGATOIRE
// ============================================================================

const SessionModal = ({ session, status, onClose, onSubmitProof, selectedRole }) => {
  if (!session) return null;

  const [equipmentMode, setEquipmentMode] = useState('gym'); // 'gym' | 'home'
  const [photoPreview, setPhotoPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [perfResult, setPerfResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Chronomètre intégré
  const initialSeconds = session.timerPresets?.[0]?.seconds || 300;
  const [timerSeconds, setTimerSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimerSeconds(session.timerPresets?.[0]?.seconds || 300);
    setIsRunning(false);
    setPhotoPreview(null);
    setCaption('');
    setPerfResult('');
    setErrorMsg('');
  }, [session]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
      setErrorMsg('');
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!photoPreview) {
      setErrorMsg('⚠️ Photo obligatoire ! Ajoute une preuve photo pour pouvoir enregistrer la séance.');
      return;
    }
    onSubmitProof(session, {
      photoUrl: photoPreview,
      caption,
      perfResult,
    });
  };

  const roleDist = session.roleDistances?.[selectedRole.id];
  const activeBlocks = session.hasEquipmentVariants
    ? equipmentMode === 'gym'
      ? session.gymBlocks
      : session.homeBlocks
    : session.blocks;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0A1E3F] border-2 border-[#FACC15] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative text-white max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#061024] border border-blue-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#1D4ED8] text-white">
              {session.week} • {session.date}
            </span>
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#FACC15] text-slate-950">
              +{session.points} PTS
            </span>
            <span className="text-[11px] font-bold text-rose-300">
              ⏳ Délai max : {session.deadlineDate} (4 jours)
            </span>
          </div>
          <h2 className="text-xl font-black text-white">{session.title}</h2>
          <p className="text-xs text-blue-200">{session.subtitle}</p>
        </div>

        {/* Distance spécifique au poste pour les séances de course */}
        {roleDist && (
          <div className="bg-[#061024] border border-[#FACC15]/70 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-[#FACC15] block">
                Consigne Poste : {selectedRole.label}
              </span>
              <span className="text-sm font-black text-white">{roleDist.distance}</span>
            </div>
            <span className="text-xs text-sky-300 italic">{roleDist.note}</span>
          </div>
        )}

        {/* Sélecteur Avec Matériel / Sans Matériel */}
        {session.hasEquipmentVariants && (
          <div className="flex bg-[#061024] border border-blue-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setEquipmentMode('gym')}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition ${
                equipmentMode === 'gym' ? 'bg-[#1D4ED8] text-white shadow' : 'text-slate-300'
              }`}
            >
              🏋️ Avec Matériel (Salle)
            </button>
            <button
              type="button"
              onClick={() => setEquipmentMode('home')}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition ${
                equipmentMode === 'home' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300'
              }`}
            >
              🏠 Sans Matériel (Maison)
            </button>
          </div>
        )}

        {/* Blocs d'exercices */}
        <div className="space-y-2.5">
          {activeBlocks?.map((blk, idx) => (
            <div key={idx} className="bg-[#061024] border border-blue-800/80 rounded-xl p-3.5 space-y-1">
              <h4 className="text-xs font-black text-[#FACC15] uppercase">{blk.name}</h4>
              <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">{blk.details}</p>
            </div>
          ))}
        </div>

        {/* Chronomètre intégré si disponible */}
        {session.timerPresets && session.timerPresets.length > 0 && (
          <div className="bg-blue-950/60 border border-blue-700 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-[#FACC15]" />
              <div>
                <span className="text-[10px] font-bold text-sky-300 block uppercase">Chrono Séance</span>
                <span className="text-xl font-black font-mono text-white">{formatTime(timerSeconds)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {session.timerPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsRunning(false);
                    setTimerSeconds(preset.seconds);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#061024] border border-blue-800 text-[11px] font-bold text-sky-200 hover:border-[#FACC15]"
                >
                  {preset.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsRunning((r) => !r)}
                className="px-3 py-1.5 rounded-lg bg-[#FACC15] text-slate-950 text-xs font-black flex items-center gap-1"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
            </div>
          </div>
        )}

        {/* Zone d'envoi de preuve photo obligatoire */}
        {status === 'completed' ? (
          <div className="p-4 rounded-xl bg-emerald-600/20 border border-emerald-500 text-center text-xs font-black text-emerald-300">
            ✅ Séance déjà validée par le préparateur physique !
          </div>
        ) : status === 'pending' ? (
          <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500 text-center text-xs font-black text-amber-300">
            ⏳ Preuve envoyée ! En attente de validation par le préparateur physique.
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="space-y-3 border-t border-blue-800 pt-4">
            <div>
              <label className="text-xs font-black text-[#FACC15] flex items-center gap-1.5 mb-1.5">
                <Camera className="w-4 h-4" /> Preuve Photo Obligatoire (pour débloquer la suite)
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-700 hover:border-[#FACC15] rounded-xl p-4 cursor-pointer transition bg-blue-950/30 min-h-[110px]">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preuve séance" className="h-32 rounded-lg object-cover w-full" />
                ) : (
                  <div className="text-center space-y-1">
                    <Upload className="w-6 h-6 text-[#FACC15] mx-auto" />
                    <span className="text-xs font-bold text-sky-200 block">Cliquer pour importer ta photo</span>
                    <span className="text-[10px] text-slate-400">Selfie transpi, montre GPS, bonnet de Noël, photo de famille...</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-sky-200 block mb-1">Performance / Chrono</label>
                <input
                  type="text"
                  value={perfResult}
                  onChange={(e) => setPerfResult(e.target.value)}
                  placeholder={session.perfPlaceholder}
                  className="w-full px-3 py-2 rounded-xl bg-[#061024] border border-blue-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-sky-200 block mb-1">Message / Défi Noël</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ex: Terminé avec le bonnet du club !"
                  className="w-full px-3 py-2 rounded-xl bg-[#061024] border border-blue-700 text-xs text-white"
                />
              </div>
            </div>

            {errorMsg && <p className="text-xs font-black text-rose-400 text-center">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl transition"
            >
              Envoyer ma preuve au Prépa (+{session.points} PTS)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};