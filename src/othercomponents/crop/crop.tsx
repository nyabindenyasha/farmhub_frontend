import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {patients} from "@/lib/data";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "@/components/ui/button";
import PrimaryButton from "@/components/buttons/customButton";
import {MoreHorizontal, Plus, Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useCropContext} from "@/context/CropContext";
import CreateCrop from "@/othercomponents/crop/create-crop";
import {Crop} from "@/lib/types/crop";
import CropGuideComponent from "@/othercomponents/cropguide/crop-guide-component";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export default function CropComponent() {

    const {crops, getAllCrops} = useCropContext();

    useEffect(() => {
        getAllCrops();
    }, [getAllCrops]);

    const [isCropFormOpen, setIsCropFormOpen] = useState(false)
    const openPolicyForm = () => setIsCropFormOpen(true)
    const closeCropForm = () => setIsCropFormOpen(false)


    const [createdCrop, setCreatedCrop] = useState<Crop | undefined>(undefined);

    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
    const [selectedCrops, setSelectedCrops] = useState<Crop[]>([]);


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

    const handleCropSelect = (crop: Crop | undefined) => {
        console.log("here: ", JSON.stringify(crop))
        setCreatedCrop(crop)
    }

    const actionBodyTemplate = (crop: Crop) => {
        console.log("crop: ", crop);
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
                            console.log("onClick: ", crop.id);
                            setSelectedCrop(crop);
                        }}> View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Record</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>;
    };

    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center h-1/6 justify-between bg-gradient-to-r from-green-600 to-green-800">
                    <h2 className="text-3xl font-bold tracking-tight pl-2">Crops</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        <PrimaryButton secondary={true} text={"Add Crop"} onClick={openPolicyForm}
                                       icon={<Plus className="h-4 w-4"/>}/>
                        <CreateCrop isOpen={isCropFormOpen} onClose={closeCropForm} onCropSelect={handleCropSelect}/>
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
                    {/*            <TableHead>Name</TableHead>*/}
                    {/*            <TableHead>Family</TableHead>*/}
                    {/*            <TableHead>Genus</TableHead>*/}
                    {/*            <TableHead>Species</TableHead>*/}
                    {/*            <TableHead>Sub Species</TableHead>*/}

                    {/*        </TableRow>*/}
                    {/*    </TableHeader>*/}
                    {/*    <TableBody>*/}
                    {/*        {crops.slice(0, 10).map((crop) => (*/}
                    {/*            <TableRow key={crop.id}>*/}
                    {/*                <TableCell>*/}
                    {/*                    <Checkbox*/}
                    {/*                        checked={selectedClients.includes(String(crop.id))}*/}
                    {/*                        onCheckedChange={() => handleSelectClient(String(crop.id))}*/}
                    {/*                    />*/}
                    {/*                </TableCell>*/}
                    {/*                <TableCell>{crop.name}</TableCell>*/}
                    {/*                <TableCell>{crop.family}</TableCell>*/}
                    {/*                <TableCell>{crop.genus}</TableCell>*/}
                    {/*                <TableCell>{crop.species}</TableCell>*/}
                    {/*                <TableCell>{crop.subSpecies}</TableCell>*/}
                    {/*                <TableCell>*/}
                    {/*                    <DropdownMenu>*/}
                    {/*                        <DropdownMenuTrigger asChild>*/}
                    {/*                            <Button variant="ghost" size="icon">*/}
                    {/*                                <MoreHorizontal className="h-4 w-4"/>*/}
                    {/*                            </Button>*/}
                    {/*                        </DropdownMenuTrigger>*/}
                    {/*                        <DropdownMenuContent align="end">*/}
                    {/*                            <DropdownMenuItem>*/}
                    {/*                        <span*/}
                    {/*                            onClick={() => {*/}
                    {/*                                console.log("onClick: ", crop.id);*/}
                    {/*                                setSelectedCrop(crop);*/}
                    {/*                            }}> View Details</span>*/}
                    {/*                            </DropdownMenuItem>*/}
                    {/*                            <DropdownMenuItem>Edit Record</DropdownMenuItem>*/}
                    {/*                        </DropdownMenuContent>*/}
                    {/*                    </DropdownMenu>*/}
                    {/*                </TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*        ))}*/}
                    {/*    </TableBody>*/}
                    {/*</Table>*/}

                    <DataTable className="prime-container" selectionMode='checkbox' selection={selectedCrops}
                               onSelectionChange={(e) => setSelectedCrops(e.value)} dataKey="id" value={crops} paginator
                               rows={10} rowsPerPageOptions={[5, 10, 25, 50]} size='small' tableStyle={{minWidth: '50rem'}}>
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="family" header="Family"></Column>
                        <Column field="genus" header="Genus"></Column>
                        <Column field="species" header="Species"></Column>
                        <Column field="subSpecies" header="Sub Species"></Column>
                        <Column header="Actions" headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                                body={(rowData) => actionBodyTemplate(rowData)}
                        />
                    </DataTable>

                    {selectedCrop &&
                        <CropGuideComponent cropId={selectedCrop?.id} onClose={() => setSelectedCrop(null)}/>}
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