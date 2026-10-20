const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// ============================================================
// PRIMITIVE TOKENS - Raw design values from Fingoals UI
// ============================================================
const primitive = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  color: {
    brand: {
      primary: { $value: "#0B63F6", $type: "color", $description: "Vibrant primary blue", $extensions: { confidence: "observed", source: "Active nav 'Dashboard', 'Unlock full version' card, 'Join Class' button" } },
      primaryHover: { $value: "#0952CE", $type: "color", $description: "Primary blue hover state", $extensions: { confidence: "inferred", source: "Derived from brand primary" } },
      primaryLight: { $value: "#EBF2FF", $type: "color", $description: "Soft blue tint for badges and highlights", $extensions: { confidence: "observed", source: "Badge backgrounds and chart fills" } },
      navy: { $value: "#122A5E", $type: "color", $description: "Deep dark navy for contrast charts", $extensions: { confidence: "observed", source: "Income sources bar chart 2" } },
      sky: { $value: "#A8CBFF", $type: "color", $description: "Light pastel sky blue", $extensions: { confidence: "observed", source: "Income sources bar chart 4 & gauge chart" } },
      cyan: { $value: "#00B4D8", $type: "color", $description: "Cyan blue for metrics highlight", $extensions: { confidence: "observed", source: "+73.6% stat text" } }
    },
    neutral: {
      0: { $value: "#FFFFFF", $type: "color", $description: "Pure white", $extensions: { confidence: "observed", source: "Card surfaces, white text on dark cards" } },
      50: { $value: "#F8F9FA", $type: "color", $description: "Off-white canvas background", $extensions: { confidence: "observed", source: "Main dashboard canvas background" } },
      100: { $value: "#F0F2F5", $type: "color", $description: "Light gray for inactive pill tabs and icon buttons", $extensions: { confidence: "observed", source: "Top nav pills, icon buttons (settings, bell)" } },
      200: { $value: "#E4E7EC", $type: "color", $description: "Subtle borders and dividers", $extensions: { confidence: "observed", source: "Card borders, dropdown borders" } },
      300: { $value: "#D0D5DD", $type: "color", $description: "Secondary control border", $extensions: { confidence: "estimated", source: "Border outlines on light buttons" } },
      400: { $value: "#98A2B3", $type: "color", $description: "Placeholder and tertiary text", $extensions: { confidence: "estimated", source: "Secondary icons and inactive elements" } },
      500: { $value: "#667085", $type: "color", $description: "Secondary/muted text", $extensions: { confidence: "observed", source: "Breadcrumb 'Overview > All Reports', sublabels" } },
      600: { $value: "#475467", $type: "color", $description: "Muted dark body text", $extensions: { confidence: "estimated", source: "Nav inactive text" } },
      700: { $value: "#344054", $type: "color", $description: "Medium dark text", $extensions: { confidence: "estimated", source: "Subheading text" } },
      800: { $value: "#1D2939", $type: "color", $description: "Dark surface background", $extensions: { confidence: "observed", source: "Financial mastery promo card bg" } },
      900: { $value: "#101828", $type: "color", $description: "Near-black primary text", $extensions: { confidence: "observed", source: "Main headings, financial values '$ 17,3K', '$ 532,921'" } },
      950: { $value: "#0C0F14", $type: "color", $description: "Black pill background and black cards", $extensions: { confidence: "observed", source: "Overview active nav item, Financial report card, 30 Days badge" } }
    },
    success: {
      50: { $value: "#ECFDF3", $type: "color", $description: "Success badge background", $extensions: { confidence: "observed", source: "+15% discount for member badge bg" } },
      500: { $value: "#12B76A", $type: "color", $description: "Success primary green", $extensions: { confidence: "observed", source: "+15% discount text, positive indicators" } },
      700: { $value: "#027A48", $type: "color", $description: "Success dark green text", $extensions: { confidence: "estimated", source: "Green badge text" } }
    },
    warning: {
      50: { $value: "#FFFAEB", $type: "color", $description: "Warning light background", $extensions: { confidence: "proposed", source: "Design system completeness" } },
      500: { $value: "#F79009", $type: "color", $description: "Warning primary orange", $extensions: { confidence: "proposed", source: "Design system completeness" } }
    },
    danger: {
      50: { $value: "#FEF3F2", $type: "color", $description: "Danger light background", $extensions: { confidence: "proposed", source: "Design system completeness" } },
      500: { $value: "#F04438", $type: "color", $description: "Danger primary red", $extensions: { confidence: "proposed", source: "Design system completeness" } }
    }
  },
  typography: {
    fontFamily: {
      sans: { $value: "Plus Jakarta Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", $type: "fontFamily", $description: "Primary modern sans-serif", $extensions: { confidence: "estimated", source: "Clean geometric sans with friendly rounded curves" } },
      mono: { $value: "'JetBrains Mono', 'Fira Code', monospace", $type: "fontFamily", $description: "Monospace font for metrics/code", $extensions: { confidence: "proposed", source: "Completeness" } }
    },
    fontSize: {
      10: { $value: "10px", $type: "dimension" },
      11: { $value: "11px", $type: "dimension" },
      12: { $value: "12px", $type: "dimension" },
      13: { $value: "13px", $type: "dimension" },
      14: { $value: "14px", $type: "dimension" },
      16: { $value: "16px", $type: "dimension" },
      18: { $value: "18px", $type: "dimension" },
      20: { $value: "20px", $type: "dimension" },
      24: { $value: "24px", $type: "dimension" },
      28: { $value: "28px", $type: "dimension" },
      32: { $value: "32px", $type: "dimension" },
      36: { $value: "36px", $type: "dimension" },
      40: { $value: "40px", $type: "dimension" }
    },
    fontWeight: {
      regular: { $value: "400", $type: "fontWeight" },
      medium: { $value: "500", $type: "fontWeight" },
      semibold: { $value: "600", $type: "fontWeight" },
      bold: { $value: "700", $type: "fontWeight" }
    },
    lineHeight: {
      none: { $value: "1", $type: "number" },
      tight: { $value: "1.2", $type: "number" },
      snug: { $value: "1.3", $type: "number" },
      normal: { $value: "1.5", $type: "number" },
      relaxed: { $value: "1.6", $type: "number" }
    },
    letterSpacing: {
      tight: { $value: "-0.02em", $type: "dimension" },
      normal: { $value: "0em", $type: "dimension" },
      wide: { $value: "0.02em", $type: "dimension" }
    }
  },
  spacing: {
    0: { $value: "0px", $type: "dimension" },
    2: { $value: "2px", $type: "dimension" },
    4: { $value: "4px", $type: "dimension" },
    6: { $value: "6px", $type: "dimension" },
    8: { $value: "8px", $type: "dimension" },
    10: { $value: "10px", $type: "dimension" },
    12: { $value: "12px", $type: "dimension" },
    14: { $value: "14px", $type: "dimension" },
    16: { $value: "16px", $type: "dimension" },
    20: { $value: "20px", $type: "dimension" },
    24: { $value: "24px", $type: "dimension" },
    28: { $value: "28px", $type: "dimension" },
    32: { $value: "32px", $type: "dimension" },
    36: { $value: "36px", $type: "dimension" },
    40: { $value: "40px", $type: "dimension" },
    48: { $value: "48px", $type: "dimension" },
    56: { $value: "56px", $type: "dimension" },
    64: { $value: "64px", $type: "dimension" }
  },
  radius: {
    none: { $value: "0px", $type: "dimension" },
    xs: { $value: "4px", $type: "dimension" },
    sm: { $value: "8px", $type: "dimension" },
    md: { $value: "12px", $type: "dimension" },
    lg: { $value: "16px", $type: "dimension" },
    xl: { $value: "20px", $type: "dimension" },
    "2xl": { $value: "24px", $type: "dimension" },
    "3xl": { $value: "32px", $type: "dimension" },
    full: { $value: "9999px", $type: "dimension" }
  },
  borderWidth: {
    none: { $value: "0px", $type: "dimension" },
    thin: { $value: "1px", $type: "dimension" },
    medium: { $value: "2px", $type: "dimension" }
  },
  shadow: {
    none: { $value: "none", $type: "shadow" },
    sm: { $value: "0px 1px 3px rgba(16, 24, 40, 0.05), 0px 1px 2px rgba(16, 24, 40, 0.03)", $type: "shadow" },
    md: { $value: "0px 4px 8px -2px rgba(16, 24, 40, 0.06), 0px 2px 4px -2px rgba(16, 24, 40, 0.04)", $type: "shadow" },
    lg: { $value: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)", $type: "shadow" },
    card: { $value: "0px 1px 3px rgba(0, 0, 0, 0.02), 0px 0px 0px 1px rgba(0, 0, 0, 0.04)", $type: "shadow" },
    float: { $value: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)", $type: "shadow" }
  },
  opacity: {
    0: { $value: "0", $type: "number" },
    25: { $value: "0.25", $type: "number" },
    50: { $value: "0.50", $type: "number" },
    75: { $value: "0.75", $type: "number" },
    100: { $value: "1", $type: "number" }
  },
  zIndex: {
    hide: { $value: "-1", $type: "number" },
    base: { $value: "0", $type: "number" },
    docked: { $value: "10", $type: "number" },
    dropdown: { $value: "1000", $type: "number" },
    sticky: { $value: "1100", $type: "number" },
    modal: { $value: "1300", $type: "number" },
    tooltip: { $value: "1500", $type: "number" }
  }
};

