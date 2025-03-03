import {Crop} from "@/lib/types/crop";

export interface Patient {
    id: string
    name: string
    avatar: string
    caseRef: string
    openedAt: string
    doa: string
    source: string
    serviceProvider: string
    services: Array<{
        name: string
        variant: "default" | "destructive" | "outline" | "secondary" | "success"
    }>
    amount: number
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}
export interface FormProps {
    isOpen: boolean
    onClose: () => void
}

export interface CropFormProps {
    isOpen: boolean
    onClose: () => void
    onCropSelect: (crop: Crop | undefined) => void
}

export interface CropProgramFormProps {
    isFarmer: boolean
    isOpen: boolean
    onClose: () => void
}

export interface AppointmentResponse {
    id: number;
    appointmentName: string;
    address: string;
    appContactNumber: string;
    appDescription: string;
    appDateTime: string;
    appointmentType: string;
    appointmentStatus: string;
    serviceProvider: ServiceProvider;
    careGiverPolicy: CareGiverPolicy;
}

export interface ServiceProvider {
    providerName: string;
    practiceNumber: string;
    email: string;
    subDiscipline: string;
    contactNumber: string;
    alternativeContactNumber: string;
    disciplineCode: string;
    providerStatus: string;
    address: Address;
}

interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
}

export interface CareGiverPolicy {
    careGiverId: number;
    careGiverName: string;
    careGiverPhoneNumber: string;
    patientId: number;
    patientName: string;
    patientPhoneNumber: string;
    diseaseName: string;
    patientCondition: string;
}

 export interface PolicyMember {
    id: number;
    policyId: number;
    policyNumber: string;
    suffix: string;
    memberType: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string; // Use `Date` if you prefer working with Date objects
    productName: string;
    fundName: string;
    currency: string;
    enrolmentDate: string; // Use `Date` if needed
    enrolmentType: string;
}

export interface PolicyChronicResponse {
    socialDemographic: SocialDemographic;
    policyMemberResponse: PolicyMember;
    chronicDiseaseResponse: ChronicDiseaseResponse;
}

export interface SocialDemographic {
    occupation: string;
    maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"; // Example of enum values
    educationLevel: "NONE" | "PRIMARY" | "SECONDARY" | "TERTIARY"; // Example of enum values
    alcoholConsumption: "REGULAR" | "OCCASIONAL" | "NEVER"; // Example of enum values
    exerciseHabits: "NONE" | "LIGHT" | "MODERATE" | "INTENSE"; // Example of enum values
}



export interface ChronicDiseaseResponse {
    id: number;
    diagnosisDate: string; // Use `Date` if preferred
    diseaseName: string;
    chronicType: string;
    treatmentPlan: TreatmentPlan;
    allergiesResponses: AllergyResponse[];
    medicationsResponse: MedicationResponse[];
    medcalHistoryResponse: MedicalHistoryResponse[];
}

export interface TreatmentPlan {
    treatmentIntervals: string;
    planDescription: string;
}

export interface AllergyResponse {
    allergyName: string;
    allergyDescription: string;
    medicationRecommendation: string;
}

export interface MedicationResponse {
    medicationName: string;
}

export interface MedicalHistoryResponse {
    treatmentDate: string; // Use `Date` if preferred
    treatmentDescription: string;
    doctorName: string;
    diagnosis: string;
    disease: string;
}

