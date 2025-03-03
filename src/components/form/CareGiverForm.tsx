'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select'
import {FormProps} from "@/lib/types";

export default function CarerForm({isOpen,onClose}: FormProps) {
    const [carers, setCarers] = useState<any[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const carerData = Object.fromEntries(formData.entries())
        setCarers([...carers, carerData])
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add Carer</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="carerTitle">Carer Title</Label>
                                <Select name="carerTitle">
                                    <SelectTrigger id="carerTitle">
                                        <SelectValue placeholder="Select carer title"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NURSE">Nurse</SelectItem>
                                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                                        <SelectItem value="THERAPIST">Therapist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="joiningDate">Joining Date</Label>
                                <Input id="joiningDate" name="joiningDate" type="date"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Personal Details</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input name="personalDetails.firstName" placeholder="First Name"/>
                                <Input name="personalDetails.lastName" placeholder="Last Name"/>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <Input name="personalDetails.idNumber" placeholder="ID Number"/>
                                <Select name="personalDetails.gender">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Gender"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select name="personalDetails.title">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Title"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MR">Mr</SelectItem>
                                        <SelectItem value="MRS">Mrs</SelectItem>
                                        <SelectItem value="MS">Ms</SelectItem>
                                        <SelectItem value="DR">Dr</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-2">
                                <Input name="personalDetails.dateOfBirth" type="date" placeholder="Date of Birth"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Contact Details</Label>
                            <Input name="contactDetails.primaryPhoneNumber" placeholder="Primary Phone Number"/>
                            <Input name="contactDetails.alternativeContactNumber"
                                   placeholder="Alternative Contact Number"/>
                            <Input name="contactDetails.email" type="email" placeholder="Email"/>
                            <Input name="contactDetails.carerAddress" placeholder="Carer Address"/>
                        </div>
                        <Button type="submit">Save Carer</Button>
                    </form>
                </DialogContent>
            </Dialog>
            {/*{carers.length > 0 && (*/}
            {/*    <div className="mt-4">*/}
            {/*        <h3 className="font-semibold mb-2">Added Carers:</h3>*/}
            {/*        <ul className="list-disc pl-5">*/}
            {/*            {carers.map((carer, index) => (*/}
            {/*                <li key={index}>{carer.personalDetails.firstName} {carer.personalDetails.lastName} - {carer.carerTitle}</li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>

    )
}

