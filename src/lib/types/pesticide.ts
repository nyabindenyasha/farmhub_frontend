import {PesticideType} from "@/lib/enums/pesticide-type";
import {PesticideModeOfAction} from "@/lib/enums/pesticide-mode-of-action";

export interface Pesticide {
    id: number;
    name: string;
    alias: string,
    activeIngredients: string[],
    applicationRate: string,
    safetyInterval: number,
    pesticideType: PesticideType,
    modeOfAction: PesticideModeOfAction,
    targetPests: string[],
    targetDiseases: string[]
    alternatives: Pesticide[]
}