// ============================================================
// LIGHT THEME SEMANTIC TOKENS (Default - observed from UI)
// ============================================================
const light = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  color: {
    background: {
      canvas: { $value: "{color.neutral.50}", $type: "color" },
      surface: { $value: "{color.neutral.0}", $type: "color" },
      surfaceMuted: { $value: "{color.neutral.100}", $type: "color" },
      surfaceInverse: { $value: "{color.neutral.950}", $type: "color" },
      surfaceBrand: { $value: "{color.brand.primary}", $type: "color" },
      surfaceBrandMuted: { $value: "{color.brand.primaryLight}", $type: "color" }
    },
    text: {
      primary: { $value: "{color.neutral.900}", $type: "color" },
      secondary: { $value: "{color.neutral.500}", $type: "color" },
      muted: { $value: "{color.neutral.400}", $type: "color" },
      inverse: { $value: "{color.neutral.0}", $type: "color" },
      brand: { $value: "{color.brand.primary}", $type: "color" },
      success: { $value: "{color.success.700}", $type: "color" }
    },
    border: {
      default: { $value: "{color.neutral.200}", $type: "color" },
      muted: { $value: "{color.neutral.100}", $type: "color" },
      focus: { $value: "{color.brand.primary}", $type: "color" }
    },
    action: {
      primaryBg: { $value: "{color.brand.primary}", $type: "color" },
      primaryHoverBg: { $value: "{color.brand.primaryHover}", $type: "color" },
      primaryText: { $value: "{color.neutral.0}", $type: "color" },
      secondaryBg: { $value: "{color.neutral.100}", $type: "color" },
      secondaryHoverBg: { $value: "{color.neutral.200}", $type: "color" },
      secondaryText: { $value: "{color.neutral.700}", $type: "color" },
      darkBg: { $value: "{color.neutral.950}", $type: "color" },
      darkText: { $value: "{color.neutral.0}", $type: "color" }
    },
    chart: {
      barPrimary: { $value: "{color.brand.primary}", $type: "color" },
      barNavy: { $value: "{color.brand.navy}", $type: "color" },
      barSky: { $value: "{color.brand.sky}", $type: "color" },
      barDark: { $value: "{color.neutral.950}", $type: "color" },
      barMuted: { $value: "{color.neutral.200}", $type: "color" }
    }
  },
  typography: {
    display: { fontSize: "{typography.fontSize.36}", fontWeight: "{typography.fontWeight.bold}", lineHeight: "{typography.lineHeight.tight}", letterSpacing: "{typography.letterSpacing.tight}", fontFamily: "{typography.fontFamily.sans}" },
    headingLg: { fontSize: "{typography.fontSize.28}", fontWeight: "{typography.fontWeight.bold}", lineHeight: "{typography.lineHeight.tight}", fontFamily: "{typography.fontFamily.sans}" },
    headingMd: { fontSize: "{typography.fontSize.20}", fontWeight: "{typography.fontWeight.bold}", lineHeight: "{typography.lineHeight.snug}", fontFamily: "{typography.fontFamily.sans}" },
    headingSm: { fontSize: "{typography.fontSize.16}", fontWeight: "{typography.fontWeight.semibold}", lineHeight: "{typography.lineHeight.snug}", fontFamily: "{typography.fontFamily.sans}" },
    bodyLg: { fontSize: "{typography.fontSize.16}", fontWeight: "{typography.fontWeight.regular}", lineHeight: "{typography.lineHeight.normal}", fontFamily: "{typography.fontFamily.sans}" },
    bodyMd: { fontSize: "{typography.fontSize.14}", fontWeight: "{typography.fontWeight.regular}", lineHeight: "{typography.lineHeight.normal}", fontFamily: "{typography.fontFamily.sans}" },
    bodySm: { fontSize: "{typography.fontSize.12}", fontWeight: "{typography.fontWeight.regular}", lineHeight: "{typography.lineHeight.normal}", fontFamily: "{typography.fontFamily.sans}" },
    label: { fontSize: "{typography.fontSize.13}", fontWeight: "{typography.fontWeight.semibold}", lineHeight: "{typography.lineHeight.none}", fontFamily: "{typography.fontFamily.sans}" },
    metric: { fontSize: "{typography.fontSize.32}", fontWeight: "{typography.fontWeight.bold}", lineHeight: "{typography.lineHeight.tight}", fontFamily: "{typography.fontFamily.sans}" }
  },
  component: {
    card: { radius: "{radius.2xl}", padding: "{spacing.24}", shadow: "{shadow.card}" },
    pillButton: { radius: "{radius.full}", paddingX: "{spacing.16}", paddingY: "{spacing.10}", fontSize: "{typography.fontSize.13}", fontWeight: "{typography.fontWeight.semibold}" },
    iconButton: { radius: "{radius.full}", size: "40px", bg: "{color.neutral.100}", color: "{color.neutral.700}" },
    badge: { radius: "{radius.full}", paddingX: "{spacing.10}", paddingY: "{spacing.4}", fontSize: "{typography.fontSize.11}", fontWeight: "{typography.fontWeight.semibold}" }
  }
};

