import Image from "next/image"
import {LoginForm} from "@/othercomponents/login/login";
import {Sprout} from "lucide-react";


export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col lg:flex-row">
            {/* Left side - Image */}
            <div className="relative hidden lg:block lg:w-1/2">
                <Image src="/images/woman-in-vegetable.jpg" alt="Farm Hub Banner" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/50" />
                <div className="absolute inset-x-0 top-8 z-10 flex flex-col items-center gap-2">
                    <Sprout className="h-12 w-12 text-white" />
                    <h1 className="text-4xl font-bold text-white">Farm Hub</h1>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="relative flex w-full items-center justify-center p-4 lg:w-1/2 lg:p-8">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("/svg/farmerHarvestingCrops.svg")`,
                        backgroundSize: "cover",
                    }}
                />
                <div className="w-full max-w-md space-y-8">
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}
