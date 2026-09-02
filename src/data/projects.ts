export type Project = {
  id: string
  title: string
  image: string
  description: string
  tags: string[]
  github: string | null
  demo: string | null
  tools: string[]
  videoDemo?: string
  videoDemoV2?: string
  gallery?: string[]
  longDescription?: string
  tagline?: string
  metrics?: { label: string; value: string }[]
  kaggle?: string | null
  figma?: string
  resourceNote?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'cropeye',
    title: 'CropEye',
    image: '/projects/cropeye/drone_with_pc.jpg',
    tagline: 'Autonomous agricultural drone for real-time olive tree disease detection.',
    description:
      'A real-time olive tree disease detection system built around a YOLOv8n object detection model, classifying healthy vs. Verticillium wilt-affected trees, then compressed for edge inference and flown autonomously via natural-language mission control.',
    tags: ['Computer Vision', 'YOLO', 'Autonomous Flight', 'Edge AI'],
    github: 'https://github.com/hayder-tatsouri/cropEye',
    demo: null,
    kaggle: 'https://www.kaggle.com/code/mehdidoss0/pcd-model',
    tools: ['YOLOv8n', 'ONNX', 'INT8 Quantization', 'Raspberry Pi 4', 'MCP', 'Python'],
    longDescription:
      'CropEye trains a YOLOv8n object detection model to classify healthy vs. Verticillium wilt-affected olive trees, reaching 0.80 mAP@0.5, 0.95 AP on the healthy class, 83% precision, and 81% recall on a held-out test set of 500 images. The model is streamlined for edge inference by exporting to ONNX and applying INT8 post-training quantization, reaching 8–12 FPS on a Raspberry Pi 4 at 320px resolution. A Model Context Protocol (MCP) autonomous control layer enables natural-language flight-mission planning and execution without manual piloting.',
    metrics: [
      { label: 'mAP@0.5', value: '0.80' },
      { label: 'Precision', value: '83%' },
      { label: 'Recall', value: '81%' },
      { label: 'Edge Inference', value: '8–12 FPS' },
    ],
    videoDemo: 'https://www.youtube.com/watch?v=BYxHVi3mqsE',
    gallery: [
      '/projects/cropeye/drone_with_pc.jpg',
      '/projects/cropeye/real_detection.png',
      '/projects/cropeye/fig7_detection_examples.png',
      '/projects/cropeye/fig9_benchmark.png',
      '/projects/cropeye/maps.png',
      '/projects/cropeye/mcp.png',
    ],
  },
  {
    id: 'platevision',
    title: 'PlateVision',
    image: '/projects/platevision/cover.jpg',
    tagline: 'AI-powered license plate recognition for continuous, unattended monitoring.',
    description:
      'A license plate recognition pipeline combining YOLO-based plate detection with EasyOCR, built for real-world Tunisian plates, with automatic validation logic and real-time vehicle tracking.',
    tags: ['Computer Vision', 'YOLO', 'OCR'],
    github: null,
    demo: null,
    kaggle: 'https://www.kaggle.com/code/mehdidoss/ai-night',
    videoDemo: 'https://youtu.be/9BzT70gc6Ok',
    tools: ['YOLO', 'EasyOCR', 'Python', 'OpenCV'],
    longDescription:
      'PlateVision engineers an AI-powered license plate recognition pipeline — YOLO-based detection paired with EasyOCR for character recognition — reaching 90%+ recognition accuracy. Automatic validation logic filters out low-confidence reads, and real-time vehicle tracking keeps plates identified across frames for continuous, unattended monitoring rather than single-shot detection.',
    metrics: [
      { label: 'Recognition Accuracy', value: '90%+' },
      { label: 'Detection', value: 'YOLO' },
      { label: 'OCR Engine', value: 'EasyOCR' },
    ],
    gallery: [
      '/projects/platevision/test.jpg',
      '/projects/platevision/218_Tunisia_6462_label.jpg',
    ],
  },
  {
    id: 'plant-disease-classifier',
    title: 'Plant Disease Classifier',
    image: '/projects/plant_disease/cover.webp',
    tagline: 'Edge-optimized computer vision, compressed for on-device deployment.',
    description:
      'A MobileNetV2 classifier fine-tuned on the PlantVillage dataset for plant disease identification, then compressed with TensorFlow Lite INT8 quantization for edge deployment with minimal accuracy loss.',
    tags: ['Computer Vision', 'Edge AI', 'TensorFlow Lite'],
    github: null,
    demo: null,
    kaggle: 'https://www.kaggle.com/code/mehdidoss/plant-diseases',
    tools: ['MobileNetV2', 'TensorFlow Lite', 'PlantVillage dataset', 'Python'],
    longDescription:
      'This classifier fine-tunes MobileNetV2 on the PlantVillage dataset, delivering 94.35% Top-1 accuracy. The model is then compressed with TensorFlow Lite INT8 quantization for edge deployment, limiting the accuracy drop to just 1.6% (96.4% → 94.8%) while significantly reducing model size — making it practical to run directly on-device rather than round-tripping to a server.',
    metrics: [
      { label: 'Top-1 Accuracy', value: '94.35%' },
      { label: 'Accuracy Drop (quantized)', value: '1.6%' },
      { label: 'Dataset', value: 'PlantVillage' },
    ],
    gallery: [
      '/projects/plant_disease/1774140391000.jpg',
      '/projects/plant_disease/1774140385746.jpg',
      '/projects/plant_disease/1774140386169.jpg',
    ],
  },
  {
    id: 'count-tree',
    title: 'CountTree',
    image: '/projects/count_tree/cover.png',
    tagline: 'AI-powered tree counting and forest health analysis from aerial imagery.',
    description:
      'A computer vision pipeline for counting trees and assessing forest density from aerial imagery, combining segmentation, detection, and geospatial analysis with a user-friendly data workflow.',
    tags: ['Computer Vision', 'Remote Sensing', 'Forest AI'],
    github: null,
    demo: null,
    kaggle: 'https://www.kaggle.com/code/mehdidoss0/count-tree',
    videoDemo: 'https://youtu.be/3OJ4z549eCI',
    tools: ['YOLO', 'OpenCV', 'Python', 'Geospatial Analysis'],
    longDescription:
      'CountTree uses aerial imagery to estimate tree density and count trees in forested regions. The solution combines conventional image processing and object-detection workflows to support automated monitoring, land analysis, and environmental decision-making at scale.',
    metrics: [
      { label: 'Application', value: 'Tree Counting' },
      { label: 'Data', value: 'Aerial Imagery' },
      { label: 'Focus', value: 'Forest Analysis' },
    ],
    gallery: [
      '/projects/count_tree/results.png',
      '/projects/count_tree/Capture d\'écran 2026-09-01 221037.png',
      '/projects/count_tree/Capture d\'écran 2026-09-01 221103.png',
    ],
  },
  {
    id: 'locavroom',
    title: 'LocaVroom',
    image: '/projects/locavroom/cover.png',
    tagline: 'A fully functional car rental website built to explore frontend-backend integration.',
    description:
      'LocaVroom is a car rental website built with HTML, CSS, JavaScript, PHP, and SQL, designed to connect frontend design with backend logic for a complete booking experience.',
    tags: ['Web App', 'Car Rental', 'Backend'],
    github: 'https://github.com/Mehdi-Doss350/LocaVroom-webSite12',
    demo: null,
    videoDemo: 'https://youtu.be/4gTXV1mltb0',
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
    longDescription:
      'Excited to share LocaVroom — my latest project: a fully functional car rental website. Built using HTML, CSS, JavaScript, PHP, and currently expanding into SQL to manage backend data. This project helped me connect the dots between frontend design and backend logic, and it is an ongoing step in my learning journey toward more complete full-stack development.',
    metrics: [
      { label: 'Platform', value: 'Car Rental' },
      { label: 'Stack', value: 'PHP + SQL' },
      { label: 'Focus', value: 'Full-Stack' },
    ],
    gallery: [
      '/projects/locavroom/Capture d\'écran 2026-09-01 223259.png',
    ],
  },
  {
    id: 'loan-application-prediction',
    title: 'Loan Application Prediction',
    image: '/projects/loan_app/cover_loan.png',
    tagline: 'End-to-end loan approval prediction project developed during a one-month internship at SWConsulting.',
    description:
      'An end-to-end banking machine learning project using real French bank data to predict loan acceptance, compare multiple models, and deploy a user-friendly prediction app.',
    tags: ['Machine Learning', 'Finance', 'Streamlit'],
    github: null,
    demo: null,
    kaggle: null,
    resourceNote: 'Internal client project — not publicly shareable.',
    tools: ['Python', 'scikit-learn', 'TabPFN', 'Streamlit', 'Pandas', 'Data Cleaning'],
    longDescription:
      'During a one-month internship at SWConsulting, I worked on an end-to-end loan application prediction project using real data from a French bank. I collected and preprocessed the data, including scraping and cleaning, compared more than five machine learning models, and selected TabPFN as the best-performing model because of its strong accuracy. I then trained the model to generate probability-based predictions for loan acceptance and built a user-friendly Streamlit web application to make real-time predictions accessible. This project was developed for a banking client and was not publicly shareable, but it provided valuable hands-on experience in AI-driven financial decision support and model deployment.',
    metrics: [
      { label: 'Models Compared', value: '5+' },
      { label: 'Best Model', value: 'TabPFN' },
      { label: 'Deployment', value: 'Streamlit' },
    ],
    gallery: [
      '/projects/loan_app/img1.jpg',
      '/projects/loan_app/img2.jpg',
      '/projects/loan_app/img3.jpg',
    ],
  },
  {
    id: 'are-management',
    title: 'ARE Management',
    image: '/projects/are_app/Capture d\'écran 2026-09-01 225645.png',
    tagline: 'A full-stack app built to streamline material reservations for association members.',
    description:
      'ARE Management is a full-stack resource reservation platform that helps association members request and track material usage without spreadsheets or email chains.',
    tags: ['Full-Stack', 'Flutter', 'AI Assistant'],
    github: 'https://github.com/Mehdi-Doss350/ARE-App',
    demo: null,
    videoDemo: 'https://youtu.be/Y3QjYJxyoOU',
    videoDemoV2: 'https://youtube.com/shorts/H53KPg32JjE',
    tools: ['Flutter', 'Dart', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'FastAPI', 'Python', 'Gemini', 'Vector Search'],
    figma: 'https://www.figma.com/design/F57UG2b8kThwR37pXYXBEb/ARE-App?node-id=0-1&p=f&t=WgLziIR7yGASfCxU-0',
    longDescription:
      'I recently integrated ARE-Assistant into ARE Management, an AI-powered assistant that helps members search for materials using natural language, receive project-based recommendations, and submit absences or feedback directly via email. The app simplifies the full lifecycle of resource management: members can reserve materials quickly, see live availability, and track approval status, while admins manage inventory and resolve conflicts centrally. Built with Flutter for the mobile UI, Node.js + Express for the backend, MongoDB Atlas with vector search for smart retrieval, and Python + FastAPI with Google Gemini for the AI layer, this project taught me how to bring an idea from concept to a fully working end-to-end AI-powered application. It deepened my expertise in full-stack development, semantic search, and user-centered design.',
    metrics: [
      { label: 'AI Layer', value: 'Gemini + Vector Search' },
      { label: 'Backend', value: 'FastAPI + Express' },
      { label: 'Focus', value: 'Reservation + Assistant' },
    ],
    gallery: [
      '/projects/are_app/Capture d\'écran 2026-09-01 225645.png',
      '/projects/are_app/Capture d\'écran 2026-09-01 225655.png',
    ],
    
  },
]