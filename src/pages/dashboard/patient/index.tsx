import React, {useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {MoreHorizontal, Plus, Search} from 'lucide-react'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import DashboardLayout from "@/layouts/DashboardLayout";
import CustomStatus from "@/components/status/CustomStatus";
import {patients} from "@/lib/data";
import {useRouter} from "next/router";
import {Badge} from "@/components/ui/badge";
import {PolicyMember} from "@/lib/types";
import PrimaryButton from "@/components/buttons/customButton";
import PolicyForm from "@/components/form/PolicyForm";


const patientResponses: PolicyMember[] = Array(2).fill({
    id: 9,
    policyId: 2,
    policyNumber: "12345678",
    suffix: "00",
    memberType: "DEPENDENTY",
    firstName: "Kudzai",
    lastName: "Damba",
    phoneNumber: "+263777487599",
    email: "kd@gmail.com",
    dateOfBirth: "12 December 2000",
    productName: "Mukwa",
    fundName: "BONVIE USD",
    currency: "USD",
    enrolmentDate: "10 Aug 2024",
    enrolmentType: "AUTO"
})

function Patient() {

    const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false)
    const openPolicyForm = () => setIsPolicyFormOpen(true)
    const closePolicyForm = () => setIsPolicyFormOpen(false)

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

    const handleDelete = (clientId: string) => {
        // Handle delete logic here
        console.log(`Deleting client ${clientId}`)
    }
    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        <PrimaryButton secondary={true} text={"Add Patient"} onClick={openPolicyForm}
                                       icon={<Plus className="h-4 w-4"/>}/>
                        <PolicyForm isOpen={isPolicyFormOpen} onClose={closePolicyForm} />
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
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedClients.length === filteredClients.length}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Policy Number</TableHead>
                                    <TableHead>Member Type</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Enrolment Date</TableHead>
                                    <TableHead>Enrolment Type</TableHead>
                                    <TableHead>Policy Status</TableHead>
                                    <TableHead className="w-[70px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patientResponses.slice(0, 10).map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedClients.includes(String(client.id))}
                                                onCheckedChange={() => handleSelectClient(String(client.id))}
                                            />
                                        </TableCell>
                                        <TableCell className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                {/*<AvatarImage src={client.avatar} alt={"hk"}/>*/}
                                                <AvatarFallback>{client.firstName[0]}</AvatarFallback>
                                            </Avatar>
                                            <span
                                                className="font-medium">{client.firstName + " " + client.lastName}</span>
                                        </TableCell>
                                        <TableCell>{client.policyNumber}</TableCell>
                                        <TableCell>{client.memberType}</TableCell>
                                        <TableCell>{client.phoneNumber}</TableCell>
                                        <TableCell>{client.enrolmentDate}</TableCell>
                                        <TableCell>{client.enrolmentType}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <CustomStatus type="active" text="Active"/>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                    <span
                                                        onClick={() => router.push(`/dashboard/patient/${'adsfljkl'}`)}> View Details</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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

export default Patient