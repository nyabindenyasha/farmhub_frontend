import {PeriodUnit} from "@/lib/enums/period-unit";

export interface Period {
    id?: number,
    periodUnit: PeriodUnit,
    periodValue: number
}