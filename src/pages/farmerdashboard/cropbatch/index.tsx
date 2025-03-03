import React from "react";
import {CropBatchProvider} from "@/context/CropBatchContext";
import CropBatchComponent from "@/farmercomponents/cropbatches/crop-batch";
import {CropProvider} from "@/context/CropContext";
import {CropProgramProvider} from "@/context/CropProgramContext";

function CropBatch() {
    return (
        <CropProvider>
            <CropProgramProvider>
                <CropBatchProvider>
                    <CropBatchComponent/>
                </CropBatchProvider>
            </CropProgramProvider>
        </CropProvider>
    )
}

export default CropBatch
