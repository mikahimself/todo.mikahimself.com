import { createMuiTheme } from '@material-ui/core';

const myTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#4fb1d1",
        light: "#76C7E2",
        dark: "#0E82A9"
      },
      info: {
          main: "#f00"
      },
      secondary: {
        main: "#E12F38"
      },    
    }
});

export default myTheme;