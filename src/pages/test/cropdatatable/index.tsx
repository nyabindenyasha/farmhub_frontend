import React from "react";
import {CropProvider} from "@/context/CropContext";
import CropDataTableComponent from "@/othercomponents/cropdatatable/crop-data-table";

function CropDataTable() {
    return (
        <CropProvider>
            <CropDataTableComponent/>
        </CropProvider>
    )
}

export default CropDataTable
