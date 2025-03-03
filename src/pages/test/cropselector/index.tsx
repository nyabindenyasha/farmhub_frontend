import {CropSelector} from "@/othercomponents/shared/crop-selector";
import {CropProvider} from "@/context/CropContext";
import {DialogProps} from "@/lib/types/dialog-props";
import {Crop} from "@/lib/types/crop";

export default function TestCropSelector() {

    const dialogProps: DialogProps = {
        width: 625,
        title: "Create Crop Batch"
    }

    const handleCropSelect = (crop: Crop) => {
        console.log("crop: ", crop)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Crop Selector</h1>
                <CropProvider>
                    <CropSelector dialogProps={dialogProps} onCropSelect={handleCropSelect}/>
                </CropProvider>
            </div>
        </main>
    )
}
