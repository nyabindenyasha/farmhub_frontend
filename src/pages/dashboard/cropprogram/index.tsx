import React from "react";
import {CropProvider} from "@/context/CropContext";
import {CropProgramProvider} from "@/context/CropProgramContext";
import CropProgramComponent from "@/othercomponents/cropprogram/crop-program";
import {FertilizerProvider} from "@/context/FertilizerContext";
import {PesticideProvider} from "@/context/PesticideContext";

function Crop() {
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

export default Crop
