'use client'

import React, {useRef, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {CropFormProps} from "@/lib/types";
import {useCropContext} from "@/context/CropContext";
import {Crop} from "@/lib/types/crop";
import {Toast} from "primereact/toast";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {CheckCircle} from "lucide-react";

export default function CreateCrop({isOpen, onClose, onCropSelect}: CropFormProps) {

    const {createCrop, loading} = useCropContext()

    const [cropData, setCropData] = useState<Crop>({
        id: 0,
        name: "",
        family: "",
        genus: "",
        species: "",
        subSpecies: "",
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast | null>(null);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [createdCrop, setCreatedCrop] = useState<Crop | undefined>(undefined);


    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCropData({...cropData, [e.target.name]: e.target.value});
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ""});
        }
    };

    // Validate inputs
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!cropData.name) newErrors.name = "Crop name is required";
        if (!cropData.family) newErrors.family = "Crop family is required";
        if (!cropData.genus) newErrors.genus = "Genus is required";
        if (!cropData.species) newErrors.species = "Species is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            toast.current?.show({
                severity: "warn",
                summary: "Validation Error",
                detail: "Please fill all required fields",
                life: 3000
            });
            return;
        }
        try {
            const result = await createCrop(cropData);

            console.log("### result: ", result);

            if (result.success) {
                setSubmitStatus("success")
                setCreatedCrop(result.data)
                onCropSelect(result.data);
                setCropData({id: 0, name: "", family: "", genus: "", species: "", subSpecies: ""});
                onClose(); // Close modal by default
            }

        } catch (error) {
            console.error("Error creating crop:", error);
            toast.current?.show({severity: "error", summary: "Error", detail: "Failed to create crop", life: 3000});
        } finally {
            console.log("finally")
        }
    };


    return (
        <div>
            <Toast ref={toast}/>

            {submitStatus === "success" && (
                <Card className="w-full max-w-2xl mx-auto">
                    <CardContent>
                        <Alert className="mt-4">
                            <CheckCircle className="h-4 w-4"/>
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{createdCrop?.name} Crop has been successfully created.</AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={() => {
                            //     logic to continue config
                        }}>
                            Continue Configuring Crop
                        </Button>
                    </CardFooter>
                </Card>
            )}

            <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add Crop</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name"
                                       name="name"
                                       key="name"
                                       type="text"
                                       value={cropData.name}
                                       onChange={handleChange} placeholder="Enter Crop Name"/>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="family">Family</Label>
                                <Input id="family"
                                       name="family"
                                       key="family"
                                       type="text"
                                       value={cropData.family}
                                       onChange={handleChange} placeholder="Enter Crop Family"/>
                                {errors.family && <p className="text-red-500 text-sm">{errors.family}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="genus">Genus</Label>
                                <Input id="genus"
                                       name="genus"
                                       key="genus"
                                       type="text"
                                       value={cropData.genus}
                                       onChange={handleChange} placeholder="Enter Crop Genus"/>
                                {errors.genus && <p className="text-red-500 text-sm">{errors.genus}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="species">Species</Label>
                                <Input id="species"
                                       name="species"
                                       key="species"
                                       type="text"
                                       value={cropData.species}
                                       onChange={handleChange} placeholder="Enter Crop Species"/>
                                {errors.species && <p className="text-red-500 text-sm">{errors.species}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="subSpecies">Sub Species</Label>
                                <Input id="subSpecies"
                                       name="subSpecies"
                                       key="subSpecies"
                                       type="text"
                                       value={cropData.subSpecies}
                                       onChange={handleChange} placeholder="Enter Crop Sub Species"/>
                            </div>
                            <div className="space-y-2">
                            </div>
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? <span
                                className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2"></span> : "Save Crop"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

