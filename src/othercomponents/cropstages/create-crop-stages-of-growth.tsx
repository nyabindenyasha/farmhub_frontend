import type React from "react"
import {useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Maximize2, Minimize2, PlusCircle, X} from "lucide-react"
import {Period} from "@/lib/types/period";
import {StagesOfGrowth} from "@/lib/enums/stages-of-growth";
import {PeriodUnit} from "@/lib/enums/period-unit";
import {Crop} from "@/lib/types/crop";
import {FormProps} from "@/lib/types";
import {useCropStagesOfGrowthContext} from "@/context/CropStagesOfGrowthContext";
import {DialogProps} from "@/lib/types/dialog-props";
import {CropSelector} from "@/othercomponents/shared/crop-selector";
import {Toast} from "primereact/toast";

interface GrowthStage {
    stageStartDate: Period
    stageEndDate: Period
    stageOfGrowth: StagesOfGrowth
    expanded: boolean
}

export interface CropStagesOfGrowthRequest {
    cropId: number
    cropStages: GrowthStage[]
}

const stageInitialState: GrowthStage = {
    stageStartDate: {periodUnit: PeriodUnit.DAYS, periodValue: 1},
    stageEndDate: {periodUnit: PeriodUnit.DAYS, periodValue: 1},
    stageOfGrowth: StagesOfGrowth.TRANSPLANTING,
    expanded: true
}

const initialCropStagesOfGrowth: CropStagesOfGrowthRequest = {
    cropId: 0,
    cropStages: [
        stageInitialState,
    ],
}

