import {Fertilizer} from "@/lib/types/fertilizer";
import {Period} from "@/lib/types/period";
import {FertilizerApplicationMethod} from "@/lib/enums/fertilizer-application-method";
import {TaskStatus} from "@/lib/enums/task-status";

export interface CropFertilizerScheduleTask {
    id: number,
    fertilizer: Fertilizer,
    stageOfGrowth: Period,
    applicationInterval: Period,
    rate: number,
    applicationMethod: FertilizerApplicationMethod,
    remarks: string
    isCompleted: boolean,
    completionDate: Date,
    taskRemarks: string,
    taskStatus: TaskStatus,
    taskDate: Date
}