// ============================================================
// DARK THEME SEMANTIC TOKENS (Proposed for completeness)
// ============================================================
const dark = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  color: {
    background: {
      canvas: { $value: "#0B0E14", $type: "color" },
      surface: { $value: "#151922", $type: "color" },
      surfaceMuted: { $value: "#1F2430", $type: "color" },
      surfaceInverse: { $value: "#FFFFFF", $type: "color" },
      surfaceBrand: { $value: "{color.brand.primary}", $type: "color" },
      surfaceBrandMuted: { $value: "rgba(11, 99, 246, 0.15)", $type: "color" }
    },
    text: {
      primary: { $value: "#F3F4F6", $type: "color" },
      secondary: { $value: "#9CA3AF", $type: "color" },
      muted: { $value: "#6B7280", $type: "color" },
      inverse: { $value: "#0C0F14", $type: "color" },
      brand: { $value: "#3B82F6", $type: "color" },
      success: { $value: "#34D399", $type: "color" }
    },
    border: {
      default: { $value: "#262C3A", $type: "color" },
      muted: { $value: "#1E232F", $type: "color" },
      focus: { $value: "#3B82F6", $type: "color" }
    },
    action: {
      primaryBg: { $value: "{color.brand.primary}", $type: "color" },
      primaryHoverBg: { $value: "{color.brand.primaryHover}", $type: "color" },
      primaryText: { $value: "{color.neutral.0}", $type: "color" },
      secondaryBg: { $value: "#1F2430", $type: "color" },
      secondaryHoverBg: { $value: "#2B3242", $type: "color" },
      secondaryText: { $value: "#E5E7EB", $type: "color" },
      darkBg: { $value: "#262C3A", $type: "color" },
      darkText: { $value: "#FFFFFF", $type: "color" }
    },
    chart: {
      barPrimary: { $value: "{color.brand.primary}", $type: "color" },
      barNavy: { $value: "#38BDF8", $type: "color" },
      barSky: { $value: "#7DD3FC", $type: "color" },
      barDark: { $value: "#374151", $type: "color" },
      barMuted: { $value: "#1F2937", $type: "color" }
    }
  },
  typography: light.typography,
  component: {
    card: { radius: "{radius.2xl}", padding: "{spacing.24}", shadow: "0px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 0px 1px rgba(255, 255, 255, 0.05)" },
    pillButton: light.component.pillButton,
    iconButton: { radius: "{radius.full}", size: "40px", bg: "#1F2430", color: "#E5E7EB" },
    badge: light.component.badge
  }
};

// ============================================================
// EXTRACTION REPORT
// ============================================================
const extractionReport = {
  designSystemName: "Fingoals Design System",
  version: "1.0.0",
  date: "2026-10-20",
  sourceImage: "Fingoals Financial Overview Dashboard",
  productType: "Fintech SaaS Financial Analytics Dashboard",
  extractedTokensCount: { colors: 25, typographyStyles: 9, spacingScales: 17, radiusScales: 9, shadowScales: 5 },
  confidenceBreakdown: {
    observed: "Primary blue (#0B63F6), white surfaces, off-white canvas (#F8F9FA), dark contrast (#0C0F14), pill radiuses (9999px), card radiuses (~24px), font scale hierarchy",
    estimated: "Font family (Plus Jakarta Sans/Inter), subtle border colors (#E4E7EC), secondary gray tints, dark mode color mapping",
    inferred: "Hover states (primary dark blue #0952CE), focus rings, status palette extensions",
    proposed: "Dark theme semantic values, extended status palettes for complete design system lifecycle"
  }
};

// ============================================================
// HELPER: Resolve reference strings like "{color.brand.primary}"
// ============================================================
function resolve(val, themeObj) {
  if (typeof val !== 'string') return val;
  if (val.startsWith('{') && val.endsWith('}')) {
    const parts = val.slice(1, -1).split('.');
    let cur = primitive;
    for (const p of parts) {
      if (cur && cur[p] !== undefined) cur = cur[p];
      else { cur = undefined; break; }
    }
    if (cur !== undefined && cur.$value !== undefined) return cur.$value;
    if (themeObj) {
      cur = themeObj;
      for (const p of parts) {
        if (cur && cur[p] !== undefined) cur = cur[p];
        else { cur = undefined; break; }
      }
      if (cur !== undefined && cur.$value !== undefined) return cur.$value;
    }
  }
  return val;
}

// ============================================================
// CREATE DIRECTORIES
// ============================================================
const dirs = [
  'source',
  'web',
  'bootstrap',
  'tailwind/v3',
  'tailwind/v4',
  'react',
  'nextjs',
  'flutter/lib/design_tokens',
  'docs',
  'scripts'
];
dirs.forEach(d => fs.mkdirSync(path.join(rootDir, d), { recursive: true }));

// ============================================================
// 1. WRITE SOURCE JSON FILES
// ============================================================
fs.writeFileSync(path.join(rootDir, 'source/tokens.json'), JSON.stringify(primitive, null, 2));
fs.writeFileSync(path.join(rootDir, 'source/tokens.light.json'), JSON.stringify(light, null, 2));
fs.writeFileSync(path.join(rootDir, 'source/tokens.dark.json'), JSON.stringify(dark, null, 2));
fs.writeFileSync(path.join(rootDir, 'source/extraction-report.json'), JSON.stringify(extractionReport, null, 2));
console.log("Source JSON files written.");

