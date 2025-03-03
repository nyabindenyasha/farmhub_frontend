import {Crop} from "@/lib/types/crop";
import {MeasurementUnit} from "@/lib/enums/measurement-unit";
import {Fertilizer} from "@/lib/types/fertilizer";
import {RateUnit} from "@/lib/enums/rate-unit";

export interface CropGuide {
    id: 1,
    classification: Crop,
    nurseryManagement: NurseryManagement,
    fieldManagement: FieldManagement
}

export interface NurseryManagement {
    seedRate: SeedRate;
    nurseryPeriodicTimes: NurseryPeriodicTimes;
    soilTemperatureForGermination: SoilTemperatureForGermination;
    nurserySpacing: NurserySpacing;
    nurseryBedPreparation: NurseryBedPreparation;
}

export interface SeedRate {
    unit: MeasurementUnit;
    minRate: number;
    maxRate: number
}

export interface NurseryPeriodicTimes {
    plantingTime: string
    emergenceTime: string
    transplantingTime: string
}

export interface SoilTemperatureForGermination {
    minimumTemperature: SoilTemperature,
    optimumTemperature: SoilTemperature,
    maximumTemperature: SoilTemperature
}

export interface SoilTemperature {
    temperatureValue: number;
    description: string
}

export interface NurserySpacing {
    sowingDepth: Spacing,
    inRowSpacing: Spacing,
    interRowSpacing: Spacing
}

export interface Spacing {
    minimumSpacing: number,
    maximumSpacing: number,
    unit: MeasurementUnit,
    description: string
}

export interface NurseryBedPreparation {
    id: number,
    fertilizerApplications: FertilizerApplication[],
    metadataList: MetadataEntry[]
}

export interface FertilizerApplication {
    id: number,
    fertilizer: Fertilizer,
    unit: MeasurementUnit,
    quantity: number,
    perUnit: RateUnit
}

export type MetadataEntry = {
    key: string;
    value: string;
};

export interface FieldManagement {
    id: number,
    soilRequirements: string,
    temperature: string,
    waterRequirement: string,
    easeOfCare: string,
    inRowSpacing: Spacing,
    interRowSpacing: Spacing,
    plantPopulation: PlantPopulation,
    cropVarieties: null,
    ph: string
}

export interface PlantPopulation {
    unit: RateUnit,
    minRate: number,
    maxRate: number
}