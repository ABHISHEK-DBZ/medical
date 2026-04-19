# CareCompanion | Smart Medicine Dispenser

Welcome to the **CareCompanion** landing page repository! CareCompanion is an interactive, conceptual website for a smart medicine dispenser designed for seniors and their caregivers.

## 🚀 Features

This project showcases a beautifully designed, functionally rich landing page with several interactive components:

- **Claymorphism UI**: A soft, accessible, and friendly design system utilizing customized CSS variables and layered Box-Shadows.
- **Dynamic Pre-Order Waitlist Modal**: Fully accessible modal dialog (keyboard & assistive tech friendly) with form submission simulation.
- **Interactive Product Mockup**: A visually responsive product demo showing dispensing actions.
- **Live Caregiver Dashboard**: An interactive section rendering dynamic mock data, showing how caregivers can monitor adherence, battery life, and trigger remote alerts to the device.
- **Medical Interaction Checker**: A clinical logic engine that analyzes mock drug pairings (e.g., Warfarin + Aspirin) and dynamically renders safety warnings based on known interactions.
- **Responsive Layout**: Adapts perfectly across Desktop, Tablet, and Mobile screens.
- **Dark Mode Support**: A seamless light and dark mode toggler that remembers user preference via `localStorage`.

## 🛠️ Built With

- **HTML5** (Semantically structured and Accessible)
- **CSS3** (Custom properties, Flexbox, Grid, Keyframes)
- **Vanilla JavaScript** (ES6+, DOM Manipulation, Intersection Observers, Dynamic Rendering)

## 📂 Project Structure

```text
├── index.html   # Main HTML structure and content
├── style.css    # Styling, layout, and claymorphic variables
├── script.js    # Interactive logic (Dashboard, Checker, Modal, Animations)
└── README.md    # Project documentation
```

## 💻 How to Run Locally

Since this is a static frontend project, no complex server setup is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/ABHISHEK-DBZ/medical.git
   ```
2. Navigate into the directory:
   ```bash
   cd medical
   ```
3. Open `index.html` in your favorite web browser or use a local development server like VS Code's Live Server extension.

## ♿ Accessibility (a11y)

This project was built with accessibility in mind:
- Semantic HTML tags (`nav`, `header`, `section`)
- `aria-labels` and `aria-live` attributes
- Keyboard-navigable modals (closes on `Escape`) 
- High-contrast text elements

## 🏥 Clinical Logic Engine Note

*The Medical Interaction Checker currently runs on a simulated mapping object for demonstration purposes. It is not real medical advice. Do not use this tool in lieu of a real doctor or pharmacist.*