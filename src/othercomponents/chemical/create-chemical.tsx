'use client'

import React, {useRef, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select'
import {FormProps} from "@/lib/types";
import {Pesticide} from "@/lib/types/pesticide";
import {PlusCircle, X} from "lucide-react";
import {PesticideType} from "@/lib/enums/pesticide-type";
import {PesticideModeOfAction} from "@/lib/enums/pesticide-mode-of-action";
import {usePesticideContext} from "@/context/PesticideContext";
import {Toast} from "primereact/toast";

export default function CreateChemical({isOpen, onClose}: FormProps) {

    const {createPesticide, loading} = usePesticideContext();

    const initialPesticideData: Pesticide = {
        id: 0,
        name: "",
        alias: "",
        activeIngredients: [],
        applicationRate: "",
        safetyInterval: 7,
        pesticideType: PesticideType.PESTICIDE,
        modeOfAction: PesticideModeOfAction.PREVENTATIVE,
        targetPests: [],
        targetDiseases: [],
        alternatives: []
    }

    const [pesticideData, setPesticideData] = useState<Pesticide>(initialPesticideData
    );

    const [activeIngredients, setActiveIngredients] = useState<string[]>([""])
    const [targetPests, setTargetPests] = useState<string[]>([""])
    const [targetDiseases, setTargetDiseases] = useState<string[]>([""])

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast | null>(null);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPesticideData({...pesticideData, [e.target.name]: e.target.value});
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ""});
        }
    };

    // Validate inputs
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!pesticideData.name) newErrors.name = "Name is required";
        if (!pesticideData.alias) newErrors.alias = "Alias is required";
        if (!pesticideData.applicationRate) newErrors.applicationRate = "Application Rate is required";
        if (!pesticideData.safetyInterval) newErrors.safetyInterval = "Safety Interval is required";
        if (!pesticideData.modeOfAction) newErrors.modeOfAction = "Mode Of Action is required";

        // Alternative Crops Validation
        if (activeIngredients.length === 0) {
            newErrors.activeIngredients = "At least one active ingredient is required.";
        } else if (activeIngredients.some((activeIngredient) => activeIngredient.trim() === "")) {
            newErrors.activeIngredients = "Active ingredient  cannot be empty.";
        }

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
            pesticideData.activeIngredients = activeIngredients;
            pesticideData.targetPests = targetPests;
            pesticideData.targetDiseases = targetDiseases;

            const result = await createPesticide(pesticideData);
            console.log("### result: ", result);
            if (result.success) {
                setPesticideData(initialPesticideData);
                onClose(); // Close modal by default
            }

        } catch (error) {
            console.error("Error creating crop:", error);
            toast.current?.show({severity: "error", summary: "Error", detail: "Failed to create crop", life: 3000});
        } finally {
            console.log("finally")
        }
    };

    const handleArrayInput = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter((prev) => {
            const newArray = [...prev]
            newArray[index] = value
            return newArray
        })
    }

    // Generic handler for enum/select fields
    const handleSelectChange = (field: keyof Pesticide) => (value: string) => {
        setPesticideData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter((prev) => [...prev, ""])
    }

    const removeArrayItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter((prev) => prev.filter((_, i) => i !== index))
    }

    let appointmentTypes = Object.keys(PesticideType);

    let modeOfAction = Object.keys(PesticideModeOfAction);

    console.log("#### appointmentTypes: ", appointmentTypes);

    return (
        <div>
            <Toast ref={toast}/>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add Pesticide</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name"
                                       name="name"
                                       placeholder="Enter Pesticide Name"
                                       value={pesticideData.name}
                                       onChange={handleChange}/>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="alias">Alias</Label>
                                <Input id="alias"
                                       name="alias"
                                       placeholder="Enter Alternative Name"
                                       value={pesticideData.alias}
                                       onChange={handleChange}/>
                                {errors.alias && <p className="text-red-500 text-sm">{errors.alias}</p>}
                            </div>
                        </div>

                        {/*active ingredients*/}

                        <div>
                            <Label>Active Ingredients</Label>
                            {activeIngredients.map((ingredient, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <Input
                                        value={ingredient}
                                        onChange={(e) => handleArrayInput(index, e.target.value, setActiveIngredients)}
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeArrayItem(index, setActiveIngredients)}
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
                                onClick={() => addArrayItem(setActiveIngredients)}
                                className="mt-2"
                            >
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                Add Ingredient
                            </Button>
                            {errors.activeIngredients &&
                                <p className="text-red-500 text-sm">{errors.activeIngredients}</p>}
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="applicationRate">Application Rate</Label>
                                <Input id="applicationRate"
                                       name="applicationRate"
                                       placeholder="Enter Application Rate"
                                       value={pesticideData.applicationRate}
                                       onChange={handleChange}/>
                                {errors.applicationRate &&
                                    <p className="text-red-500 text-sm">{errors.applicationRate}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="safetyInterval">Safety Interval (Days)</Label>
                                <Input id="safetyInterval"
                                       name="safetyInterval"
                                       type="number"
                                       placeholder="7"
                                       value={pesticideData.safetyInterval}
                                       onChange={handleChange}/>
                                {errors.safetyInterval &&
                                    <p className="text-red-500 text-sm">{errors.safetyInterval}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pesticideType">Pesticide Type</Label>
                                <Select name="pesticideType"
                                        value={pesticideData.pesticideType}
                                        onValueChange={handleSelectChange("pesticideType")}>
                                    <SelectTrigger id="pesticideType">
                                        <SelectValue placeholder="Select Pesticide Type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {appointmentTypes.map((pesticideType) => (
                                            <SelectItem value={pesticideType}>
                                                {pesticideType}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.pesticideType && <p className="text-red-500 text-sm">{errors.pesticideType}</p>}
                            </div>


                            <div className="space-y-2">
                                <Label htmlFor="modeOfAction">Mode Of Action</Label>
                                <Select name="modeOfAction"
                                        value={pesticideData.modeOfAction}
                                        onValueChange={handleSelectChange("modeOfAction")}>
                                    <SelectTrigger id="modeOfAction">
                                        <SelectValue placeholder="Select Mode Of Action"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {modeOfAction.map((modeOfAction) => (
                                            <SelectItem value={modeOfAction}>
                                                {modeOfAction}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.modeOfAction && <p className="text-red-500 text-sm">{errors.modeOfAction}</p>}
                        </div>

                        <div>
                            <Label>Target Pests</Label>
                            {targetPests.map((pest, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <Input
                                        value={pest}
                                        onChange={(e) => handleArrayInput(index, e.target.value, setTargetPests)}
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeArrayItem(index, setTargetPests)}
                                        className="ml-2"
                                    >
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm"
                                    onClick={() => addArrayItem(setTargetPests)} className="mt-2">
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                Add Target Pest
                            </Button>
                        </div>

                        <div>
                            <Label>Target Diseases</Label>
                            {targetDiseases.map((disease, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <Input
                                        value={disease}
                                        onChange={(e) => handleArrayInput(index, e.target.value, setTargetDiseases)}
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeArrayItem(index, setTargetDiseases)}
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
                                onClick={() => addArrayItem(setTargetDiseases)}
                                className="mt-2"
                            >
                                <PlusCircle className="h-4 w-4 mr-2"/>
                                Add Target Disease
                            </Button>
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? <span
                                className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2"></span> : "Save Pesticide"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

