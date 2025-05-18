import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f0fa',
      100: '#cce0f5',
      200: '#99c2eb',
      300: '#66a3e0',
      400: '#3385d6',
      500: '#0066cc',
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary'
      }
    },
    Heading: {
      baseStyle: {
        color: 'coolGray.800'
      }
    }
  }
});