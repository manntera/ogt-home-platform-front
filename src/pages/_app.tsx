import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { initializeFirebase } from '../lib/firebase/firebaseAuth';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
          body {
            margin: 0;
            padding: 0;
          }
        `,
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        initializeFirebase();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> { }
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
