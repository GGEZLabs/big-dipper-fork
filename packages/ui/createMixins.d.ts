/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import type { MixinsOptions, Mixins } from '@mui/material/styles/createMixins';

declare module '@mui/material/styles/createMixins' {
  interface MixinsOptions {
    layout?: CSSProperties;
    tableCell?: CSSProperties;
  }

  interface Mixins {
    layout: CSSProperties;
    tableCell: CSSProperties;
  }
}
