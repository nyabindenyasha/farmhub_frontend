import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {patients} from "@/lib/data";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useCropProgramContext} from "@/context/CropProgramContext";
import CreateCropProgram from "@/othercomponents/cropprogram/create-crop-program";
import CropProgramDetails from "@/farmercomponents/cropprogram/crop-program-details";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Crop} from "@/lib/types/crop";
import {CropProgram} from "@/lib/types/crop-program";

// const cropProgramData: CropProgram[] = useCropProgramContext().getAllCropPrograms();

export default function CropProgramComponent() {

    const {cropPrograms, getAllCropPrograms} = useCropProgramContext();

    useEffect(() => {
        getAllCropPrograms();
    }, [getAllCropPrograms]);

    const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false)
    const openPolicyForm = () => setIsPolicyFormOpen(true)
    const closePolicyForm = () => setIsPolicyFormOpen(false)

    const [selectedPrograms, setSelectedPrograms] = useState<CropProgram[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const [selectedProgram, setSelectedProgram] = useState<CropProgram | null>(null)

    const filteredClients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.caseRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.source.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (clientId: string) => {
        // Handle delete logic here
        console.log(`Deleting client ${clientId}`)
    }

    const actionBodyTemplate = (cropProgram: CropProgram) => {
        console.log("cropProgram: ", cropProgram);
        return <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <span
                        onClick={() => {
                            console.log("onClick: ", cropProgram.id);
                            setSelectedProgram(cropProgram);
                        }}> View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                <DropdownMenuItem>Download Program</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>;
    };

    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between h-1/6 bg-gradient-to-r from-green-600 to-green-800">
                    <h2 className="text-3xl font-bold tracking-tight pl-2">CropPrograms</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        {/*<PrimaryButton secondary={true} text={"Add CropProgram"} onClick={openPolicyForm}*/}
                        {/*               icon={<Plus className="h-4 w-4"/>}/>*/}
                        <CreateCropProgram isFarmer={false} isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
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
                    {/*<Table>*/}
                    {/*    <TableHeader>*/}
                    {/*        <TableRow>*/}
                    {/*            <TableHead className="w-[50px]">*/}
                    {/*                <Checkbox*/}
                    {/*                    checked={selectedClients.length === filteredClients.length}*/}
                    {/*                    onCheckedChange={handleSelectAll}*/}
                    {/*                />*/}
                    {/*            </TableHead>*/}
                    {/*            <TableHead>ID</TableHead>*/}
                    {/*            <TableHead>Crop Name</TableHead>*/}
                    {/*            <TableHead>Program Name</TableHead>*/}
                    {/*            <TableHead>Program Source</TableHead>*/}
                    {/*            <TableHead>Program Type</TableHead>*/}
                    {/*            <TableHead>Actions</TableHead>*/}
                    {/*        </TableRow>*/}
                    {/*    </TableHeader>*/}
                    {/*    <TableBody>*/}
                    {/*        {cropPrograms.map((program) => (*/}
                    {/*            <TableRow key={program.id}>*/}
                    {/*                <TableCell>*/}
                    {/*                    <Checkbox*/}
                    {/*                        checked={selectedClients.includes(String(program.id))}*/}
                    {/*                        onCheckedChange={() => handleSelectClient(String(program.id))}*/}
                    {/*                    />*/}
                    {/*                </TableCell>*/}
                    {/*                <TableCell>{program.id}</TableCell>*/}
                    {/*                <TableCell>{program.crop.name}</TableCell>*/}
                    {/*                <TableCell>{program.name}</TableCell>*/}
                    {/*                <TableCell>{program.source}</TableCell>*/}
                    {/*                <TableCell>{program.cropScheduleType}</TableCell>*/}
                    {/*                <TableCell>*/}
                    {/*                    <DropdownMenu>*/}
                    {/*                        <DropdownMenuTrigger asChild>*/}
                    {/*                            <Button variant="ghost" size="icon">*/}
                    {/*                                <MoreHorizontal className="h-4 w-4"/>*/}
                    {/*                            </Button>*/}
                    {/*                        </DropdownMenuTrigger>*/}
                    {/*                        <DropdownMenuContent align="end">*/}
                    {/*                            <DropdownMenuItem>*/}
                    {/*                                <span*/}
                    {/*                                    onClick={() => {*/}
                    {/*                                        console.log("onClick: ", program.id);*/}
                    {/*                                        setSelectedProgramId(program.id);*/}
                    {/*                                    }}> View Details</span>*/}
                    {/*                            </DropdownMenuItem>*/}
                    {/*                            <DropdownMenuItem>Edit Record</DropdownMenuItem>*/}
                    {/*                            <DropdownMenuItem>Download Program</DropdownMenuItem>*/}
                    {/*                        </DropdownMenuContent>*/}
                    {/*                    </DropdownMenu>*/}
                    {/*                </TableCell>*/}

                    {/*            </TableRow>*/}
                    {/*        ))}*/}
                    {/*    </TableBody>*/}
                    {/*</Table>*/}


                    <DataTable className="prime-container" selectionMode='checkbox' selection={selectedPrograms}
                               onSelectionChange={(e) => setSelectedPrograms(e.value)} dataKey="id" value={cropPrograms} paginator
                               rows={10} rowsPerPageOptions={[5, 10, 25, 50]} size='small' tableStyle={{minWidth: '50rem'}}>
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                        <Column field="crop.name" header="Crop Name"></Column>
                        <Column field="name" header="Program Name"></Column>
                        <Column field="source" header="Program Source"></Column>
                        <Column field="cropScheduleType" header="Program Type"></Column>
                        <Column header="Actions" headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                                body={(rowData) => actionBodyTemplate(rowData)}
                        />
                    </DataTable>


                    {selectedProgram &&
                        <CropProgramDetails programId={selectedProgram.id} onClose={() => setSelectedProgram(null)}/>}
                </div>

                {/*<div className="flex items-center justify-between">*/}
                {/*    <Button variant="outline" size="sm">*/}
                {/*        Previous*/}
                {/*    </Button>*/}
                {/*    <div className="flex items-center space-x-2">*/}
                {/*        <Button variant="outline" size="sm" className="h-8 w-8 p-0">*/}
                {/*            1*/}
                {/*        </Button>*/}
                {/*        <Button variant="outline" size="sm" className="h-8 w-8 p-0">*/}
                {/*            2*/}
                {/*        </Button>*/}
                {/*        <span>...</span>*/}
                {/*        <Button variant="outline" size="sm" className="h-8 w-8 p-0">*/}
                {/*            9*/}
                {/*        </Button>*/}
                {/*        <Button variant="outline" size="sm" className="h-8 w-8 p-0">*/}
                {/*            10*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*    <Button variant="outline" size="sm">*/}
                {/*        Next*/}
                {/*    </Button>*/}
                {/*</div>*/}

            </div>
        </DashboardLayout>
    )
}