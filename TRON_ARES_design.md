# ARES_SYSTEM: PORTFOLIO_PROTOCOL [v4.0]
> **SUBJECT:** MARAM SAI SWARAN
> **CLEARANCE:** LEVEL_09_RED
> **STATUS:** SYSTEM_ONLINE | CONTINUOUS_FLUX

---

## 1. THEME SPECIFICATION: TRON / ARES PROTOCOL

### Visual Identity (Cyber-Brutalist)
The interface is designed to simulate a high-fidelity digital mainframe—a frontier neural interface developed under the ARES initiative. 
* **Primary Background:** Void Black (`#0a0a0b`) with a faint, repeating 3D perspective grid overlay (Grid Grey: `#1e1e1e`).
* **Primary Accent:** Ares Red/Neon Peach (`#ff766c` to `#ff5252`). Used for glowing borders, active text, and key indicators.
* **Secondary Text:** Terminal Grey (`#a0a0a0`) for logs, descriptions, and passive data.
* **Typography:** * *Headers/Numbers:* `Space Mono`, `JetBrains Mono` or `Share Tech Mono` (Uppercase, highly tracked).
    * *Body text:* `Inter` or `Roboto Mono` for readable tech-logs.
* **UI Elements:** * Hairline borders (`1px solid #333`).
    * Sharp, non-rounded corners (`border-radius: 0`).
    * Data tables, serial numbers, and 'status' tags scattered around components.
    * Hover effects simulate a CRT screen glitch or a neon flare.

### The "Antigravity" & 3D Tron World Scroll Experience
The background is not a static image, but a WebGL/Three.js rendered environment.
* **The Grid:** A glowing red grid that extends into infinite depth.
* **Antigravity Effect:** As the user scrolls, the camera plunges *forward* and *downward* into the 3D grid. The portfolio UI sections (Hero, Education, Projects) do not scroll linearly; they emerge from the depth of the screen, floating upwards and decelerating smoothly as if affected by zero-gravity inertia. 

---

## 2. SYSTEM ARCHITECTURE (PAGE FLOW & DATA)

### SECTION 001: HERO [INITIALIZE]
* **Background:** Immersive 3D grid. Dark monoliths pulse with red neon lines in the distance.
* **UI Components:** * Header Nav: `HERO | PROJECTS | IDENTITY | STREAM | [INITIALIZE_RESUME]`
    * Central Title: `MARAM_SAI_SWARAN` (Large, glowing, brutalist typography).
    * Subtitle: `PRINCIPAL SYSTEM ARCHITECT // SWE INTERN`
    * System Stats: 
        * `LATENCY: 0.02ms`
        * `STACK: JAVA / SPRING_BOOT / CLOUD`
    * Action: A pulsing button `[ ENTER_THE_GRID ]` that triggers the antigravity plunge into the next section.

### SECTION 002: OPERATOR_IDENTITY [EDUCATION & SPECS]
* **Visual:** Elements float into view on glassmorphic, dark-tinted panels with red borders.
* **Data Node - Education:**
    * `[INSTITUTION]` Vardhaman College of Engineering
    * `[DEGREE]` B.Tech Computer Science (2023 - 2027)
    * `[METRIC_CGPA]` 8.73
* **Data Node - Technical Arsenal:**
    * Rendered as progress bars or raw terminal output arrays.
    * `CORE_LOGIC`: Java, Python, Node.js
    * `FRAMEWORKS`: Spring Boot
    * `INFRASTRUCTURE`: AWS, Google Cloud Platform (Cloud Engineer Certified - Mar 2026)
    * `NEURAL_NETS`: RAG Pipelines, Gemini API, Groq
    * `TERMINALS`: IntelliJ IDEA, VS Code

### SECTION 003: ACTIVE_PROTOCOLS [EXPERIENCE]
* **Layout:** A timeline looking like a server connection log. 
* **Entry 01:** Software Engineer Intern @ DevAI *(Jan 2026 - Present)*
    * *Log:* Developing healthcare-related RAG pipelines and AI integrations.
* **Entry 02:** DSA Mentor @ MentiBy *(Jan 2026)*
    * *Log:* Mentoring student batches in complex Data Structures and Algorithms.
* **Entry 03:** Backend Developer Intern @ PearlThoughts *(Jul 2025 - Aug 2025)*
    * *Log:* Architecting high-availability backend infrastructures.

