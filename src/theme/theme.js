import { colors } from './colors';
import spacing from './spacing';
import typography from './typography';

export { colors, spacing, typography };

export const theme = {
  colors,
  spacing,
  typography,
  radius: { sm: 8, md: 12, lg: 16 },
  shadow: {
    shadowColor: '#172B4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
};

export default theme;