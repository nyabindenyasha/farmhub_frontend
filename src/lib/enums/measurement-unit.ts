export enum MeasurementUnit {
    // Mass Units
    GRAM = "Gram",
    KILOGRAM = "Kilogram",
    TON = "Ton",

    // Volume Units
    LITRE = "Litre",
    MILLILITRE = "Millilitre",

    // Length Units
    METER = "Meter",
    CENTIMETER = "Centimeter",

    // Temperature Units
    CELSIUS = "Celsius",
    FAHRENHEIT = "Fahrenheit",
}

// Mapping for additional properties
const MeasurementUnitDetails: Record<MeasurementUnit, { name: string; symbol: string }> = {
    [MeasurementUnit.GRAM]: { name: "Gram", symbol: "g" },
    [MeasurementUnit.KILOGRAM]: { name: "Kilogram", symbol: "kg" },
    [MeasurementUnit.TON]: { name: "Ton", symbol: "t" },
    [MeasurementUnit.LITRE]: { name: "Litre", symbol: "L" },
    [MeasurementUnit.MILLILITRE]: { name: "Millilitre", symbol: "mL" },
    [MeasurementUnit.METER]: { name: "Meter", symbol: "m" },
    [MeasurementUnit.CENTIMETER]: { name: "Centimeter", symbol: "cm" },
    [MeasurementUnit.CELSIUS]: { name: "Celsius", symbol: "°C" },
    [MeasurementUnit.FAHRENHEIT]: { name: "Fahrenheit", symbol: "°F" },
};

// Function to retrieve unit details
function getMeasurementUnitDetails(unit: MeasurementUnit) {
    return MeasurementUnitDetails[unit];
}

// Function to find a unit by name or symbol
function fromString(text: string): MeasurementUnit {
    const entry = Object.entries(MeasurementUnitDetails).find(
        ([, details]) => details.name.toLowerCase() === text.toLowerCase() || details.symbol.toLowerCase() === text.toLowerCase()
    );

    if (!entry) {
        throw new Error(`Invalid measurement unit: ${text}`);
    }

    return entry[0] as MeasurementUnit;
}

// Example usage:
console.log(getMeasurementUnitDetails(MeasurementUnit.KILOGRAM)); // { name: 'Kilogram', symbol: 'kg' }
console.log(fromString("kg")); // MeasurementUnit.KILOGRAM