### SECTION 004: PROJECT_ARCHIVE
* **Layout:** Grid-based cards with thumbnail placeholders. Each card features serial numbers (`SERIAL: 001-ALPHA`).
* **Artifact_01: Secure Cloud Data Hub** *(Oct 2025)*
    * *Stack:* Node.js, Python, AWS.
    * *Status:* Deployed.
* **Artifact_02: Fitness AI** *(Jul 2025)*
    * *Description:* Cloud-native microservices platform.
    * *Status:* Archived.
* **Artifact_03: AI-Powered Chat App** *(Jun 2025)*
    * *Stack:* Spring Boot, WebSockets.
    * *Status:* Active.
* *(Note: System scrub completed. Deprecated healthcare monitoring protocols removed from index).*

### SECTION 005: ESTABLISH_UPLINK [CONTACT]
* **Visual:** Direct terminal interface.
* **Form:** "Transmitter ID", "Frequency Channel", "Payload Content". 
* **Action:** `EXECUTE_TRANSMISSION`
* **Side Panel:** Links to `GITHUB_CORE`, `LINKEDIN_NODE`, and `DOWNLOAD_MANIFESTO` (Resume PDF).

---

## 3. ANTIGRAVITY FULL CODE IMPLEMENTATION PLAN

To achieve the "TRON: ARES" 3D scrolling and antigravity UI effect, use the following stack: **React (Next.js/Vite)** + **Three.js (React Three Fiber/Drei)** + **GSAP (ScrollTrigger)** + **Tailwind CSS**.

### PHASE 1: The Substrate (3D Environment)
1.  **Initialize Canvas:** Set up a full-screen `<Canvas>` behind your UI layers (`position: fixed; z-index: -1;`).
2.  **Generate the Grid:** * Use a custom ShaderMaterial or an `InstancedMesh` to draw a massive wireframe floor and ceiling. 
    * Add fog to the scene (`scene.fog = new THREE.FogExp2(0x0a0a0b, 0.05)`) to fade the grid into blackness.
3.  **Monoliths:** Place massive black rectangular prisms with red emissive edges along the Z-axis to simulate a server city.

### PHASE 2: Antigravity Scroll Mechanics (GSAP + R3F)
1.  **Camera Tie-in:** Map the browser's scroll position to the Three.js camera's Z and Y positions. As the user scrolls down the page, the camera moves rapidly forward (into the screen) and slightly down closer to the grid.
    ```javascript
    // Conceptual GSAP integration
    ScrollTrigger.create({
      trigger: ".main-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        camera.position.z = initialZ - (self.progress * depthScale);
        // Add subtle sine wave for hovering effect
        camera.position.y = initialY + Math.sin(self.progress * Math.PI) * 2; 
      }
    });
    ```

### PHASE 3: Floating UI Elements (HTML DOM Layer)
1.  **Zero-G Inertia Layout:** * Instead of standard scrolling sections, wrap each UI component (Hero, Education, Projects) in a `fixed` or `absolute` container that sits on top of the canvas.
2.  **GSAP Z-Translation:** * Use GSAP to animate the DOM elements based on scroll. Initially, elements (like the Project Archive) are scaled down (`scale: 0.5`), faded out (`opacity: 0`), and translated down (`translateY: 200px`).
    * As the scroll reaches their trigger point, they "float" up into the viewport, scaling to `1.0`, but with a heavy ease/inertia applied so they feel weightless.
    ```javascript
    gsap.to(".project-card", {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power3.out", // Creates the slow deceleration of zero-g
      scrollTrigger: {
        trigger: ".project-section-anchor",
        scrub: 1.5 // The scrub delay creates the floaty, detached feel
      }
    });
    ```

### PHASE 4: Cyber-Brutalist Styling (Tailwind + CSS)
1.  **Glow Effects:**
    ```css
    .ares-border {
      border: 1px solid #ff5252;
      box-shadow: 0 0 10px rgba(255, 82, 82, 0.2), inset 0 0 10px rgba(255, 82, 82, 0.1);
    }
    .text-glow {
      text-shadow: 0 0 8px rgba(255, 82, 82, 0.6);
    }
    ```
2.  **Backdrop Blurs:** Use `backdrop-filter: blur(10px)` with a very transparent dark background (`bg-black/40`) for all content panels so the glowing 3D grid is visible behind the text.

### SYSTEM DIAGNOSTIC / DEPLOYMENT
Once the UI layer and Three.js canvas are synchronized via GSAP ScrollTrigger, the interface will operate not as a webpage, but as an immersive terminal dive into the ARES mainframe. End of sequence.