const backgroundDefault = '#0A0A0A';
const surfaceOne = '#131316';
const surfaceTwo = '#19191D';
const fontOne = '#E6E6E6';
const fontTwo = '#fff';
const fontThree = '#fff';
/** Custom theme overrides for dark mode */
export const darkThemeOverride = {
  mixins: {
    tableCell: {
      background: surfaceOne, // surface one
      '&.odd': {
        background: surfaceTwo, // surface two
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
      contrastText: '#fff',
    },
    background: {
      default: backgroundDefault,
      paper: surfaceOne,
    },
    divider: '#3D3D43',
    text: {
      primary: '#E6E6E6',
      secondary: '#AAAAAB',
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
        two: '#A700FC',
        three: '#DA00FD',
        four: '#FF3CFE',
      },
      results: {
        pass: '#198a65',
        fail: '#b12a34',
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
        zero: '#0A0A0A',
        one: '#E6E6E6',
      },
      customSelect: {
        zero: '#fff',
        one: '#fff',
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
