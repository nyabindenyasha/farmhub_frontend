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
import {usePesticideContext} from "@/context/PesticideContext";
import CreateChemical from "@/othercomponents/chemical/create-chemical";
import {DataTable, DataTableRowToggleEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {CropProgram} from "@/lib/types/crop-program";
import {Pesticide} from "@/lib/types/pesticide";
import {CropVariety} from "@/lib/types/crop-variety";

// const pesticideData: Pesticide[] = usePesticideContext().getAllPesticides();

export default function PesticideComponent() {

    const {pesticides, getAllPesticides} = usePesticideContext();

    useEffect(() => {
        getAllPesticides();
    }, [getAllPesticides]);

    const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false)
    const openPolicyForm = () => setIsPolicyFormOpen(true)
    const closePolicyForm = () => setIsPolicyFormOpen(false)

    const [selectedChemicals, setSelectedChemicals] = useState<Pesticide[]>([])
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

    const activeIngredientsTemplate = (rowData: Pesticide) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.activeIngredients.join(", ")}</span>
            </div>
        );
    };

    const safetyIntervalBodyTemplate = (rowData: Pesticide) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.safetyInterval} Days</span>
            </div>
        );
    };

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
                    <h2 className="text-3xl font-bold tracking-tight pl-2">Chemicals</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        <PrimaryButton secondary={true} text={"Add Pesticide"} onClick={openPolicyForm}
                                       icon={<Plus className="h-4 w-4"/>}/>
                        <CreateChemical isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
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
                    {/*            /!*<TableHead>Alias</TableHead>*!/*/}
                    {/*            <TableHead>Chemical Type</TableHead>*/}
                    {/*            <TableHead>Active Ingredients</TableHead>*/}
                    {/*            <TableHead>Application Rate</TableHead>*/}
                    {/*            <TableHead>Withdrawal Period</TableHead>*/}

                    {/*        </TableRow>*/}
                    {/*    </TableHeader>*/}
                    {/*    <TableBody>*/}
                    {/*        {pesticides.slice(0, 10).map((chemical) => (*/}
                    {/*            <TableRow key={chemical.id}>*/}
                    {/*                <TableCell>*/}
                    {/*                    <Checkbox*/}
                    {/*                        checked={selectedClients.includes(String(chemical.id))}*/}
                    {/*                        onCheckedChange={() => handleSelectClient(String(chemical.id))}*/}
                    {/*                    />*/}
                    {/*                </TableCell>*/}
                    {/*                <TableCell>{chemical.name}</TableCell>*/}
                    {/*                /!*<TableCell>{chemical.alias}</TableCell>*!/*/}
                    {/*                <TableCell>{chemical.pesticideType}</TableCell>*/}
                    {/*                <TableCell>{chemical.activeIngredients.join(", ")}</TableCell>*/}
                    {/*                <TableCell>{chemical.applicationRate}</TableCell>*/}
                    {/*                <TableCell>{chemical.safetyInterval} Days</TableCell>*/}

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


                    <DataTable className="prime-container" selectionMode='checkbox' selection={selectedChemicals}
                               onSelectionChange={(e) => setSelectedChemicals(e.value)} dataKey="id"
                               value={pesticides} paginator
                               rows={10} rowsPerPageOptions={[5, 10, 25, 50]} size='small'
                               tableStyle={{minWidth: '50rem'}}>
                        <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="pesticideType" header="Chemical Type"></Column>

                        <Column field="activeIngredients" header="Active Ingredients" body={activeIngredientsTemplate}></Column>

                        <Column field="applicationRate" header="Application Rate"></Column>

                        <Column field="safetyInterval" header="Withdrawal Period" body={safetyIntervalBodyTemplate}></Column>

                        <Column header="Actions" headerStyle={{width: '5rem', textAlign: 'center'}}
                                bodyStyle={{textAlign: 'center', overflow: 'visible'}}
                                body={(rowData) => actionBodyTemplate(rowData)}/>
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