import React, {useState} from "react";
import {nav_items} from "@/lib/data";
import Link from "next/link";
import {useRouter} from "next/router";
import {Bars3Icon} from "@heroicons/react/16/solid";
import {active_link_color, inactive_link_color} from "@/lib/constants";

type Props ={}

function Navbar({}:Props){

    const router = useRouter()

    const [navOpen,setNavOpen] = useState(false);
    return(
        <div className={"flex flex-col items-center py-4 border border-zinc-300/50"}>
           <div className={"flex flex-row items-center max-w-7xl px-4 justify-between w-full mx-auto"}>
               <p>Logo</p>
               <div className={"md:flex hidden flex-row items-center space-x-4"}>
                   {nav_items.map(item =>(
                       <Link href={item.location} key={item.id} className={`${item.location === router.pathname?active_link_color :inactive_link_color}`}>
                           {item.name}
                       </Link>
                   ))}
               </div>
               <p className={"md:flex hidden"}>cta</p>
               <div onClick={()=> setNavOpen(!navOpen)} className={"md:hidden flex"}>
                   <Bars3Icon height={20} width={20}/>
               </div>
           </div>
            {navOpen && ( <div className={"md:hidden flex flex-col items-center space-y-4"}>
                {nav_items.map(item =>(
                    <Link href={item.location} key={item.id} className={`${item.location === router.pathname?active_link_color :inactive_link_color}`}>
                        {item.name}
                    </Link>
                ))}
            </div>)}
        </div>
    )
}

export default Navbar