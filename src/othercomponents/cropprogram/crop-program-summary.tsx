import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Crop} from "@/lib/types/crop";

interface CropProgramSummaryProps {
    crop: Crop | undefined
    cropProgram: any // Replace 'any' with your actual CropProgram type
}

export function CropProgramSummary({crop, cropProgram}: CropProgramSummaryProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Crop Program Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-4">

                        <dt className="text-sm font-medium text-gray-500">Crop Name</dt>
                        <dd className="text-sm text-gray-900">{crop?.name}</dd>

                        <dt className="text-sm font-medium text-gray-500">Program Name</dt>
                        <dd className="text-sm text-gray-900">{cropProgram.name}</dd>

                        <dt className="text-sm font-medium text-gray-500">Schedule Type</dt>
                        <dd className="text-sm text-gray-900">{cropProgram.cropScheduleType}</dd>

                        <dt className="text-sm font-medium text-gray-500">Source</dt>
                        <dd className="text-sm text-gray-900">{cropProgram.source}</dd>

                        <dt className="cols-2 text-sm font-medium text-gray-500">Description</dt>
                        <dd className="cols-2 text-sm text-gray-900">{cropProgram.description}</dd>

                        <dt className="cols-2 text-sm font-medium text-gray-500">Remarks</dt>
                        <dd className="cols-2 text-sm text-gray-900">{cropProgram.remarks}</dd>

                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Fertilizer Schedules</CardTitle>
                </CardHeader>
                <CardContent>
                    {cropProgram.fertilizerScheduleRequests.map((schedule: any, index: number) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <h4 className="text-sm font-medium text-gray-900">Schedule {index + 1}</h4>
                            <dl className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-4 m-2">

                                <dt className="text-sm font-medium text-gray-500">Fertilizer</dt>
                                <dd className="text-sm text-gray-900">{schedule.fertilizerName}</dd>

                                <dt className="text-sm font-medium text-gray-500">Rate</dt>
                                <dd className="text-sm text-gray-900">{schedule.rate}g</dd>

                                <dt className="text-sm font-medium text-gray-500">Stage of Growth</dt>
                                <dd className="text-sm text-gray-900">{`${schedule.stageOfGrowth.periodValue} ${schedule.stageOfGrowth.periodUnit}`}</dd>

                                <dt className="text-sm font-medium text-gray-500">Application Interval</dt>
                                <dd className="text-sm text-gray-900">{`${schedule.applicationInterval.periodValue} ${schedule.applicationInterval.periodUnit}`}</dd>

                                <dt className="text-sm font-medium text-gray-500">Application Method</dt>
                                <dd className="text-sm text-gray-900">{schedule.applicationMethod}</dd>

                                <dt className="text-sm font-medium text-gray-500">Remarks</dt>
                                <dd className="text-sm text-gray-900">{schedule.remarks}</dd>

                            </dl>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pesticide Schedules</CardTitle>
                </CardHeader>
                <CardContent>
                    {cropProgram.pesticideScheduleRequests.map((schedule: any, index: number) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <h4 className="text-sm font-medium text-gray-900">Schedule {index + 1}</h4>
                            <dl className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-4 m-2">

                                    <dt className="text-sm font-medium text-gray-500">Pesticide</dt>
                                    <dd className="text-sm text-gray-900">{schedule.pesticideId}</dd>

                                    <dt className="text-sm font-medium text-gray-500">Application Method</dt>
                                    <dd className="text-sm text-gray-900">{schedule.applicationMethod}</dd>

                                    <dt className="text-sm font-medium text-gray-500">Stage of Growth</dt>
                                    <dd className="text-sm text-gray-900">{`${schedule.stageOfGrowth.periodValue} ${schedule.stageOfGrowth.periodUnit}`}</dd>

                                    <dt className="text-sm font-medium text-gray-500">Application Interval</dt>
                                    <dd className="text-sm text-gray-900">{`${schedule.applicationInterval.periodValue} ${schedule.applicationInterval.periodUnit}`}</dd>

                                    <dt className="text-sm font-medium text-gray-500">Remarks</dt>
                                    <dd className="text-sm text-gray-900">{schedule.remarks}</dd>
                            </dl>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

