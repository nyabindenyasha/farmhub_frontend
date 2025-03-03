'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog'
import {AddButton} from './AddButton'

export default function PracticeForm() {
    const [practices, setPractices] = useState<any[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const practiceData = Object.fromEntries(formData.entries())
        setPractices([...practices, practiceData])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Practice Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <AddButton label="Add Practice" onClick={() => {}} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add Practice</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="practiceNumber">Practice Number</Label>
                                    <Input id="practiceNumber" name="practiceNumber" placeholder="Enter practice number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="disciplineCode">Discipline Code</Label>
                                    <Input id="disciplineCode" name="disciplineCode" placeholder="Enter discipline code" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="Enter email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="providerStatus">Provider Status</Label>
                                    <Input id="providerStatus" name="providerStatus" placeholder="Enter provider status" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addressLine1">Address Line 1</Label>
                                <Input id="addressLine1" name="address.addressLine1" placeholder="Enter address line 1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addressLine2">Address Line 2</Label>
                                <Input id="addressLine2" name="address.addressLine2" placeholder="Enter address line 2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="address.city" placeholder="Enter city" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="province">Province</Label>
                                    <Input id="province" name="address.province" placeholder="Enter province" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="address.country" placeholder="Enter country" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">Postal Code</Label>
                                    <Input id="postalCode" name="address.postalCode" placeholder="Enter postal code" />
                                </div>
                            </div>
                            <Button type="submit">Save Practice</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                {practices.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Added Practices:</h3>
                        <ul className="list-disc pl-5">
                            {practices.map((practice, index) => (
                                <li key={index}>{practice.practiceNumber} - {practice.email}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

