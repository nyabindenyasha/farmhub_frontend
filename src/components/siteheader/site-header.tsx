// "use client"
//
// import Link from "next/link"
// import {Menu, Sprout} from "lucide-react"
// import {Button} from "@/components/ui/button"
// import {useEffect, useState} from "react"
// import {useRouter} from "next/navigation";
// import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
//
// const navItems = [
//     ["Home", "/"],
//     ["About Us", "/about"],
//     ["Service", "/service"],
//     ["Projects", "/projects"],
//     ["Blog", "/blog"],
//     ["Pages", "/pages"],
//     ["Contact", "/contact"],
// ]
//
// export function SiteHeader() {
//     const router = useRouter();
//     const [scrolled, setScrolled] = useState(false)
//
//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 50)
//         window.addEventListener("scroll", handleScroll)
//         return () => window.removeEventListener("scroll", handleScroll)
//     }, [])
//
//     return (
//         <header
//             className={`fixed top-0 z-50 w-full transition-all duration-300 ${
//                 scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
//             }`}
//         >
//
//             <div className="container flex h-16 items-center justify-between px-4">
//                 <div className="flex items-center space-x-4 md:space-x-0">
//                     <Sheet>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" className="p-0 mr-2 md:hidden" aria-label="Menu">
//                                 <Menu className={scrolled ? "text-[#2F5A41]" : "text-white"}/>
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                             <nav className="flex flex-col space-y-4 mt-8">
//                                 {navItems.map(([label, href]) => (
//                                     <Link
//                                         key={label}
//                                         href={href}
//                                         className="text-lg font-medium text-[#2F5A41] hover:text-[#2ECC71] transition-colors"
//                                     >
//                                         {label}
//                                     </Link>
//                                 ))}
//                             </nav>
//                         </SheetContent>
//                     </Sheet>
//                     <Link href="/" className="flex items-center space-x-2">
//                         <Sprout className={`h-8 w-8 ${scrolled ? "text-[#2F5A41]" : "text-[#2ECC71]"}`}/>
//                         <span
//                             className={`text-2xl font-bold ${scrolled ? "text-[#2F5A41]" : "text-white"}`}>FarmHub</span>
//                     </Link>
//                 </div>
//                 <nav className="hidden md:flex items-center space-x-6">
//                     {navItems.map(([label, href]) => (
//                         <Link
//                             key={label}
//                             href={href}
//                             className={`text-sm font-medium transition-colors ${
//                                 scrolled ? "text-gray-600 hover:text-gray-900" : "text-white hover:text-white/80"
//                             }`}
//                         >
//                             {label}
//                         </Link>
//                     ))}
//                     <Button onClick={() => router.push("/login")} variant="secondary"
//                             className="bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90">
//                         Login →
//                     </Button>
//                 </nav>
//             </div>
//         </header>
//     )
// }

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sprout, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {useRouter} from "next/router";

const navItems = [
    ["Home", "/"],
    ["About Us", "/about"],
    ["Service", "/service"],
    ["Projects", "/projects"],
    ["Blog", "/blog"],
    ["Pages", "/pages"],
    ["Contact", "/contact"],
]

export function SiteHeader() {

    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
            }`}
        >
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-4 md:space-x-0">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="p-0 mr-2 md:hidden" aria-label="Menu">
                                <Menu className={isScrolled ? "text-[#2F5A41]" : "text-white"} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col space-y-4 mt-8">
                                {navItems.map(([label, href]) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="text-lg font-medium text-[#2F5A41] hover:text-[#2ECC71] transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="flex items-center space-x-2">
                        <Sprout className={`h-8 w-8 ${isScrolled ? "text-[#2F5A41]" : "text-[#2ECC71]"}`} />
                        <span className={`text-2xl font-bold ${isScrolled ? "text-[#2F5A41]" : "text-white"}`}>FarmHub</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map(([label, href]) => (
                        <Link
                            key={label}
                            href={href}
                            className={`text-sm font-medium transition-colors ${
                                isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white hover:text-white/80"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <Button onClick={() => router.push("/login")} variant="secondary" className="bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90">
                    Login →
                </Button>
            </div>
        </header>
    )
}