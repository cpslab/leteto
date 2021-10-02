// import original module declarations
import 'styled-components';
import { Theme } from '@material-ui/core';

// and extend them!
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {
    //   追加でテーマを拡張する場合、この中に定義をかく。
  }
}
