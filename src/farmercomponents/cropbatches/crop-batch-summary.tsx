import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {CropBatchRequest} from "@/farmercomponents/cropbatches/create-crop-batch";
import {CropProgram} from "@/lib/types/crop-program";
import {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp} from "lucide-react";

interface CropBatchSummaryProps {
    cropBatch: CropBatchRequest
    cropProgram: CropProgram | null // Replace 'any' with your actual CropProgram type
}

export function CropBatchSummary({cropBatch, cropProgram}: CropBatchSummaryProps) {

    const [expandedSections, setExpandedSections] = useState({
        details: true,
        fertilizer: false,
        pesticide: false,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        console.log(section);
        setExpandedSections((prev) => ({...prev, [section]: !prev[section]}))
    }

    return (
        <ScrollArea className="h-[calc(100vh-1rem)] pr-1">
            <div className="space-y-2 pb-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Crop Batch Details</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => toggleSection("details")}>
                            {expandedSections.details ? <ChevronUp className="h-4 w-4"/> :
                                <ChevronDown className="h-4 w-4"/>}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {expandedSections.details ? (
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Crop Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram?.crop.name}</dd>
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
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Crop Program Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram?.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Crop Program Type</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram?.cropScheduleType}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Source</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{cropProgram?.source}</dd>
                                </div>
                                {/*<div className="sm:col-span-2">*/}
                                {/*    <dt className="text-sm font-medium text-gray-500">Remarks</dt>*/}
                                {/*    <dd className="mt-1 text-sm text-gray-900">{cropProgram?.remarks}</dd>*/}
                                {/*</div>*/}
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
                            {expandedSections.fertilizer ? <ChevronUp className="h-4 w-4"/> :
                                <ChevronDown className="h-4 w-4"/>}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {expandedSections.fertilizer ? (
                            cropProgram?.fertilizerScheduleList.map((schedule: any, index: number) => (
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
                                Click to expand and view {cropProgram?.fertilizerScheduleList.length} fertilizer
                                schedules.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Pesticide Schedules</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => toggleSection("pesticide")}>
                            {expandedSections.pesticide ? <ChevronUp className="h-4 w-4"/> :
                                <ChevronDown className="h-4 w-4"/>}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {expandedSections.pesticide ? (
                            cropProgram?.pesticideScheduleList.map((schedule: any, index: number) => (
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
                                Click to expand and view {cropProgram?.pesticideScheduleList.length} pesticide schedules.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    )
}

