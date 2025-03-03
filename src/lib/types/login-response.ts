import {UserAccount} from "@/lib/types/user-account";

export interface LoginResponse {
    token: string;
    type: string;
    username: string;
    userAccount: UserAccount;
}