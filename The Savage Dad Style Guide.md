#  **The Savage Dad Style Guide**

## **I. Brand Foundation & Voice**

This section defines the core personality and verbal identity of the "Savage Dad" brand, ensuring all communication resonates with the target audience.

### **1\. Brand Persona**

The "Savage Dad" is defined by resilience, faith, and unapologetic protection. The voice must reflect the authority of a survivor and the charisma of a community leader.

| Trait | Description | Voice Application |
| :---- | :---- | :---- |
| **Street Authenticity** | A survivor and father rooted in the inner-city streets of Hip Hop America.. | **Direct, Unapologetic, No Bullshit.** Avoid corporate jargon. Use active, firm language. |
| **Renaissance Man** | A Generation X survivor, African American, Hip Hop Head, Sneaker Freak and Tech Prepper. | **Witty, Knowledgeable, Confident.** Speak with the authority of someone who knows *the drop* and is ahead of the curve. |
| **Protective Patriarch** | Strong moral values, a love for God, and an unwavering commitment to family. | **Charismatic, Encouraging, Trustworthy.** The tone is mentoring and ensures the user feels respected and secure. |

 

### **2\. Tone and Messaging Guidelines**

| Context | Tone | Example |
| :---- | :---- | :---- |
| **Landing Page/Marketing** | Bold, Provocative, Confident. | *"You Know The Rules. Don't Sleep On The Drop."* |
| **Call to Action (CTAs)** | Commanding, Branded, Urgent. | *"Secure The Bag," "Make It Yours," "See The Latest Drop."* |
| **Success Messages** | Confident Acknowledgment. | *"Secured. That’s going straight to the cart."* |
| **Error/Validation** | Corrective, Firm, but Relatable. | *"Whoa, check that email again, pops."* |
| **Transactional Email** | Respectful, Clear, Authoritative. | *"Your Order Is Locked In. Stay Ready."* |

## **II. Visual Identity**

This section defines the unique color and typography rules that override standard Material Design 3 defaults, establishing the "Savage Dad" aesthetic.

### **1\. Color Palette**

The palette is built around the strong contrast of urban black/charcoal, the energy of Sunburn Orange, and the grounding of Earthy Tan. All colors adhere to M3 accessibility standards.

| Role | Color Name | Hex Value (Light Mode) | Hex Value (Dark Mode) | Usage |
| :---- | :---- | :---- | :---- | :---- |
| **Primary** | Sunburn Orange (Active) | \#A63E00 | \#FFB683 | Main branding, carousel pagination, active states, loading indicators. |
| **Secondary** | Earthy Tan (Muted) | \#6F5C40 | \#DBC0A3 | Secondary navigation, background accents, subtle borders, newsletter signup fields. |
| **Action/CTA** | Reflective Silver | \#EAEAEA | \#FFFFFF | **HIGH-PRIORITY BUTTONS ONLY.** Ensures maximum contrast on the black theme. |
| **Background** | Street Wear Black | \#FFF8F5 (Light) | **\#1F1B16** (Dark) | The foundation of the theme. Dark Mode (charcoal/near-black) is the primary aesthetic. |
| **On Background** | Silver/White Text | \#1F1B16 | \#EBE1D9 | Primary body text and content. |
| **Success** | Muted Olive | \#7CB342 | \#A8D773 | Order confirmations, successful form submissions. |
| **Error** | Crimson Red | \#D32F2F | \#FFB4AB | Invalid form inputs, checkout failures, stock warnings. |

### **2\. Typography**

A powerful pairing of an aggressive display font for impact and a modernistic, legible font for reading.

| Usage | Font Family | Style/Vibe | Weight | Notes |
| :---- | :---- | :---- | :---- | :---- |
| **Headings (H1, H2, H3)** | **Bangers** (or similar Graffiti/BMX display font) | Aggressive, Energetic, Unapologetic. | Regular | Used sparingly for maximum impact (Landing Page CTA, Product Titles). |
| **Body Text** | **Roboto** | Modern, Clean, Legible (Modernistic). | Regular, Medium, Bold | Used for all functional text: body copy, product descriptions, navigation links, and form fields. |

