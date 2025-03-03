import {CropPesticideScheduleTask} from "@/lib/types/crop-pesticide-schedule-task";
import {CropFertilizerScheduleTask} from "@/lib/types/crop-fertilizer-schedule-task";
import {ScheduleTask} from "@/lib/types/schedule-task";

export interface CropBatchTaskUpdateRequest {
    batchId: number,
    cropScheduleTask: ScheduleTask
}