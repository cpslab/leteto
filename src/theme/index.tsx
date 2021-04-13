import { createMuiTheme } from '@material-ui/core/styles';
import { orange, yellow } from '@material-ui/core/colors';

export const createTheme = () => {
  return createMuiTheme({
    palette: {
      primary: orange,
      secondary: yellow,
    },
  });
};

export default createTheme;
