import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {patients} from "@/lib/data";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "@/components/ui/button";
import PrimaryButton from "@/components/buttons/customButton";
import {MoreHorizontal, Plus, Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {useCropContext} from "@/context/CropContext";
import CreateCrop from "@/othercomponents/crop/create-crop";
import {Crop} from "@/lib/types/crop";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function CropDataTableComponent() {

    const {crops, getAllCrops} = useCropContext();

    useEffect(() => {
        getAllCrops();
    }, [getAllCrops]);

    const [isCropFormOpen, setIsCropFormOpen] = useState(false)
    const openPolicyForm = () => setIsCropFormOpen(true)
    const closeCropForm = () => setIsCropFormOpen(false)

    const [selectedCrop, setSelectedCrop] = useState<Crop | undefined>(undefined);

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
        setSelectedCrop(crop)
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
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Crops</h2>
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
                <div className="rounded-md border card">

                    <DataTable className="prime-container" selectionMode='checkbox' selection={selectedCrops}
                               onSelectionChange={(e) => setSelectedCrops(e.value)} dataKey="id" value={crops} paginator
                               rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{minWidth: '50rem'}}>
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

                </div>

            </div>
        </DashboardLayout>
    )
}