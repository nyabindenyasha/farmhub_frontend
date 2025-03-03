import {CropProvider} from "@/context/CropContext"
import CropVarietyComponent from "@/othercomponents/cropvariety/crop-variety";
import {CropVarietyProvider} from "@/context/CropVarietyContext";


export default function CropPage() {
    return (
        <CropProvider>
            <CropVarietyProvider>
                <CropVarietyComponent/>
            </CropVarietyProvider>
        </CropProvider>
    )
}

