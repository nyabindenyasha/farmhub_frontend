import {Patient as PatientType} from '@/lib/types'
import {NavItem} from "@/lib/types/nav-item";
import {Role} from "@/lib/enums/role";
import {
    Sprout,
    FlaskRoundIcon as Flask,
    Bug,
    Calendar,
    ListTodo,
    Layers,
    BarChart3,
    HomeIcon,
    Settings,
    FileStack
} from "lucide-react";

export const nav_items = [
    {name: 'Home', location: '/', id: '1'},
    {name: 'About', location: '/about', id: '2'},
    {name: 'Contact', location: '/contact', id: '3'},
];

export const sideBarDashboardNavItems: NavItem[] = [
    {
        name: "Dashboard",
        location: "/dashboard",
        id: "1",
        icon: HomeIcon,
        active: true,
        roles: [Role.ADMIN,
            Role.FARMER]
    },
    {
        name: "Crops",
        location: "/dashboard/crop",
        id: "2",
        icon: Sprout,
        roles: [Role.ADMIN],
    },
    {
        name: "Fertilizer",
        location: "/dashboard/fertilizer",
        id: "3",
        icon: Flask,
        roles: [Role.ADMIN]
    },
    {
        name: "Chemicals",
        location: "/dashboard/chemical",
        id: "4",
        icon: Bug,
        roles: [Role.ADMIN],
    },
    {
        name: "Crop Program",
        location: "/dashboard/cropprogram",
        id: "5",
        icon: Calendar,
        roles: [Role.ADMIN]
    },
    {
        name: "Crop Stages",
        location: "/dashboard/cropstages",
        id: "6",
        icon: ListTodo,
        roles: [Role.ADMIN]
    },
    {
        name: "Crop Variety",
        location: "/dashboard/cropvariety",
        id: "7",
        icon: Layers,
        roles: [Role.ADMIN]
    },
    {
        name: "Reports",
        location: "/dashboard/report",
        id: "8",
        icon: BarChart3,
        roles: [Role.ADMIN]
    },


    {
        name: "Crop Programs",
        location: "/farmerdashboard/cropprogram",
        id: "9",
        icon: Calendar,
        roles: [Role.FARMER]
    },
    {
        name: "Crop Batches",
        location: "/farmerdashboard/cropbatch",
        id: "10",
        icon: FileStack,
        roles: [Role.FARMER]
    },
];


export const navBarDashboardNavItems: NavItem[] = [
    {name: "Home", location: "/dashboard", id: "1", icon: Settings, roles: [Role.ADMIN, Role.FARMER]},
    {name: "Profile", location: "dashboard/profile", id: "2", icon: Settings, roles: [Role.ADMIN, Role.FARMER]},
];


export const patients: PatientType[] = [
    {
        id: "1",
        name: "Theresa Webb",
        avatar: "/placeholder.svg",
        caseRef: "CC/80564",
        openedAt: "22/10/2022",
        doa: "22/10/2022",
        source: "Google",
        serviceProvider: "CC/DGM",
        services: [
            {name: "S&R", variant: "secondary"},
            {name: "Hire", variant: "success"},
            {name: "VD", variant: "default"},
        ],
        amount: 230.0,
    },
    {
        id: "2",
        name: "Wade Warren",
        avatar: "/placeholder.svg",
        caseRef: "CC/80564",
        openedAt: "22/10/2022",
        doa: "22/10/2022",
        source: "LinkedIn",
        serviceProvider: "CC/DGM",
        services: [
            {name: "S&R", variant: "secondary"},
            {name: "Hire", variant: "success"},
            {name: "VD", variant: "default"},
        ],
        amount: 230.0,
    },
]