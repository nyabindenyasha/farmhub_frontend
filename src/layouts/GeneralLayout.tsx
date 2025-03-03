import React, {ReactNode} from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

type Props ={

    children ?: ReactNode
}

function GeneralLayout({children}:Props){
    return(
        <div className={"flex flex-col r"}>
            <Navbar/>
            <div className={"relative flex flex-col min-h-screen"}>
                <div className={"fixed h-10 w-10 bg-blue-300 rounded-full bottom-10 right-7"}></div>
                {children}
            </div>
            <Footer/>
        </div>
    )

}

export default GeneralLayout