// ============================================================
// 2. WEB - CSS CUSTOM PROPERTIES
// ============================================================
let css = `/**
 * Fingoals Design System - Universal Tokens
 * Generated: ${new Date().toISOString()}
 * Single Source of Truth
 */

:root {
  /* ================= Primitives ================= */
  --fg-color-brand-primary: ${primitive.color.brand.primary.$value};
  --fg-color-brand-primary-hover: ${primitive.color.brand.primaryHover.$value};
  --fg-color-brand-primary-light: ${primitive.color.brand.primaryLight.$value};
  --fg-color-brand-navy: ${primitive.color.brand.navy.$value};
  --fg-color-brand-sky: ${primitive.color.brand.sky.$value};
  --fg-color-brand-cyan: ${primitive.color.brand.cyan.$value};

  --fg-color-neutral-0: ${primitive.color.neutral[0].$value};
  --fg-color-neutral-50: ${primitive.color.neutral[50].$value};
  --fg-color-neutral-100: ${primitive.color.neutral[100].$value};
  --fg-color-neutral-200: ${primitive.color.neutral[200].$value};
  --fg-color-neutral-300: ${primitive.color.neutral[300].$value};
  --fg-color-neutral-400: ${primitive.color.neutral[400].$value};
  --fg-color-neutral-500: ${primitive.color.neutral[500].$value};
  --fg-color-neutral-600: ${primitive.color.neutral[600].$value};
  --fg-color-neutral-700: ${primitive.color.neutral[700].$value};
  --fg-color-neutral-800: ${primitive.color.neutral[800].$value};
  --fg-color-neutral-900: ${primitive.color.neutral[900].$value};
  --fg-color-neutral-950: ${primitive.color.neutral[950].$value};

  --fg-color-success-50: ${primitive.color.success[50].$value};
  --fg-color-success-500: ${primitive.color.success[500].$value};
  --fg-color-success-700: ${primitive.color.success[700].$value};
  --fg-color-warning-50: ${primitive.color.warning[50].$value};
  --fg-color-warning-500: ${primitive.color.warning[500].$value};
  --fg-color-danger-50: ${primitive.color.danger[50].$value};
  --fg-color-danger-500: ${primitive.color.danger[500].$value};

  --fg-font-family-sans: ${primitive.typography.fontFamily.sans.$value};
  --fg-font-family-mono: ${primitive.typography.fontFamily.mono.$value};
  --fg-font-size-10: ${primitive.typography.fontSize[10].$value};
  --fg-font-size-11: ${primitive.typography.fontSize[11].$value};
  --fg-font-size-12: ${primitive.typography.fontSize[12].$value};
  --fg-font-size-13: ${primitive.typography.fontSize[13].$value};
  --fg-font-size-14: ${primitive.typography.fontSize[14].$value};
  --fg-font-size-16: ${primitive.typography.fontSize[16].$value};
  --fg-font-size-18: ${primitive.typography.fontSize[18].$value};
  --fg-font-size-20: ${primitive.typography.fontSize[20].$value};
  --fg-font-size-24: ${primitive.typography.fontSize[24].$value};
  --fg-font-size-28: ${primitive.typography.fontSize[28].$value};
  --fg-font-size-32: ${primitive.typography.fontSize[32].$value};
  --fg-font-size-36: ${primitive.typography.fontSize[36].$value};
  --fg-font-size-40: ${primitive.typography.fontSize[40].$value};

  --fg-font-weight-regular: ${primitive.typography.fontWeight.regular.$value};
  --fg-font-weight-medium: ${primitive.typography.fontWeight.medium.$value};
  --fg-font-weight-semibold: ${primitive.typography.fontWeight.semibold.$value};
  --fg-font-weight-bold: ${primitive.typography.fontWeight.bold.$value};

  --fg-line-height-none: ${primitive.typography.lineHeight.none.$value};
  --fg-line-height-tight: ${primitive.typography.lineHeight.tight.$value};
  --fg-line-height-snug: ${primitive.typography.lineHeight.snug.$value};
  --fg-line-height-normal: ${primitive.typography.lineHeight.normal.$value};
  --fg-line-height-relaxed: ${primitive.typography.lineHeight.relaxed.$value};

  --fg-spacing-0: ${primitive.spacing[0].$value};
  --fg-spacing-2: ${primitive.spacing[2].$value};
  --fg-spacing-4: ${primitive.spacing[4].$value};
  --fg-spacing-6: ${primitive.spacing[6].$value};
  --fg-spacing-8: ${primitive.spacing[8].$value};
  --fg-spacing-10: ${primitive.spacing[10].$value};
  --fg-spacing-12: ${primitive.spacing[12].$value};
  --fg-spacing-14: ${primitive.spacing[14].$value};
  --fg-spacing-16: ${primitive.spacing[16].$value};
  --fg-spacing-20: ${primitive.spacing[20].$value};
  --fg-spacing-24: ${primitive.spacing[24].$value};
  --fg-spacing-28: ${primitive.spacing[28].$value};
  --fg-spacing-32: ${primitive.spacing[32].$value};
  --fg-spacing-36: ${primitive.spacing[36].$value};
  --fg-spacing-40: ${primitive.spacing[40].$value};
  --fg-spacing-48: ${primitive.spacing[48].$value};
  --fg-spacing-56: ${primitive.spacing[56].$value};
  --fg-spacing-64: ${primitive.spacing[64].$value};

  --fg-radius-none: ${primitive.radius.none.$value};
  --fg-radius-xs: ${primitive.radius.xs.$value};
  --fg-radius-sm: ${primitive.radius.sm.$value};
  --fg-radius-md: ${primitive.radius.md.$value};
  --fg-radius-lg: ${primitive.radius.lg.$value};
  --fg-radius-xl: ${primitive.radius.xl.$value};
  --fg-radius-2xl: ${primitive.radius['2xl'].$value};
  --fg-radius-3xl: ${primitive.radius['3xl'].$value};
  --fg-radius-full: ${primitive.radius.full.$value};

  --fg-shadow-none: ${primitive.shadow.none.$value};
  --fg-shadow-sm: ${primitive.shadow.sm.$value};
  --fg-shadow-md: ${primitive.shadow.md.$value};
  --fg-shadow-lg: ${primitive.shadow.lg.$value};
  --fg-shadow-card: ${primitive.shadow.card.$value};
  --fg-shadow-float: ${primitive.shadow.float.$value};

  /* ================= Light Theme Semantic (Default) ================= */
  --fg-bg-canvas: ${resolve(light.color.background.canvas.$value, light)};
  --fg-bg-surface: ${resolve(light.color.background.surface.$value, light)};
  --fg-bg-surface-muted: ${resolve(light.color.background.surfaceMuted.$value, light)};
  --fg-bg-surface-inverse: ${resolve(light.color.background.surfaceInverse.$value, light)};
  --fg-bg-surface-brand: ${resolve(light.color.background.surfaceBrand.$value, light)};
  --fg-bg-surface-brand-muted: ${resolve(light.color.background.surfaceBrandMuted.$value, light)};

  --fg-text-primary: ${resolve(light.color.text.primary.$value, light)};
  --fg-text-secondary: ${resolve(light.color.text.secondary.$value, light)};
  --fg-text-muted: ${resolve(light.color.text.muted.$value, light)};
  --fg-text-inverse: ${resolve(light.color.text.inverse.$value, light)};
  --fg-text-brand: ${resolve(light.color.text.brand.$value, light)};
  --fg-text-success: ${resolve(light.color.text.success.$value, light)};

  --fg-border-default: ${resolve(light.color.border.default.$value, light)};
  --fg-border-muted: ${resolve(light.color.border.muted.$value, light)};
  --fg-border-focus: ${resolve(light.color.border.focus.$value, light)};

  --fg-action-primary-bg: ${resolve(light.color.action.primaryBg.$value, light)};
  --fg-action-primary-hover-bg: ${resolve(light.color.action.primaryHoverBg.$value, light)};
  --fg-action-primary-text: ${resolve(light.color.action.primaryText.$value, light)};
  --fg-action-secondary-bg: ${resolve(light.color.action.secondaryBg.$value, light)};
  --fg-action-secondary-hover-bg: ${resolve(light.color.action.secondaryHoverBg.$value, light)};
  --fg-action-secondary-text: ${resolve(light.color.action.secondaryText.$value, light)};
  --fg-action-dark-bg: ${resolve(light.color.action.darkBg.$value, light)};
  --fg-action-dark-text: ${resolve(light.color.action.darkText.$value, light)};

  --fg-chart-bar-primary: ${resolve(light.color.chart.barPrimary.$value, light)};
  --fg-chart-bar-navy: ${resolve(light.color.chart.barNavy.$value, light)};
  --fg-chart-bar-sky: ${resolve(light.color.chart.barSky.$value, light)};
  --fg-chart-bar-dark: ${resolve(light.color.chart.barDark.$value, light)};
  --fg-chart-bar-muted: ${resolve(light.color.chart.barMuted.$value, light)};

  --fg-card-radius: ${resolve(light.component.card.radius, light)};
  --fg-card-padding: ${resolve(light.component.card.padding, light)};
  --fg-card-shadow: ${resolve(light.component.card.shadow, light)};
  --fg-card-bg: var(--fg-bg-surface);

  --fg-pill-radius: ${resolve(light.component.pillButton.radius, light)};
  --fg-pill-padding-x: ${resolve(light.component.pillButton.paddingX, light)};
  --fg-pill-padding-y: ${resolve(light.component.pillButton.paddingY, light)};
}

/* ================= Dark Theme Overrides ================= */
[data-theme="dark"], .dark-theme {
  --fg-bg-canvas: ${resolve(dark.color.background.canvas.$value, dark)};
  --fg-bg-surface: ${resolve(dark.color.background.surface.$value, dark)};
  --fg-bg-surface-muted: ${resolve(dark.color.background.surfaceMuted.$value, dark)};
  --fg-bg-surface-inverse: ${resolve(dark.color.background.surfaceInverse.$value, dark)};
  --fg-bg-surface-brand: ${resolve(dark.color.background.surfaceBrand.$value, dark)};
  --fg-bg-surface-brand-muted: ${resolve(dark.color.background.surfaceBrandMuted.$value, dark)};

  --fg-text-primary: ${resolve(dark.color.text.primary.$value, dark)};
  --fg-text-secondary: ${resolve(dark.color.text.secondary.$value, dark)};
  --fg-text-muted: ${resolve(dark.color.text.muted.$value, dark)};
  --fg-text-inverse: ${resolve(dark.color.text.inverse.$value, dark)};
  --fg-text-brand: ${resolve(dark.color.text.brand.$value, dark)};
  --fg-text-success: ${resolve(dark.color.text.success.$value, dark)};

  --fg-border-default: ${resolve(dark.color.border.default.$value, dark)};
  --fg-border-muted: ${resolve(dark.color.border.muted.$value, dark)};
  --fg-border-focus: ${resolve(dark.color.border.focus.$value, dark)};

  --fg-action-primary-bg: ${resolve(dark.color.action.primaryBg.$value, dark)};
  --fg-action-primary-hover-bg: ${resolve(dark.color.action.primaryHoverBg.$value, dark)};
  --fg-action-primary-text: ${resolve(dark.color.action.primaryText.$value, dark)};
  --fg-action-secondary-bg: ${resolve(dark.color.action.secondaryBg.$value, dark)};
  --fg-action-secondary-hover-bg: ${resolve(dark.color.action.secondaryHoverBg.$value, dark)};
  --fg-action-secondary-text: ${resolve(dark.color.action.secondaryText.$value, dark)};
  --fg-action-dark-bg: ${resolve(dark.color.action.darkBg.$value, dark)};
  --fg-action-dark-text: ${resolve(dark.color.action.darkText.$value, dark)};

  --fg-chart-bar-primary: ${resolve(dark.color.chart.barPrimary.$value, dark)};
  --fg-chart-bar-navy: ${resolve(dark.color.chart.barNavy.$value, dark)};
  --fg-chart-bar-sky: ${resolve(dark.color.chart.barSky.$value, dark)};
  --fg-chart-bar-dark: ${resolve(dark.color.chart.barDark.$value, dark)};
  --fg-chart-bar-muted: ${resolve(dark.color.chart.barMuted.$value, dark)};

  --fg-card-shadow: ${resolve(dark.component.card.shadow, dark)};
}
`;
fs.writeFileSync(path.join(rootDir, 'web/tokens.css'), css);

