import {Crop} from "@/lib/types/crop";
import {UserAccount} from "@/lib/types/user-account";
import {CropSchedule} from "@/lib/types/crop-schedule";
import {ScheduleTask} from "@/lib/types/schedule-task";

export interface CropBatch {
    id: number,
    crop: Crop,
    farmer: UserAccount,
    cropSchedule: CropSchedule,
    dateOfTransplant: Date,
    "location": string,
    "remarks": string,
    // fertilizerScheduleTasks: CropFertilizerScheduleTask[],
    fertilizerScheduleTasks: ScheduleTask[],
    // pesticideScheduleTasks: CropPesticideScheduleTask[]
    pesticideScheduleTasks: ScheduleTask[]
}