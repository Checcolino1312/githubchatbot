import { extendTheme } from '@mui/material/styles';
const theme = extendTheme({
    cssVarPrefix: 'md3',
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#6750A4' },
                secondary: { main: '#625B71' },
            },
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});
export default theme;
