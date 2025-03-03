import {CropVariety} from "@/lib/types/crop-variety";

export function calculateTotal(cropVarieties: CropVariety[], name: string) {
    let total = 0;

    if (cropVarieties) {
        for (let customer of cropVarieties) {
            if (customer.crop.name === name) {
                total++;
            }
        }
    }

    return total;
}