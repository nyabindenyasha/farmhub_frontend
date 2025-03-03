import React from "react";
import {CropProgramProvider} from "@/context/CropProgramContext";
import CropProgramComponent from "@/farmercomponents/cropprogram/crop-program";
import {CropProvider} from "@/context/CropContext";
import {FertilizerProvider} from "@/context/FertilizerContext";
import {PesticideProvider} from "@/context/PesticideContext";

function CropBatch() {
    return (


        <CropProvider>
            <FertilizerProvider>
                <PesticideProvider>
                    <CropProgramProvider>
                        <CropProgramComponent/>
                    </CropProgramProvider>
                </PesticideProvider>
            </FertilizerProvider>
        </CropProvider>
    )
}

export default CropBatch
