'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select'

interface AppointmentFormProps {
    isOpen: boolean
    onClose: () => void
}
export default function AppointmentForm({ isOpen, onClose }: AppointmentFormProps) {
    const [appointments, setAppointments] = useState<any[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const appointmentData = Object.fromEntries(formData.entries())
        setAppointments([...appointments, appointmentData])
        onClose()
    }

    return (
     <div>
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add Appointment</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="appointmentName">Appointment Name</Label>
                                    <Input id="appointmentName" name="appointmentName" placeholder="Enter appointment name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serviceProviderId">Service Provider ID</Label>
                                    <Input id="serviceProviderId" name="serviceProviderId" type="number" placeholder="Enter service provider ID" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" name="address" placeholder="Enter address" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="appContactNumber">Contact Number</Label>
                                    <Input id="appContactNumber" name="appContactNumber" placeholder="Enter contact number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="appointmentType">Appointment Type</Label>
                                    <Select name="appointmentType">
                                        <SelectTrigger id="appointmentType">
                                            <SelectValue placeholder="Select appointment type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MEDICATION">Medication</SelectItem>
                                            <SelectItem value="CHECKUP">Checkup</SelectItem>
                                            <SelectItem value="THERAPY">Therapy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="appDescription">Description</Label>
                                <Textarea id="appDescription" name="appDescription" placeholder="Enter appointment description" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="appDateTime">Date and Time</Label>
                                <Input id="appDateTime" name="appDateTime" type="datetime-local" />
                            </div>
                            <Button type="submit">Save Appointment</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                 {/*{appointments.length > 0 && (*/}
                 {/*    <div className="mt-4">*/}
                 {/*        <h3 className="font-semibold mb-2">Added Appointments:</h3>*/}
                 {/*        <ul className="list-disc pl-5">*/}
                 {/*            {appointments.map((appointment, index) => (*/}
                 {/*                <li key={index}>{appointment.appointmentName} - {appointment.appointmentType}</li>*/}
                 {/*            ))}*/}
                 {/*        </ul>*/}
                 {/*    </div>*/}
                 {/*)}*/}
        </div>
    )
}

