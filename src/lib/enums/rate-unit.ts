export enum RateUnit {
    PER_GRAM = "per gram",
    PER_KG = "per kilogram",
    PER_LITER = "per litre",
    PER_MILLILITER = "per milliliter",
    PER_TON = "per ton",
    // Area-Based Units (for application rates)
    PER_SQUARE_METER = "Per Square Meter",
    PER_HECTARE = "Per Hectare",
}

// Mapping for additional properties
const RateUnitDetails: Record<RateUnit, { description: string; symbol: string }> = {
    [RateUnit.PER_GRAM]: {description: "per gram", symbol: "g"},
    [RateUnit.PER_KG]: {description: "per kilogram", symbol: "kg"},
    [RateUnit.PER_LITER]: {description: "per litre", symbol: "L"},
    [RateUnit.PER_MILLILITER]: {description: "per milliliter", symbol: "mL"},
    [RateUnit.PER_TON]: {description: "per ton", symbol: "t"},
    [RateUnit.PER_SQUARE_METER]: {description: "Per Square Meter", symbol: "m²"},
    [RateUnit.PER_HECTARE]: {description: "Per Hectare", symbol: "ha"},
};

// Function to retrieve unit details
function getRateUnitDetails(unit: RateUnit) {
    return RateUnitDetails[unit];
}

// Function to find a unit by name or description
function fromString(text: string): RateUnit {
    const entry = Object.entries(RateUnitDetails).find(
        ([, details]) => details.description.toLowerCase() === text.toLowerCase() || details.symbol.toLowerCase() === text.toLowerCase()
    );

    if (!entry) {
        throw new Error(`Invalid rate unit: ${text}`);
    }

    return entry[0] as RateUnit;
}

// Example usage:
console.log(getRateUnitDetails(RateUnit.PER_KG)); // { description: 'per kilogram', symbol: 'kg' }
console.log(fromString("kg")); // RateUnit.PER_KG

