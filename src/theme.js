import { createTheme } from '@mui/material/styles';

export const colors = [
    "#F49D6E",
    "#E85A4F",
    "#FFD166",
    "#8ABEB7",
    "#247BA0",
    "#D3D3D3",
];

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1D1F26',

        },
        primary: {
            main: '#BEA4FF',
        },
        components: {
            MuiIconButton: {
                size:'small',
            },
            MuiSnackbar: {
                defaultProps: {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                },
            },
            MuiSnackbarContent: {
                styleOverrides: {
                    message:{
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        fontSize: '0.9rem',
                    }
                }
            },
        },
        typography: {
            fontfamily: 'lato,san-serif',
            button: {
                textTransform: 'unset',
                fontWeight: 700,
            },
        },
        shape: {
            borderRadius: 0
        },
    }
});
export default theme;