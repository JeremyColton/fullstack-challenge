import type { AppProps } from "next/app"
import { ThemeProvider, CssBaseline } from "@mui/material"
import Head from 'next/head'
import lightTheme from "../themes/lightTheme"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
