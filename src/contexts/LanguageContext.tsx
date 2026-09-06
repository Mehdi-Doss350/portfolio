import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Project } from '@/data/projects'
import type { Experience } from '@/data/experiences'

export type Language = 'en' | 'fr'

type Copy = {
  nav: { about: string; projects: string; experience: string; skills: string; contact: string }
  hero: { status: string; online: string; date: string; coordinates: string; initializing: string; tagline: string; projects: string; contact: string; scroll: string }
  about: { section: string; title: string; quote: string; bio: string; philosophy: string; domains: string; coverage: string; approach: string; mindset: string; timeline: string; engineer: string; location: string; cv: string }
  projects: { section: string; title: string; count: string; internship: string; open: string; categories: Record<string, string> }
  experience: { section: string; title: string; intro: string; more: string; details: string }
  skills: { section: string; title: string; intro: string }
  contact: { section: string; title: string; intro: string; info: string; send: string; ready: string; readyCopy: string; name: string; namePlaceholder: string; email: string; message: string; messagePlaceholder: string; submit: string; direct: string }
  detail: { back: string; notFound: string; removed: string; overview: string; tools: string; video: string; resources: string; internship: string; watch: string; noVideo: string }
}

const copies: Record<Language, Copy> = {
  en: {
    nav: { about: 'WHOAMI', projects: 'Projects', experience: 'EXPERIENCE', skills: 'SKILLS', contact: 'CONTACT' },
    hero: { status: 'SYS.STATUS', online: '● ONLINE', date: 'DATE.STAMP', coordinates: 'LOC.COORD', initializing: 'INITIALIZING SYSTEM', tagline: 'I BUILD MACHINES THAT SEE, THINK, AND ACT.', projects: 'EXPLORE PROJECTS', contact: 'CONNECT', scroll: 'SCROLL' },
    about: { section: 'SECTION_02 / IDENTITY', title: 'WHO I AM', quote: 'I BUILD MACHINES THAT SEE, THINK, AND ACT.', bio: "I'm an AI Engineer at the intersection of perception, intelligence, and hardware. My work spans the entire stack: from raw sensor data to deployed autonomous systems.", philosophy: "I believe the most interesting problems exist at the boundaries: where computer vision meets robotics, ML research becomes embedded firmware, and software intelligence drives physical action.", domains: 'DOMAINS', coverage: 'STACK DEPTH', approach: 'APPROACH', mindset: 'MODE', timeline: 'EDUCATION & EXPERIENCE', engineer: 'AI ENGINEER', location: 'Tunisia', cv: 'CLICK TO VIEW MY CV' },
    projects: { section: 'SECTION_03 / BUILDS', title: 'DEPLOYED SYSTEMS', count: 'PROJECTS LOGGED', internship: 'INTERNSHIP', open: 'Open', categories: { vision: 'COMPUTER VISION', genai: 'GENERATIVE AI', edge: 'EDGE / ROBOTICS', system: 'SYSTEM' } },
    experience: { section: 'SECTION_04 / TRACK RECORD', title: 'EXPERIENCE', intro: 'Beyond engineering: leadership, communication, and teaching roles that shaped how I work with people, not just code.', more: 'more', details: 'View details' },
    skills: { section: 'SECTION_03 / SYSTEMS', title: 'TECH STACK', intro: 'Tools and libraries I build with, grouped by where they sit in the stack.' },
    contact: { section: 'SECTION_05 / CONNECT', title: 'GET IN TOUCH', intro: 'Open to research collaborations, engineering roles, and projects in AI, computer vision, and robotics.', info: 'CONTACT INFO', send: 'SEND A MESSAGE', ready: 'MESSAGE READY', readyCopy: 'Your email app should have opened with the message ready to send. If it did not, email me directly at', name: 'NAME', namePlaceholder: 'Your name', email: 'EMAIL', message: 'MESSAGE', messagePlaceholder: 'Describe your project or inquiry...', submit: 'SEND MESSAGE', direct: 'Your message will be sent directly to' },
    detail: { back: 'Back to portfolio', notFound: 'Project not found', removed: 'This project does not exist or has been removed.', overview: 'Overview', tools: 'Tools used', video: 'Video Demo', resources: 'Resources', internship: 'INTERNSHIP', watch: 'Watch the video demo', noVideo: 'No video demo available for this project yet.' },
  },
  fr: {
    nav: { about: 'À PROPOS', projects: 'PROJETS', experience: 'EXPÉRIENCE', skills: 'COMPÉTENCES', contact: 'CONTACT' },
    hero: { status: 'ÉTAT.SYSTÈME', online: '● EN LIGNE', date: 'HORODATAGE', coordinates: 'COORDONNÉES', initializing: 'INITIALISATION DU SYSTÈME', tagline: 'JE CONÇOIS DES MACHINES QUI VOIENT, RÉFLÉCHISSENT ET AGISSENT.', projects: 'DÉCOUVRIR MES PROJETS', contact: 'ME CONTACTER', scroll: 'DÉFILER' },
    about: { section: 'SECTION_02 / IDENTITÉ', title: 'QUI JE SUIS', quote: 'JE CONÇOIS DES MACHINES QUI VOIENT, RÉFLÉCHISSENT ET AGISSENT.', bio: 'Je suis ingénieur en intelligence artificielle, à la croisée de la perception, de l’intelligence et du matériel. Mon travail couvre toute la chaîne, des données brutes des capteurs aux systèmes autonomes déployés.', philosophy: 'Je crois que les problèmes les plus intéressants se trouvent aux frontières: lorsque la vision par ordinateur rencontre la robotique, que la recherche en ML devient un firmware embarqué et que l’intelligence logicielle produit une action concrète.', domains: 'DOMAINES', coverage: 'COUVERTURE', approach: 'APPROCHE', mindset: 'ÉTAT D’ESPRIT', timeline: 'FORMATION & EXPÉRIENCE', engineer: 'INGÉNIEUR IA', location: 'Tunisie', cv: 'CONSULTER MON CV' },
    projects: { section: 'SECTION_03 / RÉALISATIONS', title: 'SYSTÈMES DÉPLOYÉS', count: 'PROJETS RÉPERTORIÉS', internship: 'STAGE', open: 'Ouvrir', categories: { vision: 'VISION PAR ORDINATEUR', genai: 'IA GÉNÉRATIVE', edge: 'EDGE / ROBOTIQUE', system: 'SYSTÈME' } },
    experience: { section: 'SECTION_04 / PARCOURS', title: 'EXPÉRIENCE', intro: 'Au-delà de l’ingénierie: des expériences en leadership, communication et transmission qui ont façonné ma manière de travailler avec les équipes.', more: 'autres', details: 'Voir les détails' },
    skills: { section: 'SECTION_03 / SYSTÈMES', title: 'STACK TECHNIQUE', intro: 'Les outils et bibliothèques que j’utilise, organisés selon leur rôle dans la stack.' },
    contact: { section: 'SECTION_05 / CONTACT', title: 'PRENONS CONTACT', intro: 'Ouvert aux collaborations de recherche, aux opportunités d’ingénierie et aux projets en IA, vision par ordinateur et robotique.', info: 'COORDONNÉES', send: 'ENVOYER UN MESSAGE', ready: 'MESSAGE PRÊT À ÊTRE ENVOYÉ', readyCopy: 'Votre application de messagerie devrait s’être ouverte avec le message prêt à être envoyé. Si ce n’est pas le cas, écrivez-moi directement à', name: 'NOM', namePlaceholder: 'Votre nom', email: 'E-MAIL', message: 'MESSAGE', messagePlaceholder: 'Décrivez votre projet ou votre demande...', submit: 'ENVOYER LE MESSAGE', direct: 'Votre message sera envoyé directement à' },
    detail: { back: 'Retour au portfolio', notFound: 'Projet introuvable', removed: 'Ce projet n’existe pas ou a été supprimé.', overview: 'Présentation', tools: 'Technologies utilisées', video: 'Démonstration vidéo', resources: 'Ressources', internship: 'STAGE', watch: 'Voir la démonstration vidéo', noVideo: 'Aucune démonstration vidéo n’est encore disponible pour ce projet.' },
  },
}

