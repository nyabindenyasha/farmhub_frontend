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
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useFertilizerContext} from "@/context/FertilizerContext";
import CreateFertilizer from "@/othercomponents/fertilizer/create-fertilizer";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Fertilizer} from "@/lib/types/fertilizer";
import {CropProgram} from "@/lib/types/crop-program";

// const fertilizerData: Fertilizer[] = useFertilizerContext().getAllFertilizers();

export default function FertilizerComponent() {

    const {fertilizers, getAllFertilizers} = useFertilizerContext();

    useEffect(() => {
        getAllFertilizers();
    }, [getAllFertilizers]);

    const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false)
    const openPolicyForm = () => setIsPolicyFormOpen(true)
    const closePolicyForm = () => setIsPolicyFormOpen(false)

    const [selectedFertilizers, setSelectedFertilizers] = useState<Fertilizer[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

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
                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                <DropdownMenuItem>Download Datasheet</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>;
    };

    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between h-1/6 bg-gradient-to-r from-green-600 to-green-800">
                    <h2 className="text-3xl font-bold tracking-tight pl-2">Fertilizers</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        <PrimaryButton secondary={true} text={"Add Fertilizer"} onClick={openPolicyForm}
                                       icon={<Plus className="h-4 w-4"/>}/>
                        <CreateFertilizer isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
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
                    {/*            <TableHead>Alias</TableHead>*/}
                    {/*            <TableHead>Composition</TableHead>*/}
                    {/*            <TableHead>Remarks</TableHead>*/}
                    {/*            <TableHead>Actions</TableHead>*/}
                    {/*        </TableRow>*/}
                    {/*    </TableHeader>*/}
                    {/*    <TableBody>*/}
                    {/*        {fertilizers.slice(0, 10).map((fertilizer) => (*/}
                    {/*            <TableRow key={fertilizer.id}>*/}
                    {/*                <TableCell>*/}
                    {/*                    <Checkbox*/}
                    {/*                        checked={selectedClients.includes(String(fertilizer.id))}*/}
                    {/*                        onCheckedChange={() => handleSelectClient(String(fertilizer.id))}*/}
                    {/*                    />*/}
                    {/*                </TableCell>*/}
                    {/*                <TableCell>{fertilizer.name}</TableCell>*/}
                    {/*                <TableCell>{fertilizer.alias}</TableCell>*/}
                    {/*                <TableCell>{fertilizer.composition}</TableCell>*/}
                    {/*                <TableCell>{fertilizer.remarks}</TableCell>*/}
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
                    {/*                                    onClick={() => router.push(`/dashboard/patient/${'adsfljkl'}`)}> View Details</span>*/}
                    {/*                            </DropdownMenuItem>*/}
                    {/*                            <DropdownMenuItem>Edit Record</DropdownMenuItem>*/}
                    {/*                            <DropdownMenuItem>Download Datasheet</DropdownMenuItem>*/}
                    {/*                        </DropdownMenuContent>*/}
                    {/*                    </DropdownMenu>*/}
                    {/*                </TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*        ))}*/}
                    {/*    </TableBody>*/}
                    {/*</Table>*/}

                    <DataTable className="prime-container" selectionMode='checkbox' selection={selectedFertilizers}
                               onSelectionChange={(e) => setSelectedFertilizers(e.value)} dataKey="id"
                               value={fertilizers} paginator
                               rows={10} rowsPerPageOptions={[5, 10, 25, 50]} size='small'
                               tableStyle={{minWidth: '50rem'}}>
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="alias" header="Alias"></Column>
                        <Column field="composition" header="Composition"></Column>
                        <Column field="remarks" header="Remarks"></Column>
                        <Column header="Actions" headerStyle={{width: '5rem', textAlign: 'center'}}
                                bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                                body={(rowData) => actionBodyTemplate(rowData)}
                        />
                    </DataTable>

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