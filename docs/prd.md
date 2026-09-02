# Requirements Document

## 1. Application Overview

**Application Name:** Mehdi Doss — Personal Portfolio Website

**Description:** A single-page, cinematic, interactive personal portfolio website for Mehdi Doss (AI Engineer / Computer Vision / Robotics / Software). The site functions as an immersive digital experience — not a conventional developer portfolio — communicating a unified identity: machines that see, think, and act. The visual and narrative throughline connects PERCEPTION → INTELLIGENCE → CODE → HARDWARE → ACTION as one integrated system.

**Core Tagline:** \"I BUILD MACHINES THAT SEE, THINK, AND ACT.\"

---

## 2. Users and Use Cases

**Target Users:**
- Recruiters and hiring managers in AI, robotics, and software engineering
- Technical collaborators, researchers, and engineers
- Clients seeking AI/CV/robotics expertise
- Conference organizers and academic contacts

**Core Use Case:** A visitor lands on the site, is immediately immersed in a cinematic experience, scrolls through a narrative that communicates Mehdi's identity and capabilities, explores his projects, and reaches out via the contact section.

---

## 3. Page Structure and Feature Description

### 3.1 Page Structure (Single Page Application)

```
Mehdi Doss Portfolio (SPA)
├── Hero / Landing
├── About / Identity
├── Skills / Capabilities
├── Projects
└── Contact
```

### 3.2 Section Descriptions

#### 3.2.1 Hero / Landing

- Full-screen cinematic intro section occupying 100% of the viewport
- Animated display of the tagline: \"I BUILD MACHINES THAT SEE, THINK, AND ACT.\"
- Name displayed prominently: MEHDI DOSS
- Sub-identity line: AI ENGINEER / COMPUTER VISION / ROBOTICS / SOFTWARE
- Background: animated particle system or neural network visualization rendered on canvas/WebGL
- Glitch text effects applied to the name or tagline
- Custom animated cursor active throughout the entire page
- Scroll indicator prompting the user to continue

#### 3.2.2 About / Identity

- Section presenting who Mehdi Doss is and his engineering philosophy
- Core philosophy statement: \"I BUILD MACHINES THAT SEE, THINK, AND ACT.\"
- Brief narrative describing his identity across: Artificial Intelligence, Computer Vision, Machine Learning, Generative AI / LLMs, Edge AI, Robotics, Embedded Systems, Autonomous Systems, Software Engineering
- Communicates that these are not separate skills but a unified approach to building intelligent systems that connect AI, software, and hardware
- Scroll-triggered entrance animations for text and visual elements

#### 3.2.3 Skills / Capabilities

- Skills presented as an interconnected system — not a list
- Visual representation of the pipeline: PERCEPTION → INTELLIGENCE → CODE → HARDWARE → ACTION
- Each node in the pipeline corresponds to a domain area and is interactive (hover states reveal detail)
- The visual design reinforces that all domains are connected, not siloed
- Scroll-driven animation reveals the pipeline progressively as the user scrolls

#### 3.2.4 Projects

- Showcase of AI, Computer Vision, and Robotics projects
- Each project displayed as a cinematic card or panel
- Hover effects: alive, premium — e.g., depth shift, reveal of project details, visual overlay
- Each project entry includes: project name, brief description, domain tags (e.g., Computer Vision, Edge AI, Robotics)
- Scroll-triggered entrance animations per project card

#### 3.2.5 Contact

- Minimal, premium contact section
- Displays contact information or a simple contact form
- Consistent with the dark, technical aesthetic
- Scroll-triggered entrance animation

---

## 4. Business Rules and Logic

### 4.1 Scroll-Driven Narrative
- The entire page is designed as a scroll-driven cinematic narrative
- Sections transition smoothly as the user scrolls
- Parallax effects applied across sections to create depth
- Animation states are triggered by scroll position, not time alone

### 4.2 Visual Identity System
- Color palette: deep blacks, electric blues, cyan, neon accents — applied consistently across all sections
- Typography: bold, technical fonts throughout
- All animations and effects must reinforce the sci-fi tech demo reel aesthetic
- The PERCEPTION → INTELLIGENCE → CODE → HARDWARE → ACTION pipeline must be visually coherent and recognizable as a single system

### 4.3 Custom Cursor
- A custom cursor replaces the default browser cursor across the entire page
- Cursor behavior changes on hover over interactive elements

### 4.4 Canvas / WebGL Effects
- Particle systems and/or neural network visualizations are rendered via canvas or WebGL
- These effects are present in the Hero section and may extend as ambient background elements in other sections
- Glitch effects are applied to key typographic elements (name, tagline)

### 4.5 Single Page Application Navigation
- All sections exist on a single scrollable page
- Smooth scroll behavior between sections
- Optional fixed navigation bar allowing direct jump to any section

---

## 5. Acceptance Criteria

1. Visitor opens the website and sees the full-screen Hero section with the animated tagline \"I BUILD MACHINES THAT SEE, THINK, AND ACT.\", particle/neural network background, and glitch effects active
2. Visitor scrolls down and the About / Identity section animates into view, communicating Mehdi's unified engineering identity
3. Visitor continues scrolling and the Skills section reveals the PERCEPTION → INTELLIGENCE → CODE → HARDWARE → ACTION pipeline with interactive hover states on each node
4. Visitor scrolls to the Projects section and sees cinematic project cards with alive hover effects displaying project name, description, and domain tags
5. Visitor scrolls to the Contact section and can view contact information or submit a contact form
6. Custom cursor is visible and responsive throughout the entire scroll journey

---

## 6. Out of Scope

- User authentication, login, or registration
- CMS or admin panel for content management
- Blog or article publishing system
- Multi-language / internationalization support
- Dark/light mode toggle
- Analytics dashboard
- E-commerce or payment functionality
