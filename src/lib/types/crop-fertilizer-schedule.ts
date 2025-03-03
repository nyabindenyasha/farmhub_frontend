import {CropSchedule} from "@/lib/types/crop-schedule";
import {Fertilizer} from "@/lib/types/fertilizer";
import {Period} from "@/lib/types/period";
import {FertilizerApplicationMethod} from "@/lib/enums/fertilizer-application-method";
import {Schedule} from "@/lib/types/schedule";

export interface CropFertilizerSchedule {
    id: number,
    cropSchedule: CropSchedule,
    fertilizer: Fertilizer,
    stageOfGrowth: Period,
    applicationInterval: Period,
    rate: number,
    applicationMethod: FertilizerApplicationMethod,
    remarks: string
}


const toSchedule = (fertilizerSchedule: CropFertilizerSchedule): Schedule => ({
    id: fertilizerSchedule.id,
    cropSchedule: fertilizerSchedule.cropSchedule,
    fertilizer: fertilizerSchedule.fertilizer,
    stageOfGrowth: fertilizerSchedule.stageOfGrowth,
    applicationInterval: fertilizerSchedule.applicationInterval,
    rate: fertilizerSchedule.rate,
    applicationMethod: fertilizerSchedule.applicationMethod,
    remarks: fertilizerSchedule.remarks
});