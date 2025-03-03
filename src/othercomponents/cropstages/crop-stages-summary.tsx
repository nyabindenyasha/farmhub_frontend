import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {CropVarietyRequest} from "@/othercomponents/cropvariety/create-crop-variety";
import {Crop} from "@/lib/types/crop";
import React from "react";

interface CropVarietySummaryProps {
    crop: Crop | null
    cropVariety: CropVarietyRequest // Replace 'any' with your actual CropVariety type
}

export function CropVarietySummary({crop, cropVariety}: CropVarietySummaryProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Crop Variety Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2">

                        <dt className="col-span-1 text-sm font-medium text-gray-500">Crop Name:</dt>
                        <dd className="col-span-1 text-sm text-gray-900">{crop?.name}</dd>

                        <dt className="text-sm font-medium text-gray-500">Variety:</dt>
                        <dd className="text-sm text-gray-900">{cropVariety.variety}</dd>

                        <dt className="text-sm font-medium text-gray-500">Maturity Start Day:</dt>
                        <dd className="text-sm text-gray-900">{cropVariety.maturityStartDay} Days</dd>

                        <dt className="text-sm font-medium text-gray-500">Maturity End Day:</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cropVariety.maturityEndDay} Days</dd>

                        <dt className="text-sm font-medium text-gray-500">Harvest Duration:</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cropVariety.harvestDuration} Days</dd>

                        <dt className="text-sm font-medium text-gray-500">Remarks:</dt>
                        <dd className="mt-1 text-sm text-gray-900">{cropVariety.remarks}</dd>
                    </dl>
                </CardContent>
            </Card>
        </div>
    )
}

