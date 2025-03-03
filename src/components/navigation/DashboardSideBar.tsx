import React from "react";
import {sideBarDashboardNavItems} from "@/lib/data";
import {useRouter} from "next/router";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {getRole} from "@/lib/enums/role";
import {useUser} from "@/hooks/useUser";
import Link from "next/link";
import {LogOut, Settings, Sprout} from "lucide-react";

function DashboardSideBar() {

    const router = useRouter();
    const {user, logout} = useUser();

    return (
        <div className="bg-[#f8f9fa] border-r border-gray-200 flex flex-col max-w-xs h-screen sticky top-0 left-0 ">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-20 h-8 rounded-lg bg-[#14532d] flex items-center justify-center">
                        <Sprout className="h-12 w-12 text-white" /> <span className="text-white font-bold text-sm">FarmHub</span>
                    </div>
                    <span className="font-semibold text-xl text-[bg-brand-main]"></span>
                </div>
            </div>
            <ScrollArea className="flex-grow">
                <div className="p-3 space-y-1">
                    {/*{dashboard_nav_items.sideBar.map((item, index) => (*/}
                    {/*    <Button*/}
                    {/*        key={index}*/}
                    {/*        onClick={() => router.push(item.location)}*/}
                    {/*        variant="ghost"*/}
                    {/*        className={`w-full justify-start gap-2 ${*/}
                    {/*            item.location === router.pathname ? 'bg-[#14532d] text-[#f4f4f5]' : 'text-gray-600 hover:bg-[#d4d4d8] hover:text-[#14532d]'*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        <item.Icon height={20} width={20}/>*/}
                    {/*        <span className="text-sm font-medium">{item.name}</span>*/}
                    {/*    </Button>*/}
                    {/*))}*/}

                    <div className="p-3 space-y-1">
                        {sideBarDashboardNavItems
                            .filter((item) => user?.userAccount.group && item.roles.includes(getRole(user.userAccount.group.name)))
                            .map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => router.push(item.location)}
                                    variant="ghost"
                                    className={`w-full justify-start gap-2 ${
                                        item.location === router.pathname
                                            ? "bg-[#14532d] text-[#f4f4f5]"
                                            : "text-gray-600 hover:bg-[#d4d4d8] hover:text-[#14532d]"
                                    }`}
                                >
                                    <item.icon className="h-5 w-5"/>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Button>
                            ))}
                    </div>

                </div>
            </ScrollArea>

            <div className="absolute bottom-0 w-64 p-4 border-gray-200">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                    <Settings className="w-5 h-5" />
                    Settings
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>

    )

}

export default DashboardSideBar
