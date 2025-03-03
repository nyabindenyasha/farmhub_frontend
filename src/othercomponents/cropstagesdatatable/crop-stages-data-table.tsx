import React, {useState} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {CropStagesOfGrowth} from "@/lib/types/crop-stages-of-growth";
import {StagesOfGrowth} from "@/lib/enums/stages-of-growth";
import {PeriodUnit} from "@/lib/enums/period-unit";
import {DataTable, DataTableExpandedRows, DataTableRowToggleEvent} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Tag} from 'primereact/tag';


const cropStages: CropStagesOfGrowth[] = [
    {
        id: 1,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 1,
            periodUnit: PeriodUnit.DAYS,
            periodValue: 1
        },
        stageEndDate: {
            id: 1,
            periodUnit: PeriodUnit.DAYS,
            periodValue: 1
        },
        stageOfGrowth: StagesOfGrowth.TRANSPLANTING
    },
    {
        id: 2,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 6,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 1
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 3,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 3,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 2
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 4,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 4,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 3
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 5,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 7,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 4
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 6,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 7,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 8,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 6
        },
        stageEndDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 8,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 9,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 7
        },
        stageEndDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 9,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 10,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 8
        },
        stageEndDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 10,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 11,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 9
        },
        stageEndDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 11,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 12,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 10
        },
        stageEndDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 12,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageEndDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 13,
        crop: {
            id: 1,
            name: "Cabbage",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageEndDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageOfGrowth: StagesOfGrowth.MATURITY
    },
    {
        id: 14,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 15,
            periodUnit: PeriodUnit.MINUTES,
            periodValue: 10
        },
        stageEndDate: {
            id: 15,
            periodUnit: PeriodUnit.MINUTES,
            periodValue: 10
        },
        stageOfGrowth: StagesOfGrowth.TRANSPLANTING
    },
    {
        id: 15,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 19,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 1
        },
        stageEndDate: {
            id: 18,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 16,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 16,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 2
        },
        stageEndDate: {
            id: 18,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 17,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 17,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 3
        },
        stageEndDate: {
            id: 18,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 18,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 20,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 4
        },
        stageEndDate: {
            id: 18,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 19,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 18,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 5
        },
        stageEndDate: {
            id: 18,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 20,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 21,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 6
        },
        stageEndDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 21,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 22,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 7
        },
        stageEndDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 22,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 23,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 8
        },
        stageEndDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 23,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 24,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 9
        },
        stageEndDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 24,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 25,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 10
        },
        stageEndDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 25,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageEndDate: {
            id: 26,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 11
        },
        stageOfGrowth: StagesOfGrowth.HEAD_FORMATION
    },
    {
        id: 26,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        stageStartDate: {
            id: 27,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 12
        },
        stageEndDate: {
            id: 27,
            periodUnit: PeriodUnit.HOURS,
            periodValue: 12
        },
        stageOfGrowth: StagesOfGrowth.MATURITY
    },
    {
        id: 27,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 1,
            periodUnit: PeriodUnit.DAYS,
            periodValue: 1
        },
        stageEndDate: {
            id: 1,
            periodUnit: PeriodUnit.DAYS,
            periodValue: 1
        },
        stageOfGrowth: StagesOfGrowth.TRANSPLANTING
    },
    {
        id: 28,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 6,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 1
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 29,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 3,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 2
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 30,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 4,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 3
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 31,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 7,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 4
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 32,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageEndDate: {
            id: 5,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 5
        },
        stageOfGrowth: StagesOfGrowth.VEGETATIVE_GROWTH
    },
    {
        id: 33,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 8,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 6
        },
        stageEndDate: {
            id: 9,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 7
        },
        stageOfGrowth: StagesOfGrowth.FLOWERING
    },
    {
        id: 34,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 9,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 7
        },
        stageEndDate: {
            id: 9,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 7
        },
        stageOfGrowth: StagesOfGrowth.FLOWERING
    },
    {
        id: 35,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 10,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 8
        },
        stageEndDate: {
            id: 10,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 8
        },
        stageOfGrowth: StagesOfGrowth.FRUIT_FORMATION
    },
    {
        id: 36,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 11,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 9
        },
        stageEndDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageOfGrowth: StagesOfGrowth.MATURITY
    },
    {
        id: 37,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 12,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 10
        },
        stageEndDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageOfGrowth: StagesOfGrowth.MATURITY
    },
    {
        id: 38,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 13,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 11
        },
        stageEndDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageOfGrowth: StagesOfGrowth.MATURITY
    },
    {
        id: 39,
        crop: {
            id: 3,
            name: "Cucumber",
            family: "Cucurbitaceae",
            genus: "Cucumis",
            species: "Cucumis sativus",
            subSpecies: ""
        },
        stageStartDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageEndDate: {
            id: 14,
            periodUnit: PeriodUnit.WEEKS,
            periodValue: 12
        },
        stageOfGrowth: StagesOfGrowth.MATURITY
    }
]

