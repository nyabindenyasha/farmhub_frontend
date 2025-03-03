"use client"

import React, {useEffect, useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import CropProgramDetails from "./crop-program-details"
import {useCropProgramContext} from "@/context/CropProgramContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import PrimaryButton from "@/components/buttons/customButton";
import {MoreHorizontal, Plus, Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {patients} from "@/lib/data";
import CreateCropProgram from "@/othercomponents/cropprogram/create-crop-program";

export default function CropProgramComponent() {

    const {cropPrograms, getAllCropPrograms} = useCropProgramContext();

    useEffect(() => {
        getAllCropPrograms();
    }, [getAllCropPrograms]);

    const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null)

    const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false)
    const openPolicyForm = () => setIsPolicyFormOpen(true)
    const closePolicyForm = () => setIsPolicyFormOpen(false)

    const [selectedClients, setSelectedClients] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState("")

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
                <div className="flex items-center justify-between h-1/6 bg-gradient-to-r from-green-600 to-green-800">
                    <h2 className="text-3xl font-bold tracking-tight pl-2">Crop Programs</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        <CreateCropProgram isFarmer={true} isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Tabs defaultValue="upcoming">
                            <TabsList>
                                <TabsTrigger value="upcoming">
                                    System
                                    <Badge variant="secondary" className="ml-2">6</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="pending">
                                    Done By Me
                                    <Badge variant="secondary" className="ml-2">3</Badge>
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
                                <TableHead>ID</TableHead>
                                <TableHead>Crop Name</TableHead>
                                <TableHead>Program Name</TableHead>
                                <TableHead>Program Source</TableHead>
                                <TableHead>Program Type</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cropPrograms.map((program) => (
                                <TableRow key={program.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedClients.includes(String(program.id))}
                                            onCheckedChange={() => handleSelectClient(String(program.id))}
                                        />
                                    </TableCell>
                                    <TableCell>{program.id}</TableCell>
                                    <TableCell>{program.crop.name}</TableCell>
                                    <TableCell>{program.name}</TableCell>
                                    <TableCell>{program.source}</TableCell>
                                    <TableCell>{program.cropScheduleType}</TableCell>

                                    {/*<TableCell>*/}
                                    {/*    <Button variant="outline" onClick={() => {*/}
                                    {/*        console.log("onClick: ", program.id);*/}
                                    {/*        setSelectedProgramId(program.id);*/}
                                    {/*    }}>*/}
                                    {/*        View Details*/}
                                    {/*    </Button>*/}
                                    {/*</TableCell>*/}


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
                                                        onClick={() => {
                                                            console.log("onClick: ", program.id);
                                                            setSelectedProgramId(program.id);
                                                        }}> View Details</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                                <DropdownMenuItem>Download Program</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {selectedProgramId &&
                        <CropProgramDetails programId={selectedProgramId} onClose={() => setSelectedProgramId(null)}/>}
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

