import React from "react";
import CropComponent from "@/othercomponents/crop/crop";
import {CropProvider} from "@/context/CropContext";
import {CropGuideProvider} from "@/context/CropGuideContext";

function Crop() {
    return (
        <CropProvider>
            <CropGuideProvider>
                <CropComponent />
            </CropGuideProvider>
        </CropProvider>
    )
}

export default Crop
