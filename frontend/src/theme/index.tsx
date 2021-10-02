import { createMuiTheme, Theme } from '@material-ui/core/styles';

export const createTheme = (): Theme => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#FBD4A4',
      },
      secondary: {
        main: '#FEFED5',
      },
    },
  });
};

export default createTheme;