const frenchProjects: Record<string, Partial<Project>> = {
  cropeye: { tagline: 'Système autonome de détection en temps réel de la verticilliose de l’olivier par drone.', description: 'Système agricole autonome combinant YOLOv8n, Raspberry Pi 4 et contrôle de missions en langage naturel avec MCP, MAVLink et ArduPilot.', longDescription: 'CropEye est un système agricole autonome développé comme projet de fin d’études à l’ENSI. Son pipeline YOLOv8n détecte les oliviers infectés à partir d’images aériennes, tandis que la quantification INT8 permet une inférence embarquée sur Raspberry Pi 4. MCP relie un modèle de langage au drone afin de déclencher des missions autonomes via MAVLink et ArduPilot. Une station sol React fournit la télémétrie, le flux de détection et le contrôle assisté par IA.', tags: ['Vision par ordinateur', 'YOLO', 'Vol autonome', 'IA embarquée'] },
  platevision: { tagline: 'Reconnaissance de plaques assistée par IA pour une surveillance continue et autonome.', description: 'Pipeline de reconnaissance combinant détection YOLO et EasyOCR, conçu pour les plaques tunisiennes avec validation automatique et suivi en temps réel.', longDescription: 'PlateVision met en œuvre une chaîne de reconnaissance de plaques associant détection YOLO et lecture de caractères avec EasyOCR. Une logique de validation élimine les lectures peu fiables et le suivi entre les images conserve l’identification des véhicules pour une surveillance continue.', tags: ['Vision par ordinateur', 'YOLO', 'OCR'] },
  'plant-disease-classifier': { tagline: 'Vision par ordinateur optimisée pour l’edge et le déploiement sur appareil.', description: 'Classifieur MobileNetV2 ajusté sur PlantVillage puis compressé avec TensorFlow Lite INT8 pour un déploiement edge efficace.', longDescription: 'Ce classifieur ajuste MobileNetV2 sur PlantVillage pour identifier les maladies des plantes. La quantification INT8 avec TensorFlow Lite réduit fortement la taille du modèle tout en conservant une précision élevée, ce qui permet une exécution directement sur appareil.', tags: ['Vision par ordinateur', 'IA embarquée', 'TensorFlow Lite'] },
  'count-tree': { tagline: 'Comptage d’arbres et analyse de la santé des forêts par IA à partir d’images aériennes.', description: 'Pipeline de vision par ordinateur combinant segmentation, détection et analyse géospatiale pour le suivi des zones forestières.', longDescription: 'CountTree exploite des images aériennes pour estimer la densité forestière et compter les arbres. La solution combine traitement d’image, détection d’objets et analyse géospatiale afin de soutenir le suivi automatisé et la prise de décision environnementale.', tags: ['Vision par ordinateur', 'Télédétection', 'IA forestière'] },
  'are-management': { tagline: 'Plateforme full-stack de gestion des ressources avec assistance IA.', description: 'Plateforme pour l’Association Robotique ENSI, simplifiant les réservations de matériel, le suivi des disponibilités et l’accompagnement des membres.', longDescription: 'ARE Management numérise le cycle complet de réservation du matériel de l’Association Robotique ENSI. L’application mobile Flutter s’appuie sur une API Node.js et MongoDB, puis intègre ARE-Assistant pour la recherche en langage naturel, les recommandations de matériel et la gestion des demandes.', tags: ['Full-stack', 'Flutter', 'Assistant IA', 'Recherche sémantique'] },
  'loan-application-prediction': { tagline: 'Projet de prédiction d’acceptation de prêts réalisé pendant un stage chez SWConsulting.', description: 'Projet de machine learning bancaire utilisant des données réelles pour comparer des modèles et déployer une application de prédiction.', longDescription: 'Pendant un stage chez SWConsulting, j’ai préparé des données bancaires réelles, comparé plus de cinq modèles et retenu TabPFN pour ses performances. J’ai ensuite déployé une application Streamlit produisant des probabilités d’acceptation en temps réel. Le projet étant réalisé pour un client, ses ressources ne sont pas publiques.', resourceNote: 'Projet client interne — non partageable publiquement.', tags: ['Machine learning', 'Finance', 'Streamlit'] },
  locavroom: { tagline: 'Site de location de voitures conçu pour explorer l’intégration front-end et back-end.', description: 'Site de location développé avec HTML, CSS, JavaScript, PHP et SQL pour proposer une expérience de réservation complète.', longDescription: 'LocaVroom est un site de location de voitures développé avec HTML, CSS, JavaScript, PHP et SQL. Ce projet m’a permis de relier conception front-end, logique back-end et gestion des données dans une expérience de réservation complète.', tags: ['Application web', 'Location de voitures', 'Back-end'] },
}

