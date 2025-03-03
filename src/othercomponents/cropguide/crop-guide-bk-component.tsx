import {Leaf} from "lucide-react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react";
import {useCropGuideContext} from "@/context/CropGuideContext";
import {CropGuide} from "@/lib/types/crop-guide";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"


interface CropGuideProps {
    cropId: number
    onClose: () => void
}

export default function CropGuideBkComponent({cropId, onClose}: CropGuideProps) {

    const {getCropGuideById} = useCropGuideContext();

    const [cropGuide, setCropGuide] = useState<CropGuide | null>(null);

    // Fetch program data when component mounts or programId changes
    // Fetch program data only when programId changes
    useEffect(() => {
        let isMounted = true;
        const fetchProgram = async () => {
            try {
                // setLoading(true);
                const cropGuide = await getCropGuideById(cropId);
                if (cropGuide && isMounted) {
                    setCropGuide(cropGuide);
                    console.log("Crop Guide data received:", cropGuide);
                } else if (isMounted) {
                    console.log("Crop Guide not found")
                }
            } catch (err) {
                if (isMounted) {
                    console.log("Error fetching Crop Guide details:", err)
                }
            } finally {
                if (isMounted) {
                    console.log("Finally")
                }
            }
        };

        fetchProgram();

        // Cleanup function to prevent setting state on unmounted component
        return () => {
            isMounted = false;
        };
    }, [cropId]); // Remove getCropProgramById from dependencies since it's now memoized

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                {/*<div className="h-8"></div>*/}
                {/*<DialogHeader>*/}
                {/*    <DialogTitle>Crop Program Details</DialogTitle>*/}
                {/*</DialogHeader>*/}
                <div className="min-h-screen bg-background">
                    {/* Sticky Header */}
                    <header
                        className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="container flex h-16 items-center">
                            <div className="flex items-center gap-2">
                                <Leaf className="h-6 w-6 text-green-600"/>
                                <h1 className="text-xl font-bold">{cropGuide?.classification.name} Guide</h1>
                            </div>
                            <nav className="flex flex-1 items-center justify-end gap-4">
                                {["Basic Info", "Nursery", "Field Management", "Diseases", "Program"].map((section) => (
                                    <Button
                                        key={section}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            document
                                                .getElementById(section.toLowerCase().replace(" ", "-"))
                                                ?.scrollIntoView({behavior: "smooth"})
                                        }}
                                    >
                                        {section}
                                    </Button>
                                ))}
                            </nav>
                        </div>
                    </header>

                    <main className="container py-8 space-y-4 pt-20">
                        <div className="h-2"></div> {/* Spacer div to push content below fixed header */}
                        {/* Basic Information Section */}
                        <section id="basic-info" className="space-y-6">
                            <h2 className="text-2xl font-bold">Basic Information</h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium w-1/3">Crop</TableCell>
                                                <TableCell>{cropGuide?.classification.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Family</TableCell>
                                                <TableCell>{cropGuide?.classification.family}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Genus</TableCell>
                                                <TableCell>{cropGuide?.classification.genus}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Species</TableCell>
                                                <TableCell>{cropGuide?.classification.species}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Nursery Management Section */}
                        <section id="nursery" className="space-y-6">
                            <h2 className="text-2xl font-bold">Nursery Management</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Seed Bed Preparation</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-4 space-y-2">
                                            <li>Remove all plant debris and weeds</li>
                                            <li>Plow and harrow the soil thoroughly</li>
                                            <li>Prepare raised beds 1m wide and 15-20cm high</li>
                                            <li>Apply well-decomposed organic matter</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Sowing Guidelines</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-4 space-y-2">
                                            <li>Sow seeds in rows 10cm apart</li>
                                            <li>Maintain 1-2cm depth</li>
                                            <li>Water gently after sowing</li>
                                            <li>Provide shade during hot weather</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Field Management Section */}
                        <section id="field-management" className="space-y-6">
                            <h2 className="text-2xl font-bold">Field Management</h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-1/3">Operation</TableHead>
                                                <TableHead>Details</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Land Preparation</TableCell>
                                                <TableCell>
                                                    <ul className="list-disc pl-4">
                                                        <li>Plow 2-3 times</li>
                                                        <li>Harrow until fine tilth</li>
                                                        <li>Make raised beds or ridges</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Fertilization</TableCell>
                                                <TableCell>
                                                    <ul className="list-disc pl-4">
                                                        <li>Basal: NPK (14-14-14)</li>
                                                        <li>Side dress: Urea at 30 and 45 DAT</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Irrigation</TableCell>
                                                <TableCell>Regular watering, maintain soil moisture</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Diseases Section */}
                        <section id="diseases" className="space-y-6">
                            <h2 className="text-2xl font-bold">Diseases and Pests</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {diseases.map((disease, index) => (
                                    <AccordionItem key={disease.name} value={`disease-${index}`}>
                                        <AccordionTrigger
                                            className="text-lg font-medium">{disease.name}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="aspect-video relative">
                                                    <img
                                                        src={disease.image || "/placeholder.svg"}
                                                        alt={disease.name}
                                                        className="rounded-lg object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="font-medium">Symptoms</h4>
                                                    <p className="text-muted-foreground">{disease.description}</p>
                                                    {disease.management && (
                                                        <>
                                                            <h4 className="font-medium">Management</h4>
                                                            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                                                                {disease.management.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </section>

                        {/* Program Section */}
                        <section id="program" className="space-y-6">
                            <h2 className="text-2xl font-bold">Production Program</h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Days</TableHead>
                                                <TableHead>Activity</TableHead>
                                                <TableHead>Products/Inputs</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {program.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{item.days}</TableCell>
                                                    <TableCell>{item.activity}</TableCell>
                                                    <TableCell>{item.products}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </section>
                    </main>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const diseases = [
    {
        name: "Black Rot",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cabbage_Complete_Guide.._page-0006-imageonline.co-merged.jpg-crhj95ivnrHHYssxUMJ4ChtdvStYV1.jpeg",
        description: "V-shaped yellow lesions on leaf margins, blackened veins",
        management: [
            "Use disease-free seeds",
            "Practice crop rotation",
            "Remove infected plants",
            "Apply appropriate fungicides",
        ],
    },
    {
        name: "Downy Mildew",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cabbage_Complete_Guide.._page-0006-imageonline.co-merged.jpg-crhj95ivnrHHYssxUMJ4ChtdvStYV1.jpeg",
        description: "Yellow patches on upper leaf surface, gray mold underneath",
        management: [
            "Improve air circulation",
            "Avoid overhead irrigation",
            "Apply preventive fungicides",
            "Remove infected leaves",
        ],
    },
    {
        name: "Club Root",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cabbage_Complete_Guide.._page-0006-imageonline.co-merged.jpg-crhj95ivnrHHYssxUMJ4ChtdvStYV1.jpeg",
        description: "Stunted growth, wilting, swollen and distorted roots",
        management: [
            "Maintain soil pH above 7.0",
            "Practice long crop rotation",
            "Improve drainage",
            "Use resistant varieties",
        ],
    },
]

const program = [
    {
        days: "0",
        activity: "Land preparation",
        products: "Organic fertilizer",
    },
    {
        days: "1-25",
        activity: "Seedling production",
        products: "Fungicides, Fertilizers",
    },
    {
        days: "26",
        activity: "Transplanting",
        products: "NPK (14-14-14)",
    },
    {
        days: "30-45",
        activity: "Side dressing",
        products: "Urea",
    },
    {
        days: "90-110",
        activity: "Harvesting",
        products: "-",
    },
]

