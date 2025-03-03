import {CropSchedule} from "@/lib/types/crop-schedule";
import {Pesticide} from "@/lib/types/pesticide";
import {Period} from "@/lib/types/period";
import {PesticideApplicationMethod} from "@/lib/enums/pesticide-application-method";
import {Schedule} from "@/lib/types/schedule";


export interface CropPesticideSchedule {
    id: number,
    cropSchedule: CropSchedule,
    pesticide: Pesticide,
    stageOfGrowth: Period,
    applicationInterval: Period,
    applicationMethod: PesticideApplicationMethod,
    remarks: string
}

const toSchedule = (pesticideSchedule: CropPesticideSchedule): Schedule => ({
    id: pesticideSchedule.id,
    cropSchedule: pesticideSchedule.cropSchedule,
    pesticide: pesticideSchedule.pesticide,
    stageOfGrowth: pesticideSchedule.stageOfGrowth,
    applicationInterval: pesticideSchedule.applicationInterval,
    applicationMethod: pesticideSchedule.applicationMethod,
    remarks: pesticideSchedule.remarks
});