// SCSS Map
let scss = `// Fingoals Design Tokens SCSS
$fg-color-brand-primary: ${primitive.color.brand.primary.$value};
$fg-color-brand-primary-hover: ${primitive.color.brand.primaryHover.$value};
$fg-color-brand-navy: ${primitive.color.brand.navy.$value};
$fg-color-brand-sky: ${primitive.color.brand.sky.$value};
$fg-font-family-sans: ${primitive.typography.fontFamily.sans.$value};
$fg-radius-2xl: ${primitive.radius['2xl'].$value};
$fg-radius-full: ${primitive.radius.full.$value};

:root {
  @import './tokens.css';
}
`;
fs.writeFileSync(path.join(rootDir, 'web/tokens.scss'), scss);

// ============================================================
// 3. BOOTSTRAP 5 ADAPTER
// ============================================================
let bootstrapScss = `// Bootstrap 5 Token Adapter for Fingoals
@import "../web/tokens.css";

$primary:       #0B63F6 !default;
$secondary:     #667085 !default;
$success:       #12B76A !default;
$info:          #00B4D8 !default;
$warning:       #F79009 !default;
$danger:        #F04438 !default;
$light:         #F0F2F5 !default;
$dark:          #0C0F14 !default;

$body-bg:       var(--fg-bg-canvas);
$body-color:    var(--fg-text-primary);
$font-family-base: var(--fg-font-family-sans);

$border-radius:               var(--fg-radius-md);
$border-radius-sm:            var(--fg-radius-sm);
$border-radius-lg:            var(--fg-radius-xl);
$border-radius-pill:          var(--fg-radius-full);

$card-border-radius:          var(--fg-card-radius);
$card-border-color:           var(--fg-border-default);
$card-bg:                     var(--fg-bg-surface);
$card-box-shadow:             var(--fg-card-shadow);

$btn-border-radius:           var(--fg-radius-full);
$btn-padding-y:               8px;
$btn-padding-x:               18px;

.card {
  border-radius: var(--fg-card-radius);
  border: 1px solid var(--fg-border-default);
  box-shadow: var(--fg-card-shadow);
  background-color: var(--fg-bg-surface);
}

.btn-pill-primary {
  background-color: var(--fg-action-primary-bg);
  color: var(--fg-action-primary-text);
  border-radius: var(--fg-radius-full);
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--fg-action-primary-hover-bg);
    color: #fff;
  }
}

.btn-pill-dark {
  background-color: var(--fg-action-dark-bg);
  color: var(--fg-action-dark-text);
  border-radius: var(--fg-radius-full);
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
`;
fs.writeFileSync(path.join(rootDir, 'bootstrap/bootstrap-tokens.scss'), bootstrapScss);