export default function CropStagesOfGrowthDataTableComponent() {

    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | CropStagesOfGrowth[]>([]);

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
                        Customers: {calculateCustomerTotal(data.crop.name)}</div>
                </td>
            </React.Fragment>
        );
    };

    const countryBodyTemplate = (rowData: CropStagesOfGrowth) => {
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

    const calculateCustomerTotal = (name: string) => {
        let total = 0;

        if (cropStages) {
            for (let customer of cropStages) {
                if (customer.crop.name === name) {
                    total++;
                }
            }
        }

        return total;
    };

    const getSeverity = (status: StagesOfGrowth) => {
        switch (status) {
            case StagesOfGrowth.MATURITY:
                return 'danger';

            case StagesOfGrowth.HEAD_FORMATION:
                return 'success';

            case StagesOfGrowth.VEGETATIVE_GROWTH:
                return 'info';

            case StagesOfGrowth.TRANSPLANTING:
                return 'warning';

            default:
                return 'secondary';
        }
    };

    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Crops stages</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Export</Button>
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
                            value=""
                            onChange={(e) => {
                            }}
                            className="w-[300px]"
                        />
                    </div>
                    <Button variant="outline">
                        Filters
                    </Button>
                </div>
                <div className="rounded-md border">


                    <div className="card">
                        <DataTable value={cropStages} rowGroupMode="subheader" groupRowsBy="crop.name"
                                   sortMode="single" sortField="crop.name" sortOrder={1}
                                   expandableRowGroups expandedRows={expandedRows}
                                   onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
                                   rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}
                                   tableStyle={{minWidth: '50rem'}}>
                            <Column field="id" header="Id" style={{width: '20%'}}></Column>
                            <Column field="stageStartDate" header="Stage Period" body={countryBodyTemplate}
                                    style={{width: '20%'}}></Column>
                            {/*<Column field="company" header="Company" style={{width: '20%'}}></Column>*/}
                            <Column field="stageOfGrowth" header="Stage Of Growth" body={statusBodyTemplate}
                                    style={{width: '20%'}}></Column>
                            {/*<Column field="date" header="Date" style={{width: '20%'}}></Column>*/}
                        </DataTable>
                    </div>

                    {/*<div className="card">*/}
                    {/*    <DataTable value={cropStages} rows={50} stripedRows rowGroupMode="subheader" groupRowsBy="crop.name"*/}
                    {/*               sortMode="single" sortField="crop.name"*/}
                    {/*               sortOrder={1} scrollable scrollHeight="400px" rowGroupHeaderTemplate={headerTemplate}*/}
                    {/*               rowGroupFooterTemplate={footerTemplate} tableStyle={{minWidth: '50rem'}}>*/}
                    {/*        <Column field="id" header="Id" style={{width: '20%'}}></Column>*/}
                    {/*        <Column field="stageStartDate" header="Stage Period" body={countryBodyTemplate}*/}
                    {/*                style={{width: '20%'}}></Column>*/}
                    {/*        /!*<Column field="company" header="Company" style={{ minWidth: '200px' }}></Column>*!/*/}
                    {/*        <Column field="stageOfGrowth" header="Stage Of Growth" body={statusBodyTemplate}*/}
                    {/*                style={{width: '20%'}}></Column>*/}
                    {/*        /!*<Column field="date" header="Date" style={{ minWidth: '200px' }}></Column>*!/*/}
                    {/*    </DataTable>*/}
                    {/*</div>*/}


                </div>

            </div>
        </DashboardLayout>
    )
}