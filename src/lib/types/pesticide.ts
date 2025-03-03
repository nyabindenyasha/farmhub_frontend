import {PesticideType} from "@/lib/enums/pesticide-type";
import {PesticideModeOfAction} from "@/lib/enums/pesticide-mode-of-action";
import {MeasurementUnit} from "@/lib/enums/measurement-unit";
import {RateUnit} from "@/lib/enums/rate-unit";

export interface Pesticide {
    id: number;
    name: string;
    alias: string,
    activeIngredients: string[],
    applicationRate: string,
    applicationRateUnit: MeasurementUnit,
    applicationRateRateUnit: RateUnit,
    safetyInterval: number,
    pesticideType: PesticideType,
    modeOfAction: PesticideModeOfAction,
    targetPests: string[],
    targetDiseases: string[]
    alternatives: Pesticide[]
}