// ============================================================
// 4. TAILWIND CSS ADAPTERS
// ============================================================
let tailwindV3 = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,jsx,ts,tsx,blade.php}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--fg-color-brand-primary)',
          'primary-hover': 'var(--fg-color-brand-primary-hover)',
          'primary-light': 'var(--fg-color-brand-primary-light)',
          navy: 'var(--fg-color-brand-navy)',
          sky: 'var(--fg-color-brand-sky)',
          cyan: 'var(--fg-color-brand-cyan)',
        },
        canvas: 'var(--fg-bg-canvas)',
        surface: {
          DEFAULT: 'var(--fg-bg-surface)',
          muted: 'var(--fg-bg-surface-muted)',
          inverse: 'var(--fg-bg-surface-inverse)',
          brand: 'var(--fg-bg-surface-brand)',
        },
        fg: {
          primary: 'var(--fg-text-primary)',
          secondary: 'var(--fg-text-secondary)',
          muted: 'var(--fg-text-muted)',
          inverse: 'var(--fg-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--fg-border-default)',
          muted: 'var(--fg-border-muted)',
        }
      },
      borderRadius: {
        '2xl': 'var(--fg-radius-2xl)',
        '3xl': 'var(--fg-radius-3xl)',
        'full': 'var(--fg-radius-full)',
      },
      boxShadow: {
        card: 'var(--fg-card-shadow)',
        float: 'var(--fg-shadow-float)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
`;
fs.writeFileSync(path.join(rootDir, 'tailwind/v3/tailwind.config.js'), tailwindV3);

let tailwindV4 = `@theme {
  --color-brand-primary: var(--fg-color-brand-primary);
  --color-brand-primary-hover: var(--fg-color-brand-primary-hover);
  --color-brand-navy: var(--fg-color-brand-navy);
  --color-brand-sky: var(--fg-color-brand-sky);

  --color-canvas: var(--fg-bg-canvas);
  --color-surface: var(--fg-bg-surface);
  --color-surface-muted: var(--fg-bg-surface-muted);
  --color-surface-inverse: var(--fg-bg-surface-inverse);

  --color-text-primary: var(--fg-text-primary);
  --color-text-secondary: var(--fg-text-secondary);
  --color-text-muted: var(--fg-text-muted);

  --radius-card: var(--fg-radius-2xl);
  --radius-pill: var(--fg-radius-full);
}
`;
fs.writeFileSync(path.join(rootDir, 'tailwind/v4/theme.css'), tailwindV4);

// ============================================================
// 5. REACT & NEXT.JS
// ============================================================
let reactTokens = `/**
 * React TypeScript Tokens & Theme Provider for Fingoals
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface FingoalsTokens {
  colors: {
    brandPrimary: string;
    canvas: string;
    surface: string;
    surfaceInverse: string;
    textPrimary: string;
    textSecondary: string;
    borderDefault: string;
  };
  radius: {
    card: string;
    pill: string;
  };
}

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeMode }> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('fingoals-theme', mode);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const saved = localStorage.getItem('fingoals-theme') as ThemeMode;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const PillButton: React.FC<{
  variant?: 'primary' | 'secondary' | 'dark';
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}> = ({ variant = 'primary', children, icon, onClick }) => {
  const bgStyles = {
    primary: 'var(--fg-action-primary-bg)',
    secondary: 'var(--fg-action-secondary-bg)',
    dark: 'var(--fg-action-dark-bg)',
  };

  const textStyles = {
    primary: 'var(--fg-action-primary-text)',
    secondary: 'var(--fg-action-secondary-text)',
    dark: 'var(--fg-action-dark-text)',
  };

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: bgStyles[variant],
        color: textStyles[variant],
        borderRadius: 'var(--fg-radius-full)',
        padding: '10px 18px',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: 'var(--fg-font-size-13)',
        fontWeight: 'var(--fg-font-weight-semibold)',
        cursor: 'pointer',
      }}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export const DashboardCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}> = ({ children, dark = false }) => {
  return (
    <div
      style={{
        backgroundColor: dark ? 'var(--fg-bg-surface-inverse)' : 'var(--fg-bg-surface)',
        color: dark ? 'var(--fg-text-inverse)' : 'var(--fg-text-primary)',
        borderRadius: 'var(--fg-radius-2xl)',
        padding: 'var(--fg-spacing-24)',
        boxShadow: 'var(--fg-card-shadow)',
        border: dark ? 'none' : '1px solid var(--fg-border-default)',
      }}
    >
      {children}
    </div>
  );
};
`;
fs.writeFileSync(path.join(rootDir, 'react/tokens.ts'), reactTokens);

// Next.js
let nextLayout = `import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fingoals - Financial Overview',
  description: 'Financial Analytics Dashboard built with Fingoals Design Tokens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: 'var(--fg-bg-canvas)', margin: 0, fontFamily: 'var(--fg-font-family-sans)' }}>
        {children}
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(rootDir, 'nextjs/layout.tsx'), nextLayout);

let nextGlobals = `@import '../web/tokens.css';

* {
  box-sizing: border-box;
}

body {
  background-color: var(--fg-bg-canvas);
  color: var(--fg-text-primary);
  font-family: var(--fg-font-family-sans);
  -webkit-font-smoothing: antialiased;
}
`;
fs.writeFileSync(path.join(rootDir, 'nextjs/globals.css'), nextGlobals);

// ============================================================
// 6. FLUTTER ADAPTERS
// ============================================================
const flutterColors = `import 'package:flutter/material.dart';

/// Fingoals Color Tokens extracted from UI
class AppColors {
  AppColors._();

  // Brand Primitives
  static const Color brandPrimary = Color(0xFF0B63F6);
  static const Color brandPrimaryHover = Color(0xFF0952CE);
  static const Color brandPrimaryLight = Color(0xFFEBF2FF);
  static const Color brandNavy = Color(0xFF122A5E);
  static const Color brandSky = Color(0xFFA8CBFF);
  static const Color brandCyan = Color(0xFF00B4D8);

  // Neutral Scale
  static const Color white = Color(0xFFFFFFFF);
  static const Color neutral50 = Color(0xFFF8F9FA);
  static const Color neutral100 = Color(0xFFF0F2F5);
  static const Color neutral200 = Color(0xFFE4E7EC);
  static const Color neutral300 = Color(0xFFD0D5DD);
  static const Color neutral400 = Color(0xFF98A2B3);
  static const Color neutral500 = Color(0xFF667085);
  static const Color neutral600 = Color(0xFF475467);
  static const Color neutral700 = Color(0xFF344054);
  static const Color neutral800 = Color(0xFF1D2939);
  static const Color neutral900 = Color(0xFF101828);
  static const Color neutral950 = Color(0xFF0C0F14);

  // Status Colors
  static const Color successBg = Color(0xFFECFDF3);
  static const Color successText = Color(0xFF027A48);
  static const Color successPrimary = Color(0xFF12B76A);

  static const Color warningBg = Color(0xFFFFFAEB);
  static const Color warningPrimary = Color(0xFFF79009);

  static const Color dangerBg = Color(0xFFFEF3F2);
  static const Color dangerPrimary = Color(0xFFF04438);

  // Semantic Light
  static const Color lightCanvas = neutral50;
  static const Color lightSurface = white;
  static const Color lightSurfaceMuted = neutral100;
  static const Color lightSurfaceInverse = neutral950;
  static const Color lightTextPrimary = neutral900;
  static const Color lightTextSecondary = neutral500;
  static const Color lightBorder = neutral200;

  // Semantic Dark
  static const Color darkCanvas = Color(0xFF0B0E14);
  static const Color darkSurface = Color(0xFF151922);
  static const Color darkSurfaceMuted = Color(0xFF1F2430);
  static const Color darkSurfaceInverse = white;
  static const Color darkTextPrimary = Color(0xFFF3F4F6);
  static const Color darkTextSecondary = Color(0xFF9CA3AF);
  static const Color darkBorder = Color(0xFF262C3A);
}
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_colors.dart'), flutterColors);

const flutterTypography = `import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTypography {
  AppTypography._();

  static const String fontFamily = 'Plus Jakarta Sans';

  static TextStyle display = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 36,
    fontWeight: FontWeight.w700,
    height: 1.2,
    letterSpacing: -0.8,
    color: AppColors.neutral900,
  );

  static TextStyle headingLg = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 28,
    fontWeight: FontWeight.w700,
    height: 1.2,
    color: AppColors.neutral900,
  );

  static TextStyle headingMd = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 20,
    fontWeight: FontWeight.w700,
    height: 1.3,
    color: AppColors.neutral900,
  );

  static TextStyle headingSm = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.3,
    color: AppColors.neutral900,
  );

  static TextStyle bodyLg = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.neutral700,
  );

  static TextStyle bodyMd = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.neutral500,
  );

  static TextStyle bodySm = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.neutral500,
  );

  static TextStyle label = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    fontWeight: FontWeight.w600,
    color: AppColors.neutral700,
  );

  static TextStyle metric = const TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    fontWeight: FontWeight.w700,
    height: 1.2,
    color: AppColors.neutral900,
  );
}
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_typography.dart'), flutterTypography);

const flutterSpacing = `import 'package:flutter/material.dart';

class AppSpacing {
  AppSpacing._();

  static const double space0 = 0.0;
  static const double space2 = 2.0;
  static const double space4 = 4.0;
  static const double space6 = 6.0;
  static const double space8 = 8.0;
  static const double space10 = 10.0;
  static const double space12 = 12.0;
  static const double space14 = 14.0;
  static const double space16 = 16.0;
  static const double space20 = 20.0;
  static const double space24 = 24.0;
  static const double space28 = 28.0;
  static const double space32 = 32.0;
  static const double space36 = 36.0;
  static const double space40 = 40.0;
  static const double space48 = 48.0;
  static const double space56 = 56.0;
  static const double space64 = 64.0;

  static const EdgeInsets cardPadding = EdgeInsets.all(24.0);
  static const EdgeInsets pillPadding = EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0);
  static const EdgeInsets badgePadding = EdgeInsets.symmetric(horizontal: 10.0, vertical: 4.0);
}
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_spacing.dart'), flutterSpacing);

const flutterRadius = `import 'package:flutter/material.dart';

class AppRadius {
  AppRadius._();

  static const double r0 = 0.0;
  static const double rXs = 4.0;
  static const double rSm = 8.0;
  static const double rMd = 12.0;
  static const double rLg = 16.0;
  static const double rXl = 20.0;
  static const double r2Xl = 24.0;
  static const double r3Xl = 32.0;
  static const double rFull = 9999.0;

  static final BorderRadius card = BorderRadius.circular(r2Xl);
  static final BorderRadius pill = BorderRadius.circular(rFull);
  static final BorderRadius badge = BorderRadius.circular(rFull);
}
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_radius.dart'), flutterRadius);

const flutterShadows = `import 'package:flutter/material.dart';

class AppShadows {
  AppShadows._();

  static const List<BoxShadow> card = [
    BoxShadow(
      color: Color.fromRGBO(16, 24, 40, 0.03),
      blurRadius: 4,
      offset: Offset(0, 1),
    ),
    BoxShadow(
      color: Color.fromRGBO(16, 24, 40, 0.04),
      blurRadius: 12,
      offset: Offset(0, 4),
    ),
  ];

  static const List<BoxShadow> float = [
    BoxShadow(
      color: Color.fromRGBO(16, 24, 40, 0.08),
      blurRadius: 24,
      offset: Offset(0, 12),
    ),
  ];
}
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_shadows.dart'), flutterShadows);

const flutterTheme = `import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_typography.dart';
import 'app_radius.dart';

class AppTheme {
  AppTheme._();

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      fontFamily: AppTypography.fontFamily,
      scaffoldBackgroundColor: AppColors.lightCanvas,
      colorScheme: const ColorScheme.light(
        primary: AppColors.brandPrimary,
        surface: AppColors.lightSurface,
        onPrimary: AppColors.white,
        onSurface: AppColors.lightTextPrimary,
      ),
      cardTheme: CardTheme(
        color: AppColors.lightSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: AppRadius.card,
          side: const BorderSide(color: AppColors.lightBorder, width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.brandPrimary,
          foregroundColor: AppColors.white,
          shape: RoundedRectangleBorder(borderRadius: AppRadius.pill),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
          textStyle: AppTypography.label,
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      fontFamily: AppTypography.fontFamily,
      scaffoldBackgroundColor: AppColors.darkCanvas,
      colorScheme: const ColorScheme.dark(
        primary: AppColors.brandPrimary,
        surface: AppColors.darkSurface,
        onPrimary: AppColors.white,
        onSurface: AppColors.darkTextPrimary,
      ),
      cardTheme: CardTheme(
        color: AppColors.darkSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: AppRadius.card,
          side: const BorderSide(color: AppColors.darkBorder, width: 1),
        ),
      ),
    );
  }
}
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_theme.dart'), flutterTheme);

const flutterTokensBarrel = `library fingoals_tokens;

export 'app_colors.dart';
export 'app_typography.dart';
export 'app_spacing.dart';
export 'app_radius.dart';
export 'app_shadows.dart';
export 'app_theme.dart';
`;
fs.writeFileSync(path.join(rootDir, 'flutter/lib/design_tokens/app_tokens.dart'), flutterTokensBarrel);

// ============================================================
// 7. DOCUMENTATION
// ============================================================
const docsReference = `# Fingoals Design System Token Reference

## 1. Primitive Tokens
| Category | Token Name | Value | Extracted Confidence | Reference Visual Source |
|---|---|---|---|---|
| Brand | \`color.brand.primary\` | \`#0B63F6\` | Observed | Nav item 'Dashboard', 'Join Class' button |
| Brand | \`color.brand.primaryHover\` | \`#0952CE\` | Inferred | Darker hover shade |
| Brand | \`color.brand.primaryLight\` | \`#EBF2FF\` | Observed | Light blue badge background |
| Brand | \`color.brand.navy\` | \`#122A5E\` | Observed | Income sources bar chart |
| Brand | \`color.brand.sky\` | \`#A8CBFF\` | Observed | Income chart bar 4 & gauge chart |
| Brand | \`color.brand.cyan\` | \`#00B4D8\` | Observed | Metric growth "+73,6%" |
| Neutral | \`color.neutral.0\` | \`#FFFFFF\` | Observed | Card surfaces, inverse text |
| Neutral | \`color.neutral.50\` | \`#F8F9FA\` | Observed | Canvas background |
| Neutral | \`color.neutral.100\` | \`#F0F2F5\` | Observed | Inactive pill tabs & circular icon buttons |
| Neutral | \`color.neutral.200\` | \`#E4E7EC\` | Observed | Borders & dividers |
| Neutral | \`color.neutral.500\` | \`#667085\` | Observed | Secondary text, breadcrumbs |
| Neutral | \`color.neutral.900\` | \`#101828\` | Observed | Headings, large currency metrics |
| Neutral | \`color.neutral.950\` | \`#0C0F14\` | Observed | Dark cards, Overview active pill |
| Status | \`color.success.500\` | \`#12B76A\` | Observed | Green discount badge text |

## 2. Radius Tokens
- **Pill (\`9999px\`)**: Buttons, badges, tabs, overview menu item.
- **Card (\`24px\`)**: Expense Breakdown, Income Sources, Financial Balance, Mastery Banner.
- **Icon Button (\`9999px\` / Circle)**: Quick actions, export, filter, calendar, bell.

## 3. Typography Tokens
- **Font Family**: Plus Jakarta Sans / Inter
- **Display / Currency Metrics**: 32px – 36px (Bold 700)
- **Card Headings**: 18px – 20px (Bold 700)
- **Body / Subtitles**: 13px – 14px (Regular 400 / Medium 500)
- **Badge / Pill Labels**: 11px – 13px (Semibold 600)
`;
fs.writeFileSync(path.join(rootDir, 'docs/token-reference.md'), docsReference);

const docsPlatform = `# Platform Mapping Guide

| Semantic Token | Web CSS Variable | Flutter Dart Constant | Tailwind CSS Utility |
|---|---|---|---|
| Background Canvas | \`var(--fg-bg-canvas)\` | \`AppColors.lightCanvas\` | \`bg-canvas\` |
| Surface Card | \`var(--fg-bg-surface)\` | \`AppColors.lightSurface\` | \`bg-surface\` |
| Action Primary | \`var(--fg-action-primary-bg)\` | \`AppColors.brandPrimary\` | \`bg-brand-primary\` |
| Text Primary | \`var(--fg-text-primary)\` | \`AppColors.lightTextPrimary\` | \`text-fg-primary\` |
| Card Radius | \`var(--fg-radius-2xl)\` | \`AppRadius.card\` | \`rounded-2xl\` |
| Pill Radius | \`var(--fg-radius-full)\` | \`AppRadius.pill\` | \`rounded-full\` |
`;
fs.writeFileSync(path.join(rootDir, 'docs/platform-mapping.md'), docsPlatform);

const docsExtraction = `# Extraction Confidence Report

### Observed (High Confidence)
- **Primary Blue**: \`#0B63F6\` (Sampled from active "Dashboard" tab, CTA button)
- **Card Surface**: \`#FFFFFF\`
- **Canvas BG**: \`#F8F9FA\`
- **Dark Pill / Card Surface**: \`#0C0F14\` (Sampled from Overview button, Financial report card)
- **Radius**: Pill shapes (\`border-radius: 9999px\`) and rounded cards (\`24px\`).
- **Hierarchy**: Bold metric figures ($17,3K, $532,921, $7,72K) at 32px.

### Estimated (Medium Confidence)
- **Font Family**: Plus Jakarta Sans / Inter.
- **Border Grays**: \`#E4E7EC\`
- **Inactive Tab Background**: \`#F0F2F5\`

### Inferred & Proposed (Completeness)
- **Dark Theme Tokens**: Inverted color palette for high-contrast dark dashboard mode.
- **Hover & Focus States**: \`#0952CE\` for primary action hover.
- **Alert States**: Warning and danger color scales.
`;
fs.writeFileSync(path.join(rootDir, 'docs/extraction-confidence.md'), docsExtraction);

const docsDesignSystem = `# Fingoals Design System Documentation

Fingoals is a modern fintech analytics dashboard design system characterized by clean white card surfaces, soft off-white canvas, vibrant royal blue accent, high-contrast dark charcoal components, and smooth pill-shaped action controls.

## Key Visual Elements
1. **Pill-shaped Controls**: Every navigation tab, button, and indicator uses maximum rounded corners (\`radius.full\`).
2. **Generous Card Radius**: Standard cards utilize \`24px\` border-radius for an approachable, sleek aesthetic.
3. **Dual Contrast Surfaces**: Light theme utilizes pure white cards alongside dark charcoal statement cards (e.g. Mastery Banner, Financial Report).
4. **Data Visualization**: Cohesive chart palette featuring Royal Blue, Deep Navy, Sky Blue, and Dark Charcoal striped motifs.

## Supported Platforms
- **Web Native**: \`web/tokens.css\` and \`web/tokens.scss\`
- **Bootstrap 5**: \`bootstrap/bootstrap-tokens.scss\`
- **Tailwind CSS**: v3 (\`tailwind/v3/tailwind.config.js\`) and v4 (\`tailwind/v4/theme.css\`)
- **React**: \`react/tokens.ts\` with ThemeProvider
- **Next.js**: App router root layout and styles
- **Flutter**: Dart classes in \`flutter/lib/design_tokens/\`
`;
fs.writeFileSync(path.join(rootDir, 'docs/design-system.md'), docsDesignSystem);

const docsMigration = `# Migration Guide

To adopt Fingoals Design Tokens in your existing project:

### Web Projects
1. Link \`web/tokens.css\` in your HTML:
   \`\`\`html
   <link rel="stylesheet" href="web/tokens.css">
   \`\`\`
2. Replace hardcoded colors with CSS variables (\`var(--fg-action-primary-bg)\`, \`var(--fg-card-radius)\`).

### Flutter Projects
1. Copy \`flutter/lib/design_tokens\` to your Flutter \`lib/\` folder.
2. In your \`MaterialApp\`:
   \`\`\`dart
   theme: AppTheme.lightTheme,
   darkTheme: AppTheme.darkTheme,
   \`\`\`
3. Use \`AppColors\`, \`AppTypography\`, \`AppRadius\`, and \`AppSpacing\`.
`;
fs.writeFileSync(path.join(rootDir, 'docs/migration-guide.md'), docsMigration);

console.log("All design tokens and adapters generated successfully!");
console.log("Output structure:");
console.log("- source/tokens.json, tokens.light.json, tokens.dark.json, extraction-report.json");
console.log("- web/tokens.css, tokens.scss");
console.log("- bootstrap/bootstrap-tokens.scss");
console.log("- tailwind/v3/tailwind.config.js, tailwind/v4/theme.css");
console.log("- react/tokens.ts");
console.log("- nextjs/layout.tsx, globals.css");
console.log("- flutter/lib/design_tokens/*.dart");
console.log("- docs/*.md");