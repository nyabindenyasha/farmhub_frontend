import {CropStagesOfGrowth} from "@/lib/types/crop-stages-of-growth";
import {StagesOfGrowth} from "@/lib/enums/stages-of-growth";


export function calculateCustomerTotal(cropStages: CropStagesOfGrowth[], name: string) {
    let total = 0;

    if (cropStages) {
        for (let customer of cropStages) {
            if (customer.crop.name === name) {
                total++;
            }
        }
    }

    return total;
}

export function getSeverity(status: StagesOfGrowth) {
    switch (status) {
        case StagesOfGrowth.MATURITY:
            return 'danger';

        case StagesOfGrowth.HEAD_FORMATION:
            return 'success';

        case StagesOfGrowth.VEGETATIVE_GROWTH:
            return 'info';

        case StagesOfGrowth.TRANSPLANTING:
            return 'warning';

        default:
            return 'secondary';
    }
}