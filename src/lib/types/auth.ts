export interface LoginFormData {
    username: string
    password: string
    // rememberMe: boolean
}

export interface AuthState {
    isLoading: boolean
    error: string | null
}

