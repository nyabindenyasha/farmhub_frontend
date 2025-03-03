import Image from "next/image"
import {useRouter} from "next/navigation"
import {RegisterForm} from "@/othercomponents/register/register"

export default function RegisterPage() {
    const router = useRouter()
    return (
        <main className="flex min-h-screen flex-col lg:flex-row">
            {/* Left side - Register Form */}
            <div className="flex w-full items-center justify-center p-4 lg:w-1/2 lg:p-8 relative">
                <div className="w-full max-w-md space-y-8">
                    <RegisterForm />
                </div>
                <div className="absolute bottom-8 right-8">
                    {/*<Button */}
                    {/*    variant="ghost" */}
                    {/*    className="text-green-600 hover:text-green-700 hover:bg-green-50"*/}
                    {/*    onClick={() => router.push("/login")}*/}
                    {/*>*/}
                    {/*    Sign In*/}
                    {/*</Button>*/}

                    <button onClick={() => router.push("/login")} className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Sign In
                    </button>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="relative hidden lg:block lg:w-1/2">
                <Image
                    src="/images/woman-in-vegetable.jpg"
                    alt="Farm Hub Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute top-8 inset-x-0 z-10 flex justify-center">
                    <h1 className="text-4xl font-bold text-white">Farm Hub</h1>
                </div>
            </div>
        </main>
    )
}
