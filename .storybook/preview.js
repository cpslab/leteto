import { muiTheme } from 'storybook-addon-material-ui';
import createTheam from '../src/thema';

const theam = createTheam();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [muiTheme(theam)];
