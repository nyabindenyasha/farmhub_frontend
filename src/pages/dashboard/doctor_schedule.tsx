import React, {useState} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {ChevronRight, Download, Plus, Search} from 'lucide-react'
import {Input} from "@/components/ui/input";
import {useRouter} from "next/router";
import {patients} from "@/lib/data";
import {AppointmentResponse} from "@/lib/types";


interface Event {
    date: string
    time: string
    name: string
    email: string
    scheduleType: string
    location: string
    hostCount: number
    nonHostCount: number
}

const events: Event[] = [
    {
        date: "Today",
        time: "09:00 - 09:30",
        name: "Rosemarie Smitham",
        email: "rosemarie21@gmail.com",
        scheduleType: "New Inquiry Discussions",
        location: "Cansaas Studio",
        hostCount: 1,
        nonHostCount: 2
    },
    {
        date: "Today",
        time: "10:00 - 10:30",
        name: "James Lockman",
        email: "jamesloc@gmail.com",
        scheduleType: "Refining User Interface Elements",
        location: "",
        hostCount: 1,
        nonHostCount: 2
    },
    {
        date: "Tomorrow",
        time: "13:00 - 14:30",
        name: "Wilson Kovacek",
        email: "wilsonkov@gmail.com",
        scheduleType: "Ensuring Alignment with Client Vision",
        location: "",
        hostCount: 1,
        nonHostCount: 2
    }
]

const appointmentResponses: AppointmentResponse[] = Array(12).fill({
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
})


function DoctorSchedules() {
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
    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Doctors Schedule</h1>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4"/>
                                Export
                            </Button>
                        </div>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4"/>
                            Create
                        </Button>
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
                <Card>
                    <div className="max-h-[calc(100vh-300px)] overflow-y-auto">

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Schedule Type</TableHead>
                                    <TableHead>Schedule Status</TableHead>
                                    <TableHead className="w-[100px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointmentResponses.slice(0,10).map((appointment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <input type="checkbox" className="rounded border-gray-300"/>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{appointment.appDateTime}</div>
                                            <div
                                                className="text-sm text-muted-foreground">{appointment.appDateTime}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{appointment.appointmentName}</div>
                                            <div
                                                className="text-sm text-muted-foreground">{appointment.serviceProvider.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            {appointment.address && (
                                                <div className="font-medium">{appointment.address}</div>
                                            )}
                                            <div
                                                className={appointment.address ? "text-sm text-muted-foreground" : "font-medium"}>
                                                {appointment.appointmentType}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{appointment.appointmentStatus} Host</div>
                                            <div className="text-sm text-muted-foreground">
                                                {/*{event.nonHostCount} non-hosts*/}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" className="gap-2">
                                                Details
                                                <ChevronRight className="h-4 w-4"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
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

export default DoctorSchedules