const frenchExperiences: Record<string, Partial<Experience>> = {
  'media-manager': { role: 'Responsable média', duration: 'Jan. – Juin', summary: 'Pilotage de la communication de Code & Conquer 2.0: identité visuelle, gestion des contenus et promotion à la radio.', longDescription: 'Création de l’identité visuelle de Code & Conquer 2.0, pilotage des contenus sur plusieurs canaux et promotion de l’événement lors d’interventions radio.' },
  'robotics-association': { role: 'Membre → Membre expert', duration: '2 ans', summary: 'Évolution de membre curieux à membre expert en deux ans de pratique de la robotique, de transmission et de projets en équipe.', longDescription: 'Formation des nouveaux membres, participation aux équipes de compétition et création d’outils internes pour l’Association Robotique ENSI.', highlights: ['Formateur à RoboDay 4.0', 'Participation aux équipes RoboCup 7.0 et 8.0', 'Création de l’application AR Management', 'Participation à plusieurs compétitions de robots suiveurs de ligne'] },
}

export function localizeProject(project: Project, language: Language): Project {
  return language === 'fr' ? { ...project, ...frenchProjects[project.id] } : project
}

export function localizeExperience(experience: Experience, language: Language): Experience {
  return language === 'fr' ? { ...experience, ...frenchExperiences[experience.id] } : experience
}

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; copy: Copy }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('portfolio-language') as Language) || 'en')
  const setLanguage = (next: Language) => { setLanguageState(next); localStorage.setItem('portfolio-language', next) }
  useEffect(() => { document.documentElement.lang = language }, [language])
  const value = useMemo(() => ({ language, setLanguage, copy: copies[language] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
