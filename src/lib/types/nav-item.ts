import {Role} from "@/lib/enums/role";

export interface NavItem {
    id: string;
    name: string;
    location: string;
    icon: any;
    active?: boolean;
    roles: Role[];
}