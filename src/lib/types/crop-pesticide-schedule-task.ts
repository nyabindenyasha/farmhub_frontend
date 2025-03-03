import {CropSchedule} from "@/lib/types/crop-schedule";
import {Pesticide} from "@/lib/types/pesticide";
import {Period} from "@/lib/types/period";
import {PesticideApplicationMethod} from "@/lib/enums/pesticide-application-method";
import {TaskStatus} from "@/lib/enums/task-status";

export interface CropPesticideScheduleTask {
    id: 0,
    cropSchedule: CropSchedule,
    pesticide: Pesticide,
    stageOfGrowth: Period,
    applicationInterval: Period,
    applicationMethod: PesticideApplicationMethod,
    remarks: string,
    isCompleted: boolean,
    completionDate: Date,
    taskRemarks: string,
    taskStatus: TaskStatus,
    taskDate: Date
}