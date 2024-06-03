import { ThemeOptions } from '@mui/material';
import chainConfig from '@/chainConfig';

const { themes } = chainConfig();
const { light: theme } = themes;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
const backgroundDefault = '#F8F8F8';
const surfaceOne = '#FFFFFF';
const surfaceTwo = '#F8F8F8';
const fontOne = '#000000';
const fontTwo = '#414141';
const fontThree = '#777777';
/** Custom theme overrides for light mode */
export const lightThemeOverride: DeepPartial<ThemeOptions> = {
  mixins: {
    tableCell: {
      background: surfaceOne, // surface one
      '&.odd': {
        background: surfaceTwo, // surface two
      },
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#8400CD',
      contrastText: '#fff',
    },
    background: {
      default: backgroundDefault,
      paper: surfaceOne,
    },
    divider: '#E8E8E8',
    text: {
      primary: '#000000',
      secondary: '#414141',
    },
    custom: {
      general: {
        background: backgroundDefault, // same as background default
        surfaceOne, // same as background paper
        surfaceTwo, // striped tables
      },
      fonts: {
        fontOne,
        fontTwo,
        fontThree,
        fontFour: '#999999',
      },
      primaryData: {
        one: '#8400CD',
        two: '#00ccff',
        three: '#00d5ff',
        four: '#00E7FF',
        five: '#00bbff',
      },
      results: {
        pass: '#1EC490',
        fail: '#FD3B4C',
      },
      consensus: {
        zero: '#62CDFF',
        one: '#C9EEFF',
      },
      customTokenomics: {
        zero: '#0081C9',
        one: '#5BC0F8',
        two: '#86E5FF',
      },
      customHero: {
        zero: '#2B3467',
        one: '#62CDFF',
      },
      customCreateAccountBGmenomic: {
        zero: '#F8F8F8',
        one: '#530075',
      },
      customSelect: {
        zero: '#777777',
        one: '#0A0A0A',
        two: '',
        three: '',
      },
    },
  },
  overrides: {
    MuiTableBody: {
      root: {
        '& .MuiTableRow-root': {
          '&:nth-child(odd)': {
            backgroundColor: surfaceTwo, // surface two
          },
        },
        '& .MuiTableCell-root': {
          color: fontTwo, // font two
        },
      },
    },
    MuiTabs: {
      root: {
        '& .MuiTab-textColorInherit': {
          color: fontThree, // font three
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
          color: fontOne, // font one
        },
        '& .MuiTabs-indicator': {
          backgroundColor: fontOne, // font one (?)
        },
      },
    },
  },
};
