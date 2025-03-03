import type React from "react"
import {useRef, useState} from "react"
import {useCropVarietyContext} from "@/context/CropVarietyContext"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {CheckCircle, XCircle} from "lucide-react"
import {Crop} from "@/lib/types/crop";
import {CropSelector} from "@/othercomponents/shared/crop-selector";
import {FormProps} from "@/lib/types";
import {CropVarietySummary} from "@/othercomponents/cropvariety/crop-variety-summary";
import {DialogProps} from "@/lib/types/dialog-props";
import {Toast} from "primereact/toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {VarietyType} from "@/lib/enums/variety-type";
import {PesticideType} from "@/lib/enums/pesticide-type";
import {Pesticide} from "@/lib/types/pesticide";

export interface CropVarietyRequest {
    cropId: number
    variety: string
    maturityStartDay: number
    maturityEndDay: number
    harvestDuration: number
    remarks: string
    varietyType: VarietyType
}

const cropVarietyInitialState: CropVarietyRequest = {
    cropId: 0,
    variety: "",
    maturityStartDay: 0,
    maturityEndDay: 0,
    harvestDuration: 0,
    remarks: "",
    varietyType: VarietyType.EARLY_MATURITY
}

export default function CreateCropVariety({isOpen, onClose}: FormProps) {

    const [step, setStep] = useState(1)
    const {createCropVariety, loading} = useCropVarietyContext()
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null)
    const [cropVariety, setCropVariety] = useState<CropVarietyRequest>(cropVarietyInitialState)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast | null>(null);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    let varietyTypes = Object.keys(VarietyType);

    const dialogProps: DialogProps = {
        width: 625,
        title: "Create Crop Batch"
    }

    const handleCropSelect = (crop: Crop) => {
        setSelectedCrop(crop)
        setCropVariety((prev) => ({...prev, cropId: crop.id}))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setCropVariety((prev) => ({
            ...prev,
            [name]: name.includes("Day") || name === "harvestDuration" ? Number.parseInt(value) : value,
        }))
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ""});
        }
    }

    const handleSelectChange = (field: keyof CropVarietyRequest) => (value: string) => {
        setCropVariety((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Validate inputs
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!cropVariety.variety) newErrors.variety = "Variety Name is required";
        if (!cropVariety.maturityStartDay) newErrors.maturityStartDay = "Maturity Start Day is required";
        if (!cropVariety.maturityEndDay) newErrors.maturityEndDay = "Maturity End Day is required";
        if (!cropVariety.harvestDuration) newErrors.harvestDuration = "Harvest Duration Interval is required";
        if (!cropVariety.varietyType) newErrors.harvestDuration = "Variety Type is required";


        if (cropVariety.maturityStartDay > 0 && cropVariety.maturityStartDay > cropVariety.maturityEndDay) {
            newErrors.maturityEndDay = "Maturity End Day must be greater than Maturity Start Day";
        } else if (cropVariety.maturityStartDay === 0) {
            newErrors.maturityStartDay = "Maturity Start Day must be greater than 0";
        } else if (cropVariety.maturityEndDay === 0) {
            newErrors.maturityEndDay = "Maturity End Day must be greater than 0";
        } else if (cropVariety.harvestDuration === 0) {
            newErrors.harvestDuration = "Harvest Duration must be greater than 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("### GEDE")
        e.preventDefault()
        // try {
        //     await createCropVariety(cropVariety)
        //     setSubmitStatus("success")
        //     setIsDialogOpen(false)
        //     setStep(1)
        // } catch (error) {
        //     console.error("Error creating crop variety:", error)
        //     setSubmitStatus("error")
        // } finally {
        //
        // }

        try {
            const result = await createCropVariety(cropVariety);

            console.log("### result: ", result);

            if (result.success) {
                setSubmitStatus("success")
                setIsDialogOpen(false)
                setCropVariety(cropVarietyInitialState);
                onClose(); // Close modal by default
            }

        } catch (error) {
            console.error("Error creating crop:", error);
            setSubmitStatus("error")
            toast.current?.show({severity: "error", summary: "Error", detail: "Failed to create crop", life: 3000});
        } finally {
            setStep(1)
        }
    }

    const resetForm = () => {
        setSelectedCrop(null)
        setCropVariety(cropVarietyInitialState)
        openDialog()
        setSubmitStatus("idle")
    }

    const nextStep = () => {
        if (step == 1 && !selectedCrop) {
            return;
        }
        if (step == 2) {
            if (!validateForm()) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Validation Error",
                    detail: "Please fill all required fields",
                    life: 3000
                });
                return;
            }
        }
        if (step < 4) {
            setStep((prev) => prev + 1)
        } else {
            setStep(1)
            setIsDialogOpen(false)
        }
    }

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    const openDialog = () => setIsDialogOpen(true)

    const getDialogContent = () => {
        switch (step) {
            case 1:
                return (
                    <CropSelector dialogProps={dialogProps} onCropSelect={handleCropSelect}/>
                )
            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="variety">Variety Name</Label>
                            <Input
                                id="variety"
                                name="variety"
                                value={cropVariety.variety}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter Variety Name"/>
                            {errors.variety && <p className="text-red-500 text-sm">{errors.variety}</p>}
                        </div>
                        <div>
                            <Label htmlFor="maturityStartDay">Maturity Start Day</Label>
                            <Input
                                id="maturityStartDay"
                                name="maturityStartDay"
                                type="number"
                                value={cropVariety.maturityStartDay}
                                onChange={handleInputChange}
                                required/>
                            {errors.maturityStartDay &&
                                <p className="text-red-500 text-sm">{errors.maturityStartDay}</p>}
                        </div>
                        <div>
                            <Label htmlFor="maturityEndDay">Maturity End Day</Label>
                            <Input
                                id="maturityEndDay"
                                name="maturityEndDay"
                                type="number"
                                value={cropVariety.maturityEndDay}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.maturityEndDay && <p className="text-red-500 text-sm">{errors.maturityEndDay}</p>}
                        </div>

                        <div>
                            <Label htmlFor="varietyType">Variety Type</Label>
                            <Select name="varietyType"
                                    value={cropVariety.varietyType}
                                    onValueChange={handleSelectChange("varietyType")}>
                                <SelectTrigger id="varietyType">
                                    <SelectValue placeholder="Select Variety Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {varietyTypes.map((varietyType) => (
                                        <SelectItem value={varietyType}>
                                            {varietyType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.pesticideType && <p className="text-red-500 text-sm">{errors.pesticideType}</p>}
                        </div>


                        <div>
                            <Label htmlFor="harvestDuration">Harvest Duration (days)</Label>
                            <Input
                                id="harvestDuration"
                                name="harvestDuration"
                                type="number"
                                value={cropVariety.harvestDuration}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.harvestDuration && <p className="text-red-500 text-sm">{errors.harvestDuration}</p>}
                        </div>
                        <div>
                            <Label htmlFor="remarks">Remarks</Label>
                            <Textarea id="remarks" name="remarks" value={cropVariety.remarks}
                                      onChange={handleInputChange}/>
                        </div>
                    </div>
                )
            // case 3:
            //     return <CropVarietySummary crop={selectedCrop} cropVariety={cropVariety} onPrev={prevStep}
            //                                onSubmit={handleSubmit}/>
            default:
                return null
        }
    }

    return (step < 3) ? (
            <div className="max-w-4xl mx-auto p-4">
                <Toast ref={toast}/>
                <Card>
                    {submitStatus !== "success" && (
                        <CardHeader>
                            <CardTitle>Create Crop Variety</CardTitle>
                            <CardDescription>Add a new variety for an existing crop</CardDescription>
                        </CardHeader>
                    )}
                    <CardContent>
                        {submitStatus !== "success" && (
                            <div className="flex justify-between items-center">
                                <div>Step {step} of 3</div>
                                <Button
                                    onClick={openDialog}>{step === 3 ? "Review" : step === 1 ? "Start" : "Continue"}</Button>
                            </div>
                        )}
                        {submitStatus === "success" && (
                            <Alert className="mt-4">
                                <CheckCircle className="h-4 w-4"/>
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>Crop variety has been successfully created.</AlertDescription>
                                <Button onClick={resetForm} className="w-full pt-1">
                                    {submitStatus === "success" ? "Create Another Variety" : "Try Again"}
                                </Button>
                            </Alert>
                        )}
                        {submitStatus === "error" && (
                            <Alert variant="destructive" className="mt-4">
                                <XCircle className="h-4 w-4"/>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>There was an error creating the crop variety. Please try
                                    again.</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    {/*<CardFooter>*/}
                    {/*    {submitStatus !== "idle" && (*/}
                    {/*        <Button onClick={resetForm} className="w-full">*/}
                    {/*            {submitStatus === "success" ? "Create Another Variety" : "Try Again"}*/}
                    {/*        </Button>*/}
                    {/*    )}*/}
                    {/*</CardFooter>*/}
                </Card>


                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Crop Variety</DialogTitle>
                        </DialogHeader>
                        <form>
                            {getDialogContent()}
                            <div className="flex justify-between mt-6">
                                {step > 1 && (
                                    <Button type="button" onClick={prevStep} variant="outline">
                                        Previous
                                    </Button>
                                )}
                                {step < 3 ? (
                                    <Button type="button" disabled={step == 1 && !selectedCrop} onClick={nextStep}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button type="submit">Submit</Button>
                                )}
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
        :
        <div className="max-w-4xl mx-auto p-4">
            <Toast ref={toast}/>
            <Card>
                <CardHeader>
                    <CardTitle>Create Crop Variety</CardTitle>
                    <CardDescription>Add a new variety for an existing crop</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div>Step {step} of 3</div>
                        <Button
                            onClick={openDialog}>{step === 3 ? "Review" : step === 1 ? "Start" : "Continue"}</Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Crop Variety</DialogTitle>
                    </DialogHeader>
                    <CropVarietySummary crop={selectedCrop} cropVariety={cropVariety}/>
                    <div className="flex justify-between mt-6">
                        <Button type="button" onClick={prevStep} variant="outline">
                            Previous
                        </Button>
                        <Button type="submit" onClick={handleSubmit} disabled={loading}>
                            {loading ? <span
                                className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2"></span> : "Save Crop Variety"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
}

