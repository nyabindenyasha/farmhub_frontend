import {SiteHeader} from "@/components/siteheader/site-header"
import {Button} from "@/components/ui/button"
import {ProgressBar} from "@/components/progressbar/progress-bar"
import {ArrowRight, DropletsIcon as Drop, Leaf, SproutIcon as Seedling, Sun} from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Hero Section */}
            <div className="h-screen bg-[#2F5A41] relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-12 h-64 w-64 rounded-full bg-[#2ECC71]/20 blur-3xl" />
                    <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[#2ECC71]/10 blur-3xl" />
                </div>
                <SiteHeader />
                <main className="container relative pt-32 pb-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-white">
                            <h1 className="text-6xl font-bold leading-tight">
                                Plowing the earth
                                <span className="block text-5xl font-normal mt-2">harvesting hope</span>
                            </h1>
                            <p className="text-lg text-white/90 max-w-lg">
                                Education is the key to success. Unlock your potential through learning. Expand your horizons with
                                sustainable farming practices.
                            </p>
                            <ul className="space-y-4">
                                {["Crops of opportunity fields of dreams", "Where innovation meets cultivation"].map((text, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <ArrowRight className="h-5 w-5 text-[#2ECC71]" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90">View More →</Button>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-square">
                                <div className="absolute inset-0 rounded-full border-8 border-white/10 animate-pulse"></div>
                                <div className="absolute inset-8 rounded-full border-4 border-[#2ECC71]/30"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-col items-center space-y-4 text-white">
                                            <div className="h-16 w-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center">
                                                <Leaf className="h-8 w-8 text-[#2ECC71]" />
                                            </div>
                                            <span className="text-sm font-medium">Sustainable</span>
                                        </div>
                                        <div className="flex flex-col items-center space-y-4 text-white">
                                            <div className="h-16 w-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center">
                                                <Seedling className="h-8 w-8 text-[#2ECC71]" />
                                            </div>
                                            <span className="text-sm font-medium">Organic</span>
                                        </div>
                                        <div className="flex flex-col items-center space-y-4 text-white">
                                            <div className="h-16 w-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center">
                                                <Sun className="h-8 w-8 text-[#2ECC71]" />
                                            </div>
                                            <span className="text-sm font-medium">Natural</span>
                                        </div>
                                        <div className="flex flex-col items-center space-y-4 text-white">
                                            <div className="h-16 w-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center">
                                                <Drop className="h-8 w-8 text-[#2ECC71]" />
                                            </div>
                                            <span className="text-sm font-medium">Pure</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                {[Leaf, Seedling, Drop].map((Icon, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2ECC71] animate-spin-slow" />
                                        <div className="relative h-24 w-24 rounded-full bg-[#2ECC71]/10 flex items-center justify-center">
                                            <Icon className="h-12 w-12 text-[#2ECC71]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[#2ECC71] text-lg font-medium mb-2">Why Choose Us</h3>
                                <h2 className="text-4xl font-bold text-[#2F5A41]">Bringing natures bounty to your plate</h2>
                            </div>
                            <p className="text-gray-600">
                                Agriculture and farming are essential industries that involve the cultivation of crops, raising of
                                livestock, and production
                            </p>
                            <div className="space-y-6">
                                <ProgressBar label="Pure And Organic" percentage={70} />
                                <ProgressBar label="Healthy Food" percentage={80} />
                            </div>
                            <Button className="bg-[#2ECC71] text-white hover:bg-[#2ECC71]/90">Read More</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-gray-50">
                <div className="container">
                    <div className="text-center space-y-4 mb-16">
                        <h3 className="text-[#2ECC71] text-lg font-medium">OUR GALLERY</h3>
                        <h2 className="text-4xl font-bold text-[#2F5A41]">
                            Bringing natures bounty
                            <span className="block">to your plate</span>
                        </h2>
                    </div>
                    <div className="grid gap-8">
                        {/* Top row - larger images */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                                <Image
                                    src="/images/gallery/gl1.jpg"
                                    alt="Fresh strawberries in basket"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                                <Image
                                    src="/images/gallery/gl2.jpg"
                                    alt="Farmer in the field"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        {/* Bottom row - smaller images */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <Image
                                    src="/images/gallery/gl3.jpg"
                                    alt="Farmers in the field"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <Image
                                    src="/images/gallery/gl4.jpg"
                                    alt="Orange grove harvest"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <Image
                                    src="/images/gallery/gl5.jpg"
                                    alt="Farmer with produce"
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

