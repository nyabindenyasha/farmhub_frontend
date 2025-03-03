'use client'

import React, {useEffect, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FormProps} from "@/lib/types";
import {Crop} from "@/lib/types/crop";
import {useCropBatchContext} from "@/context/CropBatchContext";
import {CropSelector} from "@/othercomponents/shared/crop-selector";
import {DateTimePicker} from "@/components/datetime/date-time-picker";
import {CropProgram} from "@/lib/types/crop-program";
import {DialogProps} from "@/lib/types/dialog-props";
import {CropProgramSelector} from "@/othercomponents/shared/crop-program-selector";
import {useUser} from "@/hooks/useUser";
import {CropBatchSummary} from "@/farmercomponents/cropbatches/crop-batch-summary";


export interface CropBatchRequest {
    farmerId: number,
    cropProgramId: number,
    dateOfTransplant: string,
    location: string,
    remarks: string
}

export default function CreateCropBatch({isOpen, onClose}: FormProps) {

    const [step, setStep] = useState(1)

    const [cropBatch, setCropBatch] = useState<CropBatchRequest>({
        farmerId: 0,
        cropProgramId: 0,
        dateOfTransplant: "",
        location: "",
        remarks: ""
    })
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {createCropBatch} = useCropBatchContext();

    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null)

    const [selectedCropProgram, setSelectedCropProgram] = useState<CropProgram | null>(null)

    const [isLoading, setIsLoading] = useState(false)

    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const {user} = useUser();

    useEffect(() => {
        if (user?.userAccount.id) {
            setCropBatch((prev) => ({...prev, farmerId: user.userAccount.id}));
        }
    }, [user]);

    const dialogProps: DialogProps = {
        width: 625,
        title: "Create Crop Batch"
    }

    const handleCropSelect = (crop: Crop) => {
        console.log("here: ", JSON.stringify(crop))
        console.log("here: ", user)
        setSelectedCrop(crop)
    }

    const handleCropProgramSelect = (cropProgram: CropProgram) => {
        console.log("here: ", JSON.stringify(cropProgram))
        setSelectedCropProgram(cropProgram)
        if (cropProgram) {
            setCropBatch((prev) => ({...prev, cropProgramId: cropProgram.id}));
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setCropBatch((prev) => ({...prev, [name]: value}))
    }

    const handleDateTimeChange = (value: string) => {
        console.log("here again: ", value)
        setCropBatch((prev) => ({...prev, dateOfTransplant: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            console.log(cropBatch)
            cropBatch.cropProgramId = (selectedCropProgram) ? selectedCropProgram.id : 0;
            console.log(cropBatch)
            await createCropBatch(cropBatch)
            setSubmitStatus("success")
            setIsDialogOpen(false)
            setStep(1)
        } catch (error) {
            console.error("Error creating crop variety:", error)
            setSubmitStatus("error")
        } finally {
            setIsLoading(false)
            setStep(1)
        }
    }

    const resetForm = () => {
        setSelectedCrop(null)
        setCropBatch({
            farmerId: 0,
            cropProgramId: 0,
            dateOfTransplant: "",
            location: "",
            remarks: ""
        })
        setSubmitStatus("idle")
    }

    const nextStep = () => {
        if (step < 5) {
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
                    <CropSelector onCropSelect={handleCropSelect} dialogProps={dialogProps}/>
                )
            case 2:
                return (
                    <CropProgramSelector crop={selectedCrop} onCropProgramSelect={handleCropProgramSelect}
                                         dialogProps={dialogProps}/>
                )
            case 3:
                return (
                    <div className="space-y-2">

                        <DateTimePicker value={cropBatch.dateOfTransplant} onChange={handleDateTimeChange}
                                        label="Date of Transplant"/>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                name="location"
                                value={cropBatch.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="remarks">Remarks</Label>
                            <Textarea id="remarks" name="remarks" value={cropBatch.remarks} onChange={handleInputChange}
                                      rows={2}/>
                        </div>

                    </div>
                )
            case 4:
                return <CropBatchSummary cropBatch={cropBatch}
                                         cropProgram={(selectedCropProgram) ? selectedCropProgram : null}/>
            default:
                return null
        }
    }

    return (step < 4) ? (
            <div className="max-w-4xl mx-auto p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Crop Batch</CardTitle>
                        <CardDescription>Follow the steps to create your crop batch</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>Step {step} of 4</div>
                            <Button
                                onClick={openDialog}>{step === 4 ? "Review" : step === 1 ? "Start" : "Continue"}</Button>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    {/*<DialogContent className={`sm:max-w-[${dialogProps.width}px] overflow-y-auto`}>*/}
                    <DialogContent className="max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create Crop Batch</DialogTitle>
                        </DialogHeader>


                        <form onSubmit={handleSubmit}>
                            {getDialogContent()}
                            <div className="flex justify-between mt-6">
                                {step > 1 && (
                                    <Button type="button" onClick={prevStep} variant="outline">
                                        Previous
                                    </Button>
                                )}
                                {step < 4 ? (
                                    <Button type="button" onClick={nextStep}>
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
            <Card>
                <CardHeader>
                    <CardTitle>Create Crop Batch</CardTitle>
                    <CardDescription>Follow the steps to create your crop batch</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div>Step {step} of 4</div>
                        <Button
                            onClick={openDialog}>{step === 4 ? "Review" : step === 1 ? "Start" : "Continue"}</Button>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create Crop Batch</DialogTitle>
                    </DialogHeader>
                    <CropBatchSummary cropBatch={cropBatch}
                                      cropProgram={(selectedCropProgram) ? selectedCropProgram : null}/>
                    <div className="flex justify-between mt-6">
                        <Button type="button" onClick={prevStep} variant="outline">
                            Previous
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
}

