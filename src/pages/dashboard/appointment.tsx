import React, {useState} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";


import {Plus, Search} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import CustomStatus from "@/components/status/CustomStatus";
import PrimaryButton from "@/components/buttons/customButton";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useRouter} from "next/router";
import {patients} from "@/lib/data";
import {AppointmentResponse} from "@/lib/types";
import AppointmentForm from "@/components/form/AppointmentForrm";


const appointmentResponses: AppointmentResponse[] = Array(2).fill({
    id: 9,
    appointmentName: "Monthly Check Up",
    address: "1 Dapi Rd Seke Unit K",
    appContactNumber: "1234567",
    appDescription: "Montly check up done to NMB Patients",
    status: "PENDING",
    appointmentType:"ACTIVE",
    appDateTime:"12 Dec 2024 T 1200h",
    appointmentStatus:"PENDING",
    serviceProvider:{
        providerName:"Dr Alvin",
        practiceNumber:"12345",
        email:"ga@gmail.com",
        subDiscipline:"",
        contactNumber:"+263777487599",
        alternativeContactNumber:"PENDING",
        disciplineCode:"PENDING",
        providerStatus:"PENDING",
        address:{
            addressLine1:"PENDING",
            addressLine2:"PENDING",
            city:"PENDING",
            province:"PENDING",
            country:"PENDING",
            postalCode:"PENDING"
        }
    },
    careGiverPolicy:{
        careGiverId: 1,
        careGiverName: "John Doe",
        careGiverPhoneNumber: "+263777487599",
        patientId: 1,
        patientName: "Mary jane",
        patientPhoneNumber: "+263777487599",
        diseaseName: "Flu",
        patientCondition: "HIGH"
    },
}).map((claim, index) => ({
    ...claim,
    status: index === 1 || index === 4 ? "COMPLETE" : "PENDING"
}));


function Appointment() {

    const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false)
    const openAppointmentForm = () => setIsAppointmentFormOpen(true)
    const closeAppointmentForm = () => setIsAppointmentFormOpen(false)

    const [selectedClients, setSelectedClients] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const filteredClients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.caseRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.source.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectAll = () => {
        if (selectedClients.length === filteredClients.length) {
            setSelectedClients([])
        } else {
            setSelectedClients(filteredClients.map((client) => client.id))
        }
    }

    const handleSelectClient = (clientId: string) => {
        if (selectedClients.includes(clientId)) {
            setSelectedClients(selectedClients.filter((id) => id !== clientId))
        } else {
            setSelectedClients([...selectedClients, clientId])
        }
    }

    const handleCreateAppointment = async () => {
    }
    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Patient Appointments</h1>
                    <div className="flex items-center gap-2">
                        <PrimaryButton secondary={true} text={"Create"} onClick={openAppointmentForm}
                                       icon={<Plus className="h-4 w-4"/>}/>
                        <AppointmentForm isOpen={isAppointmentFormOpen} onClose={closeAppointmentForm} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Tabs defaultValue="upcoming">
                            <TabsList>
                                <TabsTrigger value="upcoming">
                                    Upcoming
                                    <Badge variant="secondary" className="ml-2">6</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="pending">
                                    Pending
                                    <Badge variant="secondary" className="ml-2">3</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="past">
                                    Past
                                    <Badge variant="secondary" className="ml-2">9</Badge>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search for clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[300px]"
                        />
                    </div>
                    <Button variant="outline">
                        Filters
                    </Button>
                </div>
                <div className="rounded-lg border bg-white">
                    <div className="px-3 py-3 border-b">
                        <div className="grid grid-cols-8 w-full text-sm font-medium text-gray-500">
                            <div>ID</div>
                            <div>Name</div>
                            <div>Patient Name</div>
                            <div>Date</div>
                            <div>Location</div>
                            <div>Status</div>
                            <div>Type</div>
                            <div>Description</div>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {appointmentResponses.slice(0,10).map((appointment, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="px-4 hover:no-underline">
                                    <div className="grid grid-cols-8 w-full text-sm">
                                        <div>{appointment.id}</div>
                                        <div>{appointment.appointmentName}</div>
                                        <div>{appointment.careGiverPolicy.patientName}</div>
                                        <div>{appointment.appDateTime}</div>
                                        <div>{appointment.address}</div>
                                        <div><CustomStatus type="active" text="Active"/></div>
                                        <div>
                                            <CustomStatus type="active" text="Active"/>
                                        </div>
                                        <div>{appointment.appDescription}</div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <h3 className="font-medium">Service Provider</h3>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <span>Name: {appointment.serviceProvider.providerName} </span>
                                                <span className="mx-2">|</span>
                                                <span>Practice Number: {appointment.serviceProvider.practiceNumber} </span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <h3 className="font-medium">Patient</h3>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <span> Name: {appointment.careGiverPolicy.patientName} </span>
                                                <span className="mx-2">|</span>
                                                <span>Disease: {appointment.careGiverPolicy.diseaseName} </span>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <h3 className="font-medium">Care Giver</h3>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <span>Name: {appointment.careGiverPolicy.careGiverName}</span>
                                                <span className="mx-2">|</span>
                                                <span>Contact: {appointment.careGiverPolicy.careGiverPhoneNumber} </span>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                        Previous
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            2
                        </Button>
                        <span>...</span>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            9
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            10
                        </Button>
                    </div>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </DashboardLayout>

    )
}

export default Appointment