Export to Sheets

| Element | Font Family | Size (Desktop) | Weight |
| :---- | :---- | :---- | :---- |
| **Display (H1)** | Bangers | 48px | Regular |
| **Headline (H2)** | Bangers | 32px | Regular |
| **Subhead (H3/H4)** | Roboto | 20px | Medium |
| **Body Text** | Roboto | 16px | Regular |
| **Button/CTA** | Roboto | 14px | Bold |

### **3\. Imagery and Media**

To support the "Urban/Street" aesthetic, all photography must adhere to the following:

* **Style:** High-contrast street photography. Moody, raw, with deep shadows and strong, directional lighting. Avoid brightly lit studio shots.  
* **Color Grading:** Slightly desaturated, with the \#CC5500 (Sunburn Orange) and \#D2B48C (Earthy Tan) naturally emphasized in the background or environment.  
* **Subject:** Models should embody the persona: confident, determined, and in authentic inner-city/street environments.  
* **Product Shots:** Product images should use a clean, charcoal gray or black background to ensure the apparel itself remains the focus, while maintaining the overall dark theme.

---

## **III. PWA Component Library & Patterns (Using Material 3\)**

The application will use the Material Design 3 (M3) system to ensure all components are accessible, responsive, and follow best practices. **The color tokens defined in Section II are applied to the M3 components.**

### **1\. Layout and Grid**

* **Grid:** Standard 12-column grid for flexible, responsive content layouts.  
* **Spacing:** Use an 8-point system for all spacing (padding and margins) to ensure vertical and horizontal rhythm consistency.  
* **Theme:** The PWA will primarily use the **Dark Mode** M3 theme (\#1F1B16 Background) to match the "Street Wear Black" aesthetic.

### **2\. Core Components**

| Component | Style Rules (M3 Application) | Savage Dad Customization |
| :---- | :---- | :---- |
| **Primary Buttons** | M3 Elevated/Filled button style. | Uses **Action/CTA** (\#FFFFFF) text on a **Primary** (\#FFB683) background. Text uses **Roboto Bold** and is all caps. |
| **Secondary Buttons** | M3 Outlined button style. | Uses **Primary** (\#FFB683) color for the stroke and text. Used for "Add to Cart" or secondary actions. |
| **Product Cards** | M3 Card/Surface component. Elevated with subtle shadow. | Uses the **Surface** (\#2B2723) background. Headers (product names) use **Bangers** for impact. |
| **Text Inputs** | M3 Filled Text Field style. | Uses **Secondary** (\#DBC0A3) for the input underline/border color when focused. Text uses **Roboto Regular**. |
| **Navigation/Tabs** | M3 Navigation Rail (mobile) or Navigation Bar (desktop). | Active tab indicator uses the **Primary** (\#FFB683) color. |

### **3\. PWA-Specific Features**

| Feature | M3 Application | Content/Visual Rules |
| :---- | :---- | :---- |
| **Landing Page CTA** | M3 Hero Container with Primary Button. | The CTA text uses the **Bangers** font, is brief, and follows **Action Language** rules (e.g., "SECURE THE DROP"). |
| **Email Sign-up** | M3 Text Field and Secondary Button. | Use a clear, firm headline: *"Join the Prepper's Circle."* Follows **Secondary Button** rules. |
| **Item Carousel** | M3 Surface Card layout for scrolling items. | Uses **Imagery Guidelines** (high-contrast photos). Navigation arrows use the **Primary** (\#FFB683) color. |
| **Toast/Alerts** | M3 Snackbar component (bottom of screen). | **Error messages** use the **Crimson Red** background. **Success messages** use the **Muted Olive** background. |

---

This style guide provides the complete framework for building a consistent, branded, and high-performance Progressive Web Application for "Savage Dad."

