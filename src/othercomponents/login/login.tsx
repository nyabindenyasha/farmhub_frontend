import {useState} from "react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import type {AuthState, LoginFormData} from "@/lib/types/auth"
import {Icons} from "@/components/icons/icons";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {useUser} from "@/context/UserContext";

export function LoginForm() {
    const { login } = useUser()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [state, setState] = useState<AuthState>({
        isLoading: false,
        error: null,
    })

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState({ isLoading: true, error: null });

        const formData = new FormData(event.currentTarget);
        const data = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        try {
            await login(data);
            router.push("/dashboard");
        } catch (error) {
            setState({
                isLoading: false,
                error: "Invalid username or password",
            });
        }
    }


    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your Farm Hub Account</p>
            </div>

            <Tabs defaultValue="login" className="space-y-6">
                {/*<TabsList className="grid w-full grid-cols-2">*/}
                {/*    <TabsTrigger value="login">Login</TabsTrigger>*/}
                {/*    <TabsTrigger value="register" onClick={() => router.push("/register/page")}>Register</TabsTrigger>*/}
                {/*</TabsList>*/}

                <TabsContent value="login" className="space-y-6">
                    {state.error && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{state.error}</div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                required
                                type="text"
                                disabled={state.isLoading}
                                className="bg-background relative"
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    disabled={state.isLoading}
                                    className="bg-background pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground/70" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground/70" />
                                    )}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" name="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember Me
                                </label>
                            </div>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-green-600 hover:text-green-700 hover:underline"
                            >
                                Forgot my password?
                            </Link>
                        </div>

                        <Button className="relative w-full bg-green-600 hover:bg-green-700" type="submit" disabled={state.isLoading}>
                            {state.isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            {state.isLoading ? "Signing in..." : "Sign In"}
                        </Button>

                    </form>
                </TabsContent>

            </Tabs>

            <Button variant="outline" className="relative w-full" type="button">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Sign In
            </Button>

            <button onClick={() => router.push("/register")} className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md">Sign Up
            </button>
        </div>
    )
}
