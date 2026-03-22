export const siteConfig = {
  name: "Gradient Text Generator",
  title: "Gradient Text Generator — Create Beautiful CSS Text Gradients",
  description:
    "Generate stunning CSS gradient text effects with a live preview. Choose colors, directions, and gradient types. Copy production-ready CSS instantly. Free, no sign-up required.",
  url: "https://gradient-text-generator.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "Palette",
  brandAccentColor: "#8b5cf6",

  keywords: [
    "gradient text generator",
    "CSS gradient text",
    "text gradient CSS",
    "gradient text effect",
    "CSS text color gradient",
    "background-clip text",
    "webkit text gradient",
  ],
  applicationCategory: "DesignApplication",

  themeColor: "#8b5cf6",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
    "https://github.com/Jagodana-Studio-Private-Limited",
  ],

  links: {
    github:
      "https://github.com/Jagodana-Studio-Private-Limited/gradient-text-generator",
    website: "https://jagodana.com",
  },

  footer: {
    about:
      "A free, browser-based tool for creating CSS gradient text effects. Design, preview, and copy production-ready code in seconds.",
    featuresTitle: "Features",
    features: [
      "Live gradient text preview",
      "Linear, radial & conic gradients",
      "Custom colors and direction",
      "One-click CSS copy",
    ],
  },

  hero: {
    badge: "Free & No Sign-Up",
    titleLine1: "Create Beautiful",
    titleGradient: "Gradient Text Effects",
    subtitle:
      "Design stunning CSS gradient text with a live preview. Pick colors, adjust direction, choose gradient types, and copy production-ready CSS — all in your browser.",
  },

  featureCards: [
    {
      icon: "🎨",
      title: "Multiple Gradient Types",
      description:
        "Choose from linear, radial, or conic gradients with full control over direction and angle.",
    },
    {
      icon: "⚡",
      title: "Live Preview",
      description:
        "See your gradient text update in real-time as you adjust colors, angles, and settings.",
    },
    {
      icon: "📋",
      title: "Copy-Ready CSS",
      description:
        "Get production-ready CSS with all vendor prefixes included. One click to copy.",
    },
  ],

  relatedTools: [
    {
      name: "Color Palette Generator",
      url: "https://color-palette-generator.tools.jagodana.com",
      icon: "🎭",
      description: "Generate beautiful color palettes for your projects.",
    },
    {
      name: "Gradient Generator",
      url: "https://gradient-generator.tools.jagodana.com",
      icon: "🌈",
      description: "Create CSS gradients for backgrounds and borders.",
    },
    {
      name: "CSS Text Shadow Generator",
      url: "https://css-text-shadow-generator.tools.jagodana.com",
      icon: "💫",
      description: "Design beautiful text shadow effects with CSS.",
    },
    {
      name: "Color Contrast Checker",
      url: "https://color-contrast-checker.tools.jagodana.com",
      icon: "♿",
      description: "Check color contrast ratios for accessibility compliance.",
    },
    {
      name: "Tailwind Shades Generator",
      url: "https://tailwind-shades-generator.tools.jagodana.com",
      icon: "🎨",
      description: "Generate custom Tailwind CSS color shades from any color.",
    },
    {
      name: "CSS Filter Playground",
      url: "https://css-filter-playground.tools.jagodana.com",
      icon: "🔧",
      description: "Experiment with CSS filter effects in real-time.",
    },
  ],

  howToSteps: [
    {
      name: "Enter Your Text",
      text: "Type or paste the text you want to apply a gradient effect to.",
      url: "",
    },
    {
      name: "Choose Gradient Colors",
      text: "Pick your gradient colors, type (linear/radial/conic), and direction angle.",
      url: "",
    },
    {
      name: "Copy the CSS",
      text: "Click the copy button to get production-ready CSS with vendor prefixes.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "How do CSS gradient text effects work?",
      answer:
        "CSS gradient text uses background-clip: text combined with a gradient background. The gradient is applied to the background of the text element, then the text color is set to transparent so the gradient shows through the letter shapes.",
    },
    {
      question: "Do gradient text effects work in all browsers?",
      answer:
        "Yes! Gradient text is supported in all modern browsers including Chrome, Firefox, Safari, and Edge. The generated CSS includes the -webkit-background-clip vendor prefix for maximum compatibility.",
    },
    {
      question: "Can I use more than two colors in my gradient?",
      answer:
        "Yes! This tool supports up to 5 color stops. Click 'Add Color' to add additional colors to your gradient for more complex and vibrant effects.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Absolutely! This tool is 100% free, runs entirely in your browser, and requires no sign-up or API key. Your data never leaves your device.",
    },
  ],

  pages: {
    "/": {
      title: "Gradient Text Generator — Create Beautiful CSS Text Gradients",
      description:
        "Generate stunning CSS gradient text effects with a live preview. Choose colors, directions, and gradient types. Copy production-ready CSS instantly.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
