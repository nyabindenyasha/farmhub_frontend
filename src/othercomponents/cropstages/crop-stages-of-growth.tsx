import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import CreateCropStagesOfGrowth from "@/othercomponents/cropstages/create-crop-stages-of-growth";
import {useCropStagesOfGrowthContext} from "@/context/CropStagesOfGrowthContext";
import {DataTable, DataTableExpandedRows, DataTableRowToggleEvent} from "primereact/datatable";
import {Column} from "primereact/column";
import {CropStagesOfGrowth} from "@/lib/types/crop-stages-of-growth";
import {Tag} from "primereact/tag";
import {calculateCustomerTotal, getSeverity} from "@/othercomponents/cropstages/crop-stages-data-table-utils";

export default function CropStagesOfGrowthComponent() {

    const {cropStagesOfGrowths, getAllCropStagesOfGrowths} = useCropStagesOfGrowthContext();

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | CropStagesOfGrowth[]>([]);


    const [isPolicyFormOpen, setIsPolicyFormOpen] = useState(false)
    const openPolicyForm = () => setIsPolicyFormOpen(true)
    const closePolicyForm = () => {
        console.log("form closed")
         getAllCropStagesOfGrowths();
        setIsPolicyFormOpen(false)
    }

    useEffect(() => {
        getAllCropStagesOfGrowths();
    }, [getAllCropStagesOfGrowths]);

    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

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
                        Total Rows: {calculateCustomerTotal(cropStagesOfGrowths, data.crop.name)}</div>
                </td>
            </React.Fragment>
        );
    };

    const startDateBodyTemplate = (rowData: CropStagesOfGrowth) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.stageStartDate.periodValue}</span>
                <span>{rowData.stageStartDate.periodUnit}</span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData: CropStagesOfGrowth) => {
        return <Tag value={rowData.stageOfGrowth} severity={getSeverity(rowData.stageOfGrowth)}/>;
    };

    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between h-1/6 bg-gradient-to-r from-green-600 to-green-800">
                    <h2 className="text-3xl font-bold tracking-tight pl-2">Crops stages</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
                        <CreateCropStagesOfGrowth isOpen={isPolicyFormOpen} onClose={closePolicyForm}/>
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
                {/*                <TableHead>Stage</TableHead>*/}
                {/*                <TableHead>Stage Start Date</TableHead>*/}
                {/*                <TableHead>Stage End Date</TableHead>*/}
                {/*                <TableHead>Actions</TableHead>*/}
                {/*            </TableRow>*/}
                {/*        </TableHeader>*/}
                {/*        <TableBody>*/}
                {/*            {cropStagesOfGrowths.slice(0, 10).map((cropStageOfGrowth) => (*/}
                {/*                <TableRow key={cropStageOfGrowth.id}>*/}
                {/*                    <TableCell>*/}
                {/*                        <Checkbox*/}
                {/*                            checked={selectedClients.includes(String(cropStageOfGrowth.id))}*/}
                {/*                            onCheckedChange={() => handleSelectClient(String(cropStageOfGrowth.id))}*/}
                {/*                        />*/}
                {/*                    </TableCell>*/}
                {/*                    <TableCell>{cropStageOfGrowth.crop.name}</TableCell>*/}
                {/*                    <TableCell>{cropStageOfGrowth.stageOfGrowth}</TableCell>*/}
                {/*                    <TableCell>{cropStageOfGrowth.stageStartDate.periodValue} {cropStageOfGrowth.stageStartDate.periodUnit}</TableCell>*/}
                {/*                    <TableCell>{cropStageOfGrowth.stageEndDate.periodValue} {cropStageOfGrowth.stageEndDate.periodUnit}</TableCell>*/}
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
                {/*                                        onClick={() => {*/}
                {/*                                        }}> View Details</span>*/}
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
                    <DataTable value={cropStagesOfGrowths} stripedRows rowGroupMode="subheader" groupRowsBy="crop.name"
                               sortMode="single" sortField="crop.name" sortOrder={1}
                               expandableRowGroups expandedRows={expandedRows}
                               onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
                               rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}
                               size='small'
                               tableStyle={{minWidth: '50rem'}}>
                        <Column field="id" header="Id" style={{width: '20%'}}></Column>
                        <Column field="stageStartDate" header="Stage Period" body={startDateBodyTemplate}
                                style={{width: '20%'}}></Column>
                        {/*<Column field="company" header="Company" style={{width: '20%'}}></Column>*/}
                        <Column field="stageOfGrowth" header="Stage Of Growth" body={statusBodyTemplate}
                                style={{width: '20%'}}></Column>
                        {/*<Column field="date" header="Date" style={{width: '20%'}}></Column>*/}
                    </DataTable>
                </div>

            </div>
        </DashboardLayout>
    )
}