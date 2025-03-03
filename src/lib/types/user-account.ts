import {UserGroup} from "@/lib/types/user-group";

export interface UserAccount {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    group: UserGroup;
    phoneNumber: string;
    active: boolean;
    enabled: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}