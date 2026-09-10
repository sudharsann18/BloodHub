export const lightPalette = {
  red: '#B4232C',
  redDark: '#861923',
  redSoft: '#FCEBED',
  navy: '#172B4D',
  ink: '#24344D',
  muted: '#6D7B8F',
  canvas: '#F5F7FA',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  white: '#FFFFFF',
  text: '#172B4D',
  secondaryText: '#5F6C82',
  border: '#E3E8EF',
  divider: '#E8ECF3',
  success: '#18794E',
  successSoft: '#E8F6EF',
  warning: '#B85C00',
  warningSoft: '#FFF2DF',
  error: '#C62828',
  graySoft: '#EEF1F5',
  inputBackground: '#F8FAFC',
  navigationBackground: '#FFFFFF',
};

export const darkPalette = {
  red: '#E24B5F',
  redDark: '#FF7A8A',
  redSoft: '#3A1D27',
  navy: '#E2E8F0',
  ink: '#E2E8F0',
  muted: '#A8B3C7',
  canvas: '#0F172A',
  background: '#0F172A',
  surface: '#172033',
  white: '#F8FAFC',
  text: '#F8FAFC',
  secondaryText: '#CBD5E1',
  border: '#334155',
  divider: '#243244',
  success: '#4ADE80',
  successSoft: '#102A1E',
  warning: '#FBBF24',
  warningSoft: '#352A12',
  error: '#F87171',
  graySoft: '#1E293B',
  inputBackground: '#111827',
  navigationBackground: '#111827',
};

export let colors = { ...lightPalette };

export const setThemeColors = (mode = 'light') => {
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  Object.keys(colors).forEach((key) => {
    colors[key] = palette[key];
  });
  return colors;
};

export default colors;