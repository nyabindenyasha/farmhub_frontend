import {CropSchedule} from "@/lib/types/crop-schedule";
import {Period} from "@/lib/types/period";
import {Pesticide} from "@/lib/types/pesticide";
import {Fertilizer} from "@/lib/types/fertilizer";

export interface Schedule {
    id: number,
    cropSchedule: CropSchedule,
    fertilizer?: Fertilizer
    pesticide?: Pesticide
    stageOfGrowth: Period,
    applicationInterval: Period,
    rate?: number,
    applicationMethod: string,
    remarks: string
}