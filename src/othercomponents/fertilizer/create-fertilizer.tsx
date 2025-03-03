'use client'

import React, {useRef, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {FormProps} from "@/lib/types";
import {useFertilizerContext} from "@/context/FertilizerContext";
import {Fertilizer} from "@/lib/types/fertilizer";
import {Toast} from "primereact/toast";

export default function CreateFertilizer({isOpen, onClose}: FormProps) {

    const {createFertilizer, loading} = useFertilizerContext();

    const [fertilizerData, setFertilizerData] = useState<Fertilizer>({
            id: 0,
            name: "",
            alias: "",
            composition: "",
            remarks: ""
        }
    );

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useRef<Toast | null>(null);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFertilizerData({...fertilizerData, [e.target.name]: e.target.value});
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: ""});
        }
    };

    // Validate inputs
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!fertilizerData.name) newErrors.name = "Name is required";
        if (!fertilizerData.alias) newErrors.alias = "Alias is required";
        if (!fertilizerData.composition) newErrors.composition = "Composition is required";
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
            const result = await createFertilizer(fertilizerData);
            console.log("### result: ", result);
            if (result.success) {
                setFertilizerData({id: 0, name: "", alias: "", composition: "", remarks: ""});
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
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add Fertilizer</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name"
                                       name="name"
                                       placeholder="Enter Fertilizer Name"
                                       value={fertilizerData.name}
                                       onChange={handleChange}/>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="alias">Alias</Label>
                                <Input id="alias"
                                       name="alias"
                                       placeholder="Enter Alternative Name"
                                       value={fertilizerData.alias}
                                       onChange={handleChange}/>
                                {errors.alias && <p className="text-red-500 text-sm">{errors.alias}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="composition">Composition</Label>
                                <Input id="composition"
                                       name="composition"
                                       placeholder="Enter Fertilizer Composition"
                                       value={fertilizerData.composition}
                                       onChange={handleChange}/>
                                {errors.composition && <p className="text-red-500 text-sm">{errors.composition}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="remarks">Remarks</Label>
                                <Input id="remarks"
                                       name="remarks"
                                       type="remarks"
                                       value={fertilizerData.remarks}
                                       onChange={handleChange}
                                       placeholder="Enter Remarks"/>
                            </div>
                            <div className="space-y-2">
                            </div>
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? <span
                                className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2"></span> : "Save Fertilizer"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

