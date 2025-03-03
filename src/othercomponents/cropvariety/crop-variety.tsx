import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {patients} from "@/lib/data";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {useCropVarietyContext} from "@/context/CropVarietyContext";
import CreateCropVariety from "@/othercomponents/cropvariety/create-crop-variety";
import {DataTable, DataTableExpandedRows, DataTableRowToggleEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {CropStagesOfGrowth} from "@/lib/types/crop-stages-of-growth";
import {CropVariety} from "@/lib/types/crop-variety";
import {calculateTotal} from "@/othercomponents/cropvariety/crop-variety-data-table-utils";

export default function CropVarietyComponent() {

    const {cropVarieties, getAllCropVarieties} = useCropVarietyContext();

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | CropStagesOfGrowth[]>([]);

    useEffect(() => {
        getAllCropVarieties();
    }, [getAllCropVarieties]);

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

    const headerTemplate = (data: CropStagesOfGrowth) => {
        return (
            <React.Fragment>
                <span className="vertical-align-middle ml-2 font-bold line-height-3">{data.crop.name}</span>
            </React.Fragment>
        );
    };

    const footerTemplate = (data: CropStagesOfGrowth) => {
        return (
            <React.Fragment>
                <td colSpan={5}>
                    <div className="flex justify-content-end font-bold w-full">Total
                        Total Rows: {calculateTotal(cropVarieties, data.crop.name)}</div>
                </td>
            </React.Fragment>
        );
    };

    const startDateBodyTemplate = (rowData: CropVariety) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.maturityStartDay}</span>
                <span>Days</span>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between h-1/6 bg-gradient-to-r from-green-600 to-green-800">
                    <h2 className="text-3xl font-bold tracking-tight pl-2">Crop Varieties</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        {/*<PrimaryButton secondary={true} text={"Add CropVariety"} onClick={openPolicyForm}*/}
                        {/*               icon={<Plus className="h-4 w-4"/>}/>*/}
                        <CreateCropVariety isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
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
                {/*<div className="rounded-md border">*/}
                {/*    <Table>*/}
                {/*        <TableHeader>*/}
                {/*            <TableRow>*/}
                {/*                <TableHead className="w-[50px]">*/}
                {/*                    <Checkbox*/}
                {/*                        checked={selectedClients.length === filteredClients.length}*/}
                {/*                        onCheckedChange={handleSelectAll}*/}
                {/*                    />*/}
                {/*                </TableHead>*/}
                {/*                <TableHead>Crop Name</TableHead>*/}
                {/*                <TableHead>Variety </TableHead>*/}
                {/*                <TableHead>Maturity</TableHead>*/}
                {/*                <TableHead>Harvest Duration</TableHead>*/}
                {/*                <TableHead>Comments</TableHead>*/}

                {/*            </TableRow>*/}
                {/*        </TableHeader>*/}
                {/*        <TableBody>*/}
                {/*            {cropVarieties.slice(0, 10).map((cropVariety) => (*/}
                {/*                <TableRow key={cropVariety.id}>*/}
                {/*                    <TableCell>*/}
                {/*                        <Checkbox*/}
                {/*                            checked={selectedClients.includes(String(cropVariety.id))}*/}
                {/*                            onCheckedChange={() => handleSelectClient(String(cropVariety.id))}*/}
                {/*                        />*/}
                {/*                    </TableCell>*/}
                {/*                    <TableCell>{cropVariety.crop.name}</TableCell>*/}
                {/*                    <TableCell>{cropVariety.variety}</TableCell>*/}
                {/*                    <TableCell>{cropVariety.maturityStartDay}-{cropVariety.maturityStartDay} Days</TableCell>*/}
                {/*                    <TableCell>{cropVariety.harvestDuration} Days</TableCell>*/}
                {/*                    <TableCell>{cropVariety.remarks}</TableCell>*/}
                {/*                    <TableCell>*/}
                {/*                        <DropdownMenu>*/}
                {/*                            <DropdownMenuTrigger asChild>*/}
                {/*                                <Button variant="ghost" size="icon">*/}
                {/*                                    <MoreHorizontal className="h-4 w-4"/>*/}
                {/*                                </Button>*/}
                {/*                            </DropdownMenuTrigger>*/}
                {/*                            <DropdownMenuContent align="end">*/}
                {/*                                <DropdownMenuItem>*/}
                {/*                                    <span*/}
                {/*                                        onClick={() => router.push(`/dashboard/patient/${'adsfljkl'}`)}> View Details</span>*/}
                {/*                                </DropdownMenuItem>*/}
                {/*                                <DropdownMenuItem>Edit Record</DropdownMenuItem>*/}
                {/*                            </DropdownMenuContent>*/}
                {/*                        </DropdownMenu>*/}
                {/*                    </TableCell>*/}
                {/*                </TableRow>*/}
                {/*            ))}*/}
                {/*        </TableBody>*/}
                {/*    </Table>*/}
                {/*</div>*/}

                <div className="rounded-md border card">
                    <DataTable value={cropVarieties} stripedRows rowGroupMode="subheader" groupRowsBy="crop.name"
                               sortMode="single" sortField="crop.name" sortOrder={1}
                               expandableRowGroups expandedRows={expandedRows}
                               onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
                               rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}
                               size='small'
                               tableStyle={{minWidth: '50rem'}}>
                        <Column field="variety" header="Variety" style={{width: '20%'}}></Column>

                        {/*<Column field="maturityStartDay" header="Maturity Start Day" body={startDateBodyTemplate}*/}
                        {/*        style={{width: '20%'}}></Column>*/}

                        <Column field="maturityStartDay" header="Maturity Start" style={{width: '20%'}}></Column>
                        <Column field="maturityEndDay" header="Maturity End" style={{width: '20%'}}></Column>
                        <Column field="varietyType" header="Variety Type" style={{width: '20%'}}></Column>
                        <Column field="harvestDuration" header="Harvest Duration" style={{width: '20%'}}></Column>
                        <Column field="remarks" header="Comments" style={{width: '20%'}}></Column>
                    </DataTable>
                </div>

            </div>
        </DashboardLayout>
    )
}