import "@/styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core styles
import "primeicons/primeicons.css"; // Icons
import type {AppProps} from "next/app";
import {UserProvider} from "@/context/UserContext";
import {PrimeReactProvider} from "primereact/api";


export default function App({Component, pageProps}: AppProps) {
    return (
        <PrimeReactProvider>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </PrimeReactProvider>
    )
}
