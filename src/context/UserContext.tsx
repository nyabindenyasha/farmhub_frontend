import type React from "react"
import {createContext, useContext, useEffect, useState} from "react"
import {LoginResponse} from "@/lib/types/login-response";
import {UserAccount} from "@/lib/types/user-account";
import apiClient from "@/utils/apiClient";
import {LoginFormData} from "@/lib/types/auth";
import axios from "axios";

interface UserContextType {
    user: LoginResponse | null
    login: (loginRequest: LoginFormData) => void
    logout: () => void
    getAllUsers: () => Promise<UserAccount[]>
    getUserById: (id: number) => Promise<UserAccount | null>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<LoginResponse | null>(null)

    useEffect(() => {
        // Check if there's a stored user in localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (loginRequest: LoginFormData) => {
        try {
            const response = await apiClient.post('/api/v1/auth/token/signin', loginRequest);
            console.log(response);
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.log("Error logging in:", error);
            throw new Error("Invalid username or password");
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    //todo
    const getAllUsers = async (): Promise<UserAccount[]> => {
        try {
            const response = await apiClient.get<UserAccount[]>("/v1/users/all");
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    };

    const getUserById = async (id: number): Promise<UserAccount | null> => {
        try {
            const response = await apiClient.get<UserAccount>("/v1/user/" + id);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return null
        }
    };


    return <UserContext.Provider
        value={{user, login, logout, getAllUsers, getUserById}}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}