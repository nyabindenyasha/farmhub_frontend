import {Crop} from "@/lib/types/crop";
import {Period} from "@/lib/types/period";
import {StagesOfGrowth} from "@/lib/enums/stages-of-growth";

export interface CropStagesOfGrowth {
    id: number,
    crop: Crop,
    stageStartDate: Period,
    stageEndDate: Period,
    stageOfGrowth: StagesOfGrowth
}