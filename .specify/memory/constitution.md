
# The Savage Dad Constitution

This document outlines the foundational, non-negotiable principles governing the design, development, and content of The Savage Dad project. All features and contributions must adhere to these rules to maintain brand integrity and user experience. This constitution is derived from "The Savage Dad Style Guide."

---

## I. Core Principles

These are the high-level tenets that guide all decisions. A feature or component is only considered compliant if it upholds all of these principles.

### Principle 1: Uphold the Persona

All user-facing text, from marketing copy to error messages, must embody the "Savage Dad" persona.

* **Gate:** Does the language reflect the traits of **Street Authenticity**, **Renaissance Man**, and **Protective Patriarch**?
* **Requirement:** The voice must be direct, witty, and trustworthy. Avoid corporate jargon.
* **Reference:** *The Savage Dad Style Guide, Section I.*

### Principle 2: Dark Theme First

The primary aesthetic is dark mode. The application must be designed, built, and tested with the dark theme as the default and primary experience.

* **Gate:** Is the feature optimized for and visually consistent with the "Street Wear Black" background (`#1F1B16`)?
* **Requirement:** Light mode is a secondary consideration and must not compromise the dark theme's integrity.
* **Reference:** *The Savage Dad Style Guide, Section II & III.*

### Principle 3: Adhere to the Visual Identity

The established color palette, typography, and imagery guidelines are mandatory. No deviation is permitted without a formal amendment to the Style Guide.

* **Gate:** Does the UI exclusively use the approved color tokens and font styles?
* **Requirement:** All visual elements must align with the high-contrast, urban street aesthetic.
* **Reference:** *The Savage Dad Style Guide, Section II.*

### Principle 4: Comply with the Component System

All UI components must be built using the Material Design 3 (M3) component library, customized according to the style guide.

* **Gate:** Is the component an M3 component styled with "Savage Dad" tokens, or a new component that is fully consistent with M3 and the style guide?
* **Requirement:** Do not introduce one-off components or styles that conflict with the established design system.
* **Reference:** *The Savage Dad Style Guide, Section III.*

---

## II. Design & UX Gates

These gates ensure a consistent and branded user experience.

### Gate 1: Color Palette Compliance

| Role                    | Color Name        | Dark Mode Hex | Requirement                                      |
| :---------------------- | :---------------- | :------------ | :----------------------------------------------- |
| **Primary**       | Sunburn Orange    | `#FFB683`   | Used for active states, indicators, accents.     |
| **Secondary**     | Earthy Tan        | `#DBC0A3`   | Used for secondary elements, borders, inputs.    |
| **Action/CTA**    | Reflective Silver | `#FFFFFF`   | **High-priority buttons ONLY.**            |
| **Background**    | Street Wear Black | `#1F1B16`   | The foundational background color.               |
| **On Background** | Silver/White Text | `#EBE1D9`   | The primary text color.                          |
| **Success**       | Muted Olive       | `#A8D773`   | Used for success confirmations and snackbars.    |
| **Error**         | Crimson Red       | `#FFB4AB`   | Used for errors, validation, and failure states. |

### Gate 2: Typography Compliance

| Element              | Font Family       | Weight  | Requirement                                   |
| :------------------- | :---------------- | :------ | :-------------------------------------------- |
| **H1, H2**     | **Bangers** | Regular | Reserved for high-impact titles and CTAs.     |
| **H3, H4**     | **Roboto**  | Medium  | Used for subheadings.                         |
| **Body Text**  | **Roboto**  | Regular | Used for all functional and descriptive text. |
| **Button/CTA** | **Roboto**  | Bold    | Used for all button and action text.          |

### Gate 3: Layout and Spacing

* **Grid System:** All layouts must be built on a 12-column grid.
* **Spacing:** All margins, padding, and gaps must use an 8-point system (e.g., `8px`, `16px`, `24px`).

---

## III. Technical Gates

These gates ensure code quality and adherence to the technical architecture.

### Gate 4: Component Implementation

| Component                  | Implementation Rule                                                                         |
| :------------------------- | :------------------------------------------------------------------------------------------ |
| **Primary Button**   | Must be an M3 Elevated/Filled button. Text is all-caps.                                     |
| **Secondary Button** | Must be an M3 Outlined button.                                                              |
| **Text Input**       | Must be an M3 Filled Text Field. Focused state uses the**Secondary** color.           |
| **Product Card**     | Must use the M3 Card/Surface component. Product titles must use the**Bangers** font.  |
| **Alerts/Toasts**    | Must use the M3 Snackbar component. Colors must map to**Success** or **Error**. |

### Gate 5: Imagery and Media

* **Photography Style:** All lifestyle imagery must be high-contrast street photography.
* **Product Shots:** All product photography must use a clean, charcoal gray or black background.
* **Asset Optimization:** All images must be optimized for the web to ensure fast load times.

---

## IV. Amendment Process

Any proposed changes to this constitution must be accompanied by a corresponding update to "The Savage Dad Style Guide." Changes require review and approval to ensure the brand's core identity remains intact.
