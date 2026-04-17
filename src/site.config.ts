export interface BrandColors {
  /** Primary accent color (buttons, links, active states in light mode) */
  accentLight: string;
  /** Darker shade used for hover states and high-contrast text */
  accentDark: string;
  /** Accent applied when the browser is in dark mode (Starlight links etc.) */
  accentDarkMode: string;
  /** Page background in light mode */
  bgLight: string;
  /** Page background in dark mode */
  bgDark: string;
}

export interface SectionColors {
  accentLight: string;
  accentLightHover: string;
  accentDark: string;
  accentDarkHover: string;
}

export interface SiteConfig {
  name: string;
  githubOrg: string;
  githubRepo: string;
  siteUrl: string;
  brand: BrandColors;
  sections: {
    developerDocs: SectionColors;
  };
}

export const siteConfig: SiteConfig = {
  name: 'BoilerDocs',
  githubOrg: 'your-org',
  githubRepo: 'BoilerDocs-docs',
  siteUrl: 'https://docs.boilerdocs.com',
  brand: {
    accentLight: '#d4836a',
    accentDark: '#b85c44',
    accentDarkMode: '#4a9eff',
    bgLight: '#f5f0eb',
    bgDark: '#0f0d0d',
  },
  sections: {
    developerDocs: {
      accentLight: '#308991',
      accentLightHover: '#236e76',
      accentDark: '#3da8b2',
      accentDarkHover: '#4fbec9',
    },
  },
};
