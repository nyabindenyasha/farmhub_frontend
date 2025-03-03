import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {CropBatchRequest} from "@/farmercomponents/cropbatches/create-crop-batch";
import {PesticideType} from "@/lib/enums/pesticide-type";
import {PesticideModeOfAction} from "@/lib/enums/pesticide-mode-of-action";
import {CropScheduleType} from "@/lib/enums/crop-schedule-type";
import {PeriodUnit} from "@/lib/enums/period-unit";
import {PesticideApplicationMethod} from "@/lib/enums/pesticide-application-method";
import {useState} from "react"
import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"

export function CropBatchSummaryV2() {

    const [expandedSections, setExpandedSections] = useState({
        details: true,
        fertilizer: false,
        pesticide: false,
    })

    const cropBatch: CropBatchRequest = {
        farmerId: 2,
        cropProgramId: 1,
        dateOfTransplant: "2025-02-07T12:47:07.869Z",
        location: "string",
        remarks: "Test"
    }

    const cropProgram: any = {
        id: 2,
        crop: {
            id: 2,
            name: "Cebbege_test",
            family: "Cruciferacease",
            genus: "Brassica",
            species: "Oleracea",
            subSpecies: "Capitate"
        },
        name: "Cebbege_test_default",
        description: "Cebbege_test_default",
        source: "system",
        remarks: "",
        cropScheduleType: CropScheduleType.PRIMARY,
       pesticideScheduleList: [
            {
               id: 30,
                pesticide: {
                   id: 1,
                    name: "Lambda",
                    alias: "Lambda",
                    activeIngredients: [
                        "Lambda"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: []
                },
                stageOfGrowth: {
                   id: 15,
                    periodUnit: PeriodUnit.MINUTES,
                    periodValue: 10
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 31,
                pesticide: {
                   id: 10,
                    name: "Metolachlor",
                    alias: "Metolachlor",
                    activeIngredients: [
                        "Metolachlor"
                    ],
                    applicationRate: "120ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.HERBICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "Weeds"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 15,
                    periodUnit: PeriodUnit.MINUTES,
                    periodValue: 10
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 32,
                pesticide: {
                   id: 2,
                    name: "Dichlorvos",
                    alias: "Dichlorvos",
                    activeIngredients: [
                        "Dichlorvos"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: "pesticide",
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 19,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 1
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 33,
                pesticide: {
                   id: 3,
                    name: "Muroti",
                    alias: "Muroti",
                    activeIngredients: [
                        "Muroti"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 16,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 2
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 34,
                pesticide: {
                   id: 6,
                    name: "Chlorothalonil",
                    alias: "Chlorothalonil",
                    activeIngredients: [
                        "Chlorothalonil"
                    ],
                    applicationRate: "32ml",
                    safetyInterval: 14,
                    pesticideType: PesticideType.FUNGICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [],
                    targetDiseases: [
                        "Fungal infections"
                    ],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 16,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 2
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 35,
                pesticide: {
                   id: 4,
                    name: "Belt",
                    alias: "Belt",
                    activeIngredients: [
                        "Belt"
                    ],
                    applicationRate: "4ml",
                    safetyInterval: 7,
                    pesticideType: "pesticide",
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 17,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 3
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 36,
                pesticide: {
                   id: 7,
                    name: "Antracol",
                    alias: "Antracol",
                    activeIngredients: [
                        "Antracol"
                    ],
                    applicationRate: "32g",
                    safetyInterval: 14,
                    pesticideType: PesticideType.FUNGICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [],
                    targetDiseases: [
                        "Fungal infections"
                    ],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 17,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 3
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 37,
                pesticide: {
                   id: 5,
                    name: "Carbaryl",
                    alias: "Carbaryl",
                    activeIngredients: [
                        "Carbaryl"
                    ],
                    applicationRate: "50g",
                    safetyInterval: 7,
                    pesticideType: "pesticide",
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 20,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 4
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 38,
                pesticide: {
                   id: 8,
                    name: "Acomil",
                    alias: "Acomil",
                    activeIngredients: [
                        "Acomil"
                    ],
                    applicationRate: "50g",
                    safetyInterval: 14,
                    pesticideType: PesticideType.FUNGICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [],
                    targetDiseases: [
                        "Fungal infections"
                    ],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 20,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 4
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 39,
                pesticide: {
                   id: 11,
                    name: "Fluazifop",
                    alias: "Fluazifop",
                    activeIngredients: [
                        "Fluazifop"
                    ],
                    applicationRate: "80ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.HERBICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "Grassy weeds"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 20,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 4
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 40,
                pesticide: {
                   id: 2,
                    name: "Dichlorvos",
                    alias: "Dichlorvos",
                    activeIngredients: [
                        "Dichlorvos"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 18,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 5
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 41,
                pesticide: {
                   id: 9,
                    name: "Tebuconazole",
                    alias: "Tebuconazole",
                    activeIngredients: [
                        "Tebuconazole"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 14,
                    pesticideType: PesticideType.FUNGICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [],
                    targetDiseases: [
                        "Fungal infections"
                    ],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 18,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 5
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 42,
                pesticide: {
                   id: 3,
                    name: "Muroti",
                    alias: "Muroti",
                    activeIngredients: [
                        "Muroti"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 21,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 6
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 43,
                pesticide: {
                   id: 4,
                    name: "Belt",
                    alias: "Belt",
                    activeIngredients: [
                        "Belt"
                    ],
                    applicationRate: "4ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 22,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 7
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 44,
                pesticide: {
                   id: 6,
                    name: "Chlorothalonil",
                    alias: "Chlorothalonil",
                    activeIngredients: [
                        "Chlorothalonil"
                    ],
                    applicationRate: "32ml",
                    safetyInterval: 14,
                    pesticideType: PesticideType.FUNGICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [],
                    targetDiseases: [
                        "Fungal infections"
                    ],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 22,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 7
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 45,
                pesticide: {
                   id: 5,
                    name: "Carbaryl",
                    alias: "Carbaryl",
                    activeIngredients: [
                        "Carbaryl"
                    ],
                    applicationRate: "50g",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 23,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 8
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 46,
                pesticide: {
                   id: 2,
                    name: "Dichlorvos",
                    alias: "Dichlorvos",
                    activeIngredients: [
                        "Dichlorvos"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 24,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 9
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 47,
                pesticide: {
                   id: 7,
                    name: "Antracol",
                    alias: "Antracol",
                    activeIngredients: [
                        "Antracol"
                    ],
                    applicationRate: "32g",
                    safetyInterval: 14,
                    pesticideType: PesticideType.FUNGICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [],
                    targetDiseases: [
                        "Fungal infections"
                    ],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 24,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 9
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 48,
                pesticide: {
                   id: 3,
                    name: "Muroti",
                    alias: "Muroti",
                    activeIngredients: [
                        "Muroti"
                    ],
                    applicationRate: "16ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 25,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 10
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 49,
                pesticide: {
                   id: 4,
                    name: "Belt",
                    alias: "Belt",
                    activeIngredients: [
                        "Belt"
                    ],
                    applicationRate: "4ml",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 26,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 11
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            },
            {
               id: 50,
                pesticide: {
                   id: 5,
                    name: "Carbaryl",
                    alias: "Carbaryl",
                    activeIngredients: [
                        "Carbaryl"
                    ],
                    applicationRate: "50g",
                    safetyInterval: 7,
                    pesticideType: PesticideType.PESTICIDE,
                    modeOfAction: PesticideModeOfAction.PREVENTATIVE,
                    targetPests: [
                        "General pests"
                    ],
                    targetDiseases: [],
                    alternatives: null
                },
                stageOfGrowth: {
                   id: 27,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 12
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                applicationMethod: PesticideApplicationMethod.SPRAYING,
                remarks: "string"
            }
        ],
        "fertilizerScheduleList": [
            {
               id: 26,
                "fertilizer": {
                   id: 1,
                    name: "Compound C",
                    alias: "C",
                    composition: "5:15:12",
                    remarks: "Basal"
                },
                stageOfGrowth: {
                   id: 15,
                    periodUnit: PeriodUnit.MINUTES,
                    periodValue: 10
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                rate: 30,
                applicationMethod: "SPOT_PLACEMENT",
                remarks: "Basal"
            },
            {
               id: 27,
                "fertilizer": {
                   id: 2,
                    name: "Ammonium Nitrate",
                    alias: "AN",
                    composition: "34.5%N",
                    remarks: "top dressing"
                },
                stageOfGrowth: {
                   id: 16,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 2
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                rate: 5,
                applicationMethod: "SPOT_PLACEMENT",
                remarks: "Top dressing"
            },
            {
               id: 28,
                "fertilizer": {
                   id: 2,
                    name: "Ammonium Nitrate",
                    alias: "AN",
                    composition: "34.5%N",
                    remarks: "top dressing"
                },
                stageOfGrowth: {
                   id: 17,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 3
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                rate: 5,
                applicationMethod: "SPOT_PLACEMENT",
                remarks: "Top dressing"
            },
            {
               id: 29,
                "fertilizer": {
                   id: 2,
                    name: "Ammonium Nitrate",
                    alias: "AN",
                    composition: "34.5%N",
                    remarks: "top dressing"
                },
                stageOfGrowth: {
                   id: 18,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 5
                },
                applicationInterval: {
                   id: 2,
                    periodUnit: PeriodUnit.HOURS,
                    periodValue: 0
                },
                rate: 5,
                applicationMethod: "SPOT_PLACEMENT",
                remarks: "Top dressing"
            }
        ]
    }

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    return (
        <ScrollArea className="h-[calc(100vh-4rem)] pr-4">
            <div className="space-y-6 pb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Crop Batch Details</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => toggleSection("details")}>
                            {expandedSections.details ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {expandedSections.details ? (
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Crop Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram.crop.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Date Of Transplant</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(cropBatch.dateOfTransplant).toLocaleString()}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropBatch.location}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Comments</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropBatch.remarks}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Crop Program Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Crop Program Type</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram.cropScheduleType}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Source</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram.source}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Remarks</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram.remarks}</dd>
                                </div>
                            </dl>
                        ) : (
                            <p className="text-sm text-gray-500">Click to expand and view crop batch details.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Fertilizer Schedules</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => toggleSection("fertilizer")}>
                            {expandedSections.fertilizer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {expandedSections.fertilizer ? (
                            cropProgram.fertilizerScheduleList.map((schedule: any, index: number) => (
                                <div key={index} className="mb-4 p-4 border rounded-md">
                                    <h4 className="text-sm font-medium text-gray-900">Schedule {index + 1}</h4>
                                    <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Fertilizer Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.fertilizer.name}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Application Method</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.applicationMethod}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Rate</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.rate}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Stage of Growth</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{`${schedule.stageOfGrowth.periodValue} ${schedule.stageOfGrowth.periodUnit}`}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Application Interval</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{`${schedule.applicationInterval.periodValue} ${schedule.applicationInterval.periodUnit}`}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Remarks</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.remarks}</dd>
                                        </div>
                                    </dl>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                Click to expand and view {cropProgram.fertilizerScheduleList.length} fertilizer schedules.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Pesticide Schedules</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => toggleSection("pesticide")}>
                            {expandedSections.pesticide ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {expandedSections.pesticide ? (
                            cropProgram.pesticideScheduleList.map((schedule: any, index: number) => (
                                <div key={index} className="mb-4 p-4 border rounded-md">
                                    <h4 className="text-sm font-medium text-gray-900">Schedule {index + 1}</h4>
                                    <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Pesticide Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.pesticide.name}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Application Method</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.applicationMethod}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Stage of Growth</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{`${schedule.stageOfGrowth.periodValue} ${schedule.stageOfGrowth.periodUnit}`}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Application Interval</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{`${schedule.applicationInterval.periodValue} ${schedule.applicationInterval.periodUnit}`}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Remarks</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{schedule.remarks}</dd>
                                        </div>
                                    </dl>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">
                                Click to expand and view {cropProgram.pesticideScheduleList.length} pesticide schedules.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    )
}