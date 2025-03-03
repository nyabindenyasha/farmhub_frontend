"use client"

import React, {useEffect, useState} from "react"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import CropBatchDetails from "./crop-batch-details"
import {useCropBatchContext} from "@/context/CropBatchContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import {MoreHorizontal, Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {patients} from "@/lib/data";
import CreateCropBatch from "@/farmercomponents/cropbatches/create-crop-batch";

// Sample data

export default function CropBatchComponent() {

    const {cropBatches, getAllCropBatches} = useCropBatchContext();

    useEffect(() => {
        getAllCropBatches();
    }, [getAllCropBatches]);

    const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null)

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
                    <h2 className="text-3xl font-bold tracking-tight pl-2">My Batches</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        {/*<PrimaryButton secondary={true} text={"Create Batch"} onClick={openPolicyForm}*/}
                        {/*               icon={<Plus className="h-4 w-4"/>}/>*/}
                        <CreateCropBatch isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
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
                                <TableHead>ID</TableHead>
                                <TableHead>Crop Name</TableHead>
                                <TableHead>Farmer</TableHead>
                                <TableHead>Program Name</TableHead>
                                <TableHead>Program Type</TableHead>
                                <TableHead>Transplant Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cropBatches.map((batch) => (
                                <TableRow key={batch.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedClients.includes(String(batch.id))}
                                            onCheckedChange={() => handleSelectClient(String(batch.id))}
                                        />
                                    </TableCell>
                                    <TableCell>{batch.id}</TableCell>
                                    <TableCell>{batch.crop.name}</TableCell>
                                    <TableCell>{`${batch.farmer.firstName} ${batch.farmer.lastName}`}</TableCell>
                                    <TableCell>{batch.cropSchedule.name}</TableCell>
                                    <TableCell>{batch.cropSchedule.cropScheduleType}</TableCell>
                                    <TableCell>{new Date(batch.dateOfTransplant).toLocaleDateString()}</TableCell>
                                    {/*<TableCell>{batch.dateOfTransplant.toLocaleDateString()}</TableCell>*/}

                                    {/*<TableCell>*/}
                                    {/*    <Button variant="outline" onClick={() => {*/}
                                    {/*        console.log("onClick: ", batch.id);*/}
                                    {/*        setSelectedBatchId(batch.id);*/}
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
                                                            console.log("onClick: ", batch.id);
                                                            setSelectedBatchId(batch.id);
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
                    {selectedBatchId &&
                        <CropBatchDetails batchId={selectedBatchId} onClose={() => setSelectedBatchId(null)}/>}
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


        // <div className="container mx-auto py-10">
        //     <Table>
        //         <TableHeader>
        //             <TableRow>
        //                 <TableHead className="w-[50px]">
        //                     <Checkbox
        //                         checked={selectedClients.length === filteredClients.length}
        //                         onCheckedChange={handleSelectAll}
        //                     />
        //                 </TableHead>
        //                 <TableHead>ID</TableHead>
        //                 <TableHead>Crop Name</TableHead>
        //                 <TableHead>Farmer</TableHead>
        //                 <TableHead>Transplant Date</TableHead>
        //                 <TableHead>Actions</TableHead>
        //             </TableRow>
        //         </TableHeader>
        //         <TableBody>
        //             {cropBatches.map((batch) => (
        //                 <TableRow key={batch.id}>
        //                     <TableCell>
        //                         <Checkbox
        //                             checked={selectedClients.includes(String(crop.id))}
        //                             onCheckedChange={() => handleSelectClient(String(crop.id))}
        //                         />
        //                     </TableCell>
        //                     <TableCell>{batch.id}</TableCell>
        //                     <TableCell>{batch.crop.name}</TableCell>
        //                     <TableCell>{`${batch.farmer.firstName} ${batch.farmer.lastName}`}</TableCell>
        //                     <TableCell>{batch.cropSchedule.name}</TableCell>
        //                     <TableCell>{new Date(batch.dateOfTransplant).toLocaleDateString()}</TableCell>
        //                     {/*<TableCell>{batch.dateOfTransplant.toLocaleDateString()}</TableCell>*/}
        //                     <TableCell>
        //                         <Button variant="outline" onClick={() => {
        //                             console.log("onClick: ", batch.id);
        //                             setSelectedBatchId(batch.id);
        //                         }}>
        //                             View Details
        //                         </Button>
        //                     </TableCell>
        //
        //
        //                     <TableCell>
        //                         <DropdownMenu>
        //                             <DropdownMenuTrigger asChild>
        //                                 <Button variant="ghost" size="icon">
        //                                     <MoreHorizontal className="h-4 w-4"/>
        //                                 </Button>
        //                             </DropdownMenuTrigger>
        //                             <DropdownMenuContent align="end">
        //                                 <DropdownMenuItem>
        //                                             <span
        //                                                 onClick={() => {
        //                                                     console.log("onClick: ", batch.id);
        //                                                     setSelectedBatchId(batch.id);
        //                                                 }}> View Details</span>
        //                                 </DropdownMenuItem>
        //                                 <DropdownMenuItem>Edit Record</DropdownMenuItem>
        //                                 <DropdownMenuItem>Download Program</DropdownMenuItem>
        //                             </DropdownMenuContent>
        //                         </DropdownMenu>
        //                     </TableCell>
        //
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        //     {selectedBatchId && <CropBatchDetails batchId={selectedBatchId} onClose={() => setSelectedBatchId(null)}/>}
        // </div>
    )
}

