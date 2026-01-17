// Alien-themed color schemes for each section
export const alienThemes = {
  projects: {
    name: 'Upgrade',
    primary: '#10b981',      // green-500
    secondary: '#059669',    // green-600
    accent: '#34d399',       // green-400
    glow: 'rgba(16, 185, 129, 0.5)',
    textPrimary: '#ecfdf5',  // green-50
    textSecondary: '#d1fae5' // green-100
  },
  about: {
    name: 'Heatblast',
    primary: '#ef4444',      // red-500
    secondary: '#dc2626',    // red-600
    accent: '#f87171',       // red-400
    glow: 'rgba(239, 68, 68, 0.5)',
    textPrimary: '#fef2f2',  // red-50
    textSecondary: '#fee2e2' // red-100
  },
  skills: {
    name: 'Grey Matter',
    primary: '#8b5cf6',      // violet-500
    secondary: '#7c3aed',    // violet-600
    accent: '#a78bfa',       // violet-400
    glow: 'rgba(139, 92, 246, 0.5)',
    textPrimary: '#faf5ff',  // violet-50
    textSecondary: '#ede9fe' // violet-100
  },
  contact: {
    name: 'Echo Echo',
    primary: '#06b6d4',      // cyan-500
    secondary: '#0891b2',    // cyan-600
    accent: '#22d3ee',       // cyan-400
    glow: 'rgba(6, 182, 212, 0.5)',
    textPrimary: '#ecfeff',  // cyan-50
    textSecondary: '#cffafe' // cyan-100
  },
  resume: {
    name: 'XLR8',
    primary: '#3b82f6',      // blue-500
    secondary: '#2563eb',    // blue-600
    accent: '#60a5fa',       // blue-400
    glow: 'rgba(59, 130, 246, 0.5)',
    textPrimary: '#eff6ff',  // blue-50
    textSecondary: '#dbeafe' // blue-100
  }
};

export const getTheme = (sectionId) => {
  return alienThemes[sectionId] || alienThemes.projects;
};
