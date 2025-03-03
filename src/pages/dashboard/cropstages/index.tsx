import React from "react";
import {CropProvider} from "@/context/CropContext";
import CropStagesOfGrowthComponent from "@/othercomponents/cropstages/crop-stages-of-growth";
import {CropStagesOfGrowthProvider} from "@/context/CropStagesOfGrowthContext";

function CropStagesOfGrowth() {
    return (
        <CropProvider>
            <CropStagesOfGrowthProvider>
                <CropStagesOfGrowthComponent/>
            </CropStagesOfGrowthProvider>
        </CropProvider>
    )
}

export default CropStagesOfGrowth
