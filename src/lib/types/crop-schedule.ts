import {Crop} from "@/lib/types/crop";
import {CropScheduleType} from "@/lib/enums/crop-schedule-type";

export interface CropSchedule {
    id: number,
    crop: Crop,
    name: string,
    description: string,
    source: string,
    remarks: string,
    cropScheduleType: CropScheduleType
}