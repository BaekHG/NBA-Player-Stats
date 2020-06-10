import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    grey: {
      light: '#BDBDBD',
      main: '#616161',
    },
  },
  custom: {
    navHeight: 56,
    width: '80%',
    backgroundColor: '#212121',
    offGrey: '#ECEFF1',
  },
});

export const colors = ['#2979FF', '#D500F9', '#00E676', '#ffffff', '#FF9100'];

export default theme;
