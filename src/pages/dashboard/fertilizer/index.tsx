import React from "react";
import FertilizerComponent from "@/othercomponents/fertilizer/fertilizer";
import {FertilizerProvider} from "@/context/FertilizerContext";

function Fertilizer() {
    return (
        <FertilizerProvider>
            <FertilizerComponent/>
        </FertilizerProvider>
    )
}

export default Fertilizer
