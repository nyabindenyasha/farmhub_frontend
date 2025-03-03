import type {Metadata} from "next"
import {Inter} from "next/font/google"
// import "@/styles/globals.css"
// import "@/styles/theme.module.css"
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css'; // PrimeIcons
import '@/styles/globals.css'; // Your custom styles

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "FarmHub - Sustainable Agriculture Solutions",
    description: "Growing together for a sustainable future",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
