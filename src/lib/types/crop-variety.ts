import {Crop} from "@/lib/types/crop";

export interface CropVariety {
    id: number,
    crop: Crop,
    variety: string,
    maturityStartDay: number,
    maturityEndDay: number,
    harvestDuration: number,
    remarks: string
}