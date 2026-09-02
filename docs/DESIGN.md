## Vibe
- Cyberpunk × Field.io Motion Graphics: the visual DNA of a sci-fi neural interface — dark void backgrounds, electric cyan/blue signal traces, scanline textures, and precision grid overlays drawn from cyberpunk cinema and computational motion design studios. Not decorative; every visual element is data made visible.

## Color
- Primary: #00E5FF
- On Primary: #000810
- Accent: #7B2FFF
- On Accent: #FFFFFF
- Background: #020B18
- Foreground: #E8F4FD
- Muted: #0D1F35
- Border: #0A3A5C

## Typography
- Heading: Orbitron (family: 'Orbitron', sans-serif, weight: 700, url: https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap)
- Body: Inter (family: 'Inter', sans-serif, weight: 400, url: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap)

## Visual Language
- Core visual signature: Animated canvas-drawn neural network nodes and edges — pulsing cyan particles connected by fading signal lines, rendered live on `<canvas>` in the Hero and as ambient background in all sections. This is not decorative — it IS the identity.
- Material & depth: Zero box-shadow. Depth through layered canvas z-stacking: background canvas (neural net), mid canvas (scan lines + HUD grid), foreground content. Borders are 1px cyan at low opacity (#00E5FF18). Active borders pulse to full opacity.
- Containers & buttons: Cards are frameless — defined only by a 1px cyan top-border rule and dark transparent fill (#0D1F3580). Buttons are outlined, uppercase Orbitron text, with a cyan border that traces a scan-fill on hover. No filled button backgrounds except for primary CTA. Shape: sharp corners (border-radius: 0) throughout — zero rounded corners.
- Layout rhythm: Full-bleed dark sections separated by 1px horizontal dividers. Sparse — large voids of deep navy punctuated by isolated high-contrast type and cyan signal elements. The pipeline PERCEPTION → INTELLIGENCE → CODE → HARDWARE → ACTION uses connected node-edge SVG with cyan glow.

## Animation
- Entrance: text characters cascade in letter by letter with staggered opacity 0→1 at 30ms intervals using Framer Motion; section headings glitch-flash (random character swap 3 times) before resolving.
- Interaction: hover on project cards triggers a 200ms cyan border trace from top-left clockwise; node hover on pipeline expands radius + radiates a pulse ring outward.
- Scroll / transition: scroll-driven parallax shifts background canvas at 0.3× scroll rate; section content slides up 40px + fades in on intersection; custom cursor morphs from a 12px dot to a crosshair ring on interactive elements.

## Forbidden
- No rounded corners anywhere — sharp edges only
- No gradient fills on large surfaces — gradients only as 1px glowing border effects
- No white backgrounds or light-mode components

## Additional Notes
- All user-visible copy in English
- Custom cursor: small cyan crosshair dot that scales up on hover over links/buttons
- Canvas neural network: ~80 nodes, random slow drift, edges drawn when distance < 150px, opacity proportional to proximity; nodes pulse on a 3s cycle
- Glitch text effect: keyframe animation rapidly swapping characters for heading text on entrance and on hover
- The pipeline section uses an SVG flowchart with animated dashes traveling along the edges (stroke-dashoffset animation) to show data flowing through PERCEPTION → INTELLIGENCE → CODE → HARDWARE → ACTION