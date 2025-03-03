import {Crop} from "@/lib/types/crop";
import {CropScheduleType} from "@/lib/enums/crop-schedule-type";
import {CropFertilizerSchedule} from "@/lib/types/crop-fertilizer-schedule";
import {CropPesticideSchedule} from "@/lib/types/crop-pesticide-schedule";

export interface CropProgram {
    id: number,
    crop: Crop,
    name: string,
    description: string,
    source: string,
    remarks: string,
    cropScheduleType: CropScheduleType,
    fertilizerScheduleList: CropFertilizerSchedule[],
    pesticideScheduleList: CropPesticideSchedule[],
}