export default function CreateCropStagesOfGrowth({isOpen, onClose}: FormProps) {
    const [step, setStep] = useState(1)
    const {createCropStagesOfGrowth} = useCropStagesOfGrowthContext();
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null)
    const [cropStagesOfGrowth, setCropStagesOfGrowth] = useState<CropStagesOfGrowthRequest>(initialCropStagesOfGrowth)
    const [cropStage, setCropStage] = useState<GrowthStage>(stageInitialState)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast | null>(null);

    const dialogProps: DialogProps = {
        width: 625,
        title: "Create Crop Batch"
    }

    const handleCropSelect = (crop: Crop) => {
        setSelectedCrop(crop)
        setCropStagesOfGrowth((prev) => ({...prev, cropId: crop.id}))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setCropStage((prev) => ({
            ...prev
        }))
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ""});
        }
    }

    const handleStageChange = (index: number, field: keyof GrowthStage, value: any) => {
        setCropStagesOfGrowth((prev) => ({
            ...prev,
            cropStages: prev.cropStages.map((stage, i) => (i === index ? {...stage, [field]: value} : stage)),
        }))
    }

    const handlePeriodChange = (
        index: number,
        dateType: "stageStartDate" | "stageEndDate",
        field: keyof Period,
        value: any,
    ) => {
        setCropStagesOfGrowth((prev) => ({
            ...prev,
            cropStages: prev.cropStages.map((stage, i) =>
                i === index
                    ? {
                        ...stage,
                        [dateType]: {...stage[dateType], [field]: field === "periodValue" ? Number(value) : value},
                    }
                    : stage,
            ),
        }))
    }

    const addStage = () => {
        setCropStagesOfGrowth((prev) => ({
            ...prev,
            cropStages: [
                ...prev.cropStages,
                stageInitialState,
            ],
        }))
        setCropStage(stageInitialState);
    }

    const removeStage = (index: number) => {
        setCropStagesOfGrowth((prev) => ({
            ...prev,
            cropStages: prev.cropStages.filter((_, i) => i !== index),
        }))
    }

    const toggleExpanded = (index: number) => {
        setCropStagesOfGrowth((prev) => ({
            ...prev,
            cropStages: prev.cropStages.map((stage, i) =>
                i === index ? {...stage, expanded: !stage.expanded} : stage,
            ),
        }))
    }

    const validateSubmit = () => {
        if (cropStagesOfGrowth.cropStages.length === 0) {
            // newErrors.activeIngredients = "At least one active ingredient is required.";
            toast.current?.show({
                severity: "warn",
                summary: "Validation Error",
                detail: "At least one stage is required",
                life: 3000
            });
        }
    };


    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!cropStage.stageStartDate.periodUnit) newErrors.variety = "Stage Start Date Period Unit is required";
        if (!cropStage.stageStartDate.periodValue) newErrors.variety = "Stage Start Date Period Value is required";
        if (!cropStage.stageEndDate.periodUnit) newErrors.variety = "Stage End Date Period Unit is required";
        if (!cropStage.stageEndDate.periodValue) newErrors.variety = "Stage End Date Period Value is required";
        if (!cropStage.stageOfGrowth) newErrors.harvestDuration = "Stage is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await createCropStagesOfGrowth(cropStagesOfGrowth)

            console.log("### result: ", result);

            if (result.success) {
                setIsDialogOpen(false)
                setCropStagesOfGrowth(initialCropStagesOfGrowth);
                onClose(); // Close modal by default
            }

        } catch (error) {
            console.error("Error creating crop stages:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create crop stages",
                life: 3000
            });
        } finally {
            setStep(1)
        }
    }

    const resetForm = () => {
        setCropStagesOfGrowth(initialCropStagesOfGrowth)
        setSelectedCrop(null)
        openDialog()
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
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {cropStagesOfGrowth.cropStages.map((stage, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-lg">Stage {index + 1}</CardTitle>
                                            <Button variant="ghost" size="sm" onClick={() => toggleExpanded(index)}>
                                                {stage.expanded ? <Minimize2 className="h-4 w-4"/> :
                                                    <Maximize2 className="h-4 w-4"/>}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {!stage.expanded && (
                                            <div className="text-sm text-gray-500">
                                                {stage.stageOfGrowth} ({stage.stageStartDate.periodValue} {stage.stageStartDate.periodUnit} -{" "}
                                                {stage.stageEndDate.periodValue} {stage.stageEndDate.periodUnit})
                                            </div>
                                        )}
                                        {stage.expanded && (
                                            <>
                                                <div>
                                                    <Label>Stage of Growth</Label>
                                                    <Select
                                                        value={stage.stageOfGrowth.toString()}
                                                        onValueChange={(value) => handleStageChange(index, "stageOfGrowth", value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select stage of growth"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {stagesOfGrowth.map((stageOfGrowth) => (
                                                                <SelectItem value={stageOfGrowth}>
                                                                    {stageOfGrowth}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>Start Date</Label>
                                                        <div className="flex space-x-2">
                                                            <Input
                                                                type="number"
                                                                value={stage.stageStartDate.periodValue}
                                                                onChange={(e) =>
                                                                    handlePeriodChange(index, "stageStartDate", "periodValue", e.target.value)
                                                                }
                                                                required
                                                            />
                                                            <Select
                                                                value={stage.stageStartDate.periodUnit.toString()}
                                                                onValueChange={(value) =>
                                                                    handlePeriodChange(index, "stageStartDate", "periodUnit", value)
                                                                }
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Unit"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {periodUnits.map((periodUnit) => (
                                                                        <SelectItem value={periodUnit}>
                                                                            {periodUnit}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label>End Date</Label>
                                                        <div className="flex space-x-2">
                                                            <Input
                                                                type="number"
                                                                value={stage.stageEndDate.periodValue}
                                                                onChange={(e) =>
                                                                    handlePeriodChange(index, "stageEndDate", "periodValue", e.target.value)
                                                                }
                                                                required
                                                            />
                                                            <Select
                                                                value={stage.stageEndDate.periodUnit.toString()}
                                                                onValueChange={(value) =>
                                                                    handlePeriodChange(index, "stageEndDate", "periodUnit", value)
                                                                }
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Unit"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {periodUnits.map((periodUnit) => (
                                                                        <SelectItem value={periodUnit}>
                                                                            {periodUnit}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>

                                </Card>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeStage(index)}
                                    disabled={cropStagesOfGrowth.cropStages.length === 1}
                                    className="ml-2"
                                >
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        ))}


                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addStage}
                            className="mt-2"
                        >
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add Stage
                        </Button>

                    </form>
                )
            case 3:
                return renderSummary()
            default:
                return null
        }
    }

    const renderSummary = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Summary</h3>
            <div>
                <p className="font-medium">Crop: {selectedCrop?.name}</p>
            </div>
            {cropStagesOfGrowth.cropStages.map((stage, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>
                            Stage {index + 1}: {stage.stageOfGrowth}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Start: {stage.stageStartDate.periodValue} {stage.stageStartDate.periodUnit}
                        </p>
                        <p>
                            End: {stage.stageEndDate.periodValue} {stage.stageEndDate.periodUnit}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    let periodUnits = Object.keys(PeriodUnit);
    let stagesOfGrowth = Object.keys(StagesOfGrowth);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Toast ref={toast}/>
            <Card>
                <CardHeader>
                    <CardTitle>Create Crop Stages of Growth</CardTitle>
                    <CardDescription>Define the stages of growth for a crop</CardDescription>
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
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create Crop Stages of Growth</DialogTitle>
                        <DialogDescription>Define the stages of growth for your crop</DialogDescription>
                    </DialogHeader>
                    {/*{showSummary ? (*/}
                    {/*    renderSummary()*/}
                    {/*) : (*/}
                    {/*    getDialogContent()*/}
                    {/*)}*/}

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
                            <Button type="submit" onClick={handleSubmit}>Submit</Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}