'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {FormProps} from "@/lib/types";

export default function PolicyForm({isOpen,onClose}: FormProps) {
    const [policies, setPolicies] = useState<any[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const policyData = Object.fromEntries(formData.entries())
        setPolicies([...policies, policyData])
    }

    return (
        // <Card>
        //     <CardHeader>
        //         <CardTitle>Policy Information</CardTitle>
        //     </CardHeader>
        //     <CardContent>
                <div>
                    <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add Policy</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="policyId">Policy ID</Label>
                                    <Input id="policyId" name="policyId" type="number" placeholder="Enter policy ID" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="policyNumber">Policy Number</Label>
                                    <Input id="policyNumber" name="policyNumber" placeholder="Enter policy number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="suffix">Suffix</Label>
                                    <Input id="suffix" name="suffix" placeholder="Enter suffix" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" placeholder="Enter first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" placeholder="Enter last name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="Enter email" />
                                </div>
                            </div>
                            <Button type="submit">Save Policy</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                {policies.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Added Policies:</h3>
                        <ul className="list-disc pl-5">
                            {policies.map((policy, index) => (
                                <li key={index}>{policy.policyNumber} - {policy.firstName} {policy.lastName}</li>
                            ))}
                        </ul>
                    </div>
                )}
                </div>
        // {/*    </CardContent>*/}
        // {/*</Card>*/}
    )
}

