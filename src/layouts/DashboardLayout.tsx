import React, {ReactNode} from "react";
import DashboardNav from "@/components/navigation/DashboardNav";
import DashboardSideBar from "@/components/navigation/DashboardSideBar";


interface Props {
    children: ReactNode
}

function DashboardLayout({children}: Props) {
    return (
        <div className="flex min-h-screen w-full  ">
            <DashboardSideBar/>
            <div className={"relative flex-1 flex flex-col overflow-hidden"}>
                <DashboardNav/>
                <div className={"flex bg-zinc-50 w-full"}>
                        {children}
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout
