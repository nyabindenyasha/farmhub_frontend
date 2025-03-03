import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import {ChevronRight, Mail} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import PatientBasicInfo from "@/components/cards/patient-basic-info";
import AppointmentSchedule from "@/components/cards/appointment-schedule-card";
import {PatientMetricCard} from "@/components/cards/patient-metric-card";
import {AreaChartMetric} from "@/components/charts/patient-area";
import {BMIIndicator} from "@/components/cards/bmi-indicator";
import {MedicalHistory} from "@/components/cards/medical-history";
import {UpcomingSchedules} from "@/components/cards/upcoming-schedule";
import {PolicyChronicResponse} from "@/lib/types";


const policyChronicResponse: PolicyChronicResponse = {
    socialDemographic: {
        occupation: "Software Developer",
        maritalStatus: "SINGLE",
        educationLevel: "TERTIARY",
        alcoholConsumption: "OCCASIONAL",
        exerciseHabits: "MODERATE",
    },
    policyMemberResponse: {
        id: 1,
        policyId: 12345,
        policyNumber: "POL-2024-001",
        suffix: "Jr.",
        memberType: "Primary",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+1234567890",
        email: "john.doe@example.com",
        dateOfBirth: "1990-05-15",
        productName: "Health Insurance Premium",
        fundName: "Global Health Fund",
        currency: "USD",
        enrolmentDate: "2020-01-01",
        enrolmentType: "Individual",
        gender: "MALE"
    },
    chronicDiseaseResponse: {
        id: 1,
        diagnosisDate: "2021-06-15",
        diseaseName: "Hypertension",
        chronicType: "Chronic",
        treatmentPlan: {
            treatmentIntervals: "Monthly",
            planDescription: "Monitor blood pressure and take prescribed medication.",
        },
        allergiesResponses: [
            {
                allergyName: "Peanuts",
                allergyDescription: "Severe allergic reaction to peanuts.",
                medicationRecommendation: "Avoid peanuts and carry an epinephrine pen.",
            },
        ],
        medicationsResponse: [
            {
                medicationName: "Lisinopril",
            },
        ],
        medcalHistoryResponse: [
            {
                treatmentDate: "2022-01-10",
                treatmentDescription: "Routine check-up and prescription refill.",
                doctorName: "Dr John Doe",
                diagnosis: "Cardiology",
                disease: "Heart Disease"
            },
            {
                treatmentDate: "2023-03-20",
                treatmentDescription: "Adjusted medication dosage.",
                doctorName: "Dr Jane Mary",
                diagnosis: "Dermatology",
                disease: "Skin Rush"
            },
        ],
    },
};


function PatientDashboard() {
    return (
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col ">
                <header className="flex items-center gap-2 py-4">
                    <h1 className="text-2xl font-bold text-[#14532d]">Dashboard</h1>
                    <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                    <span className="text-muted-foreground text-[#a1a1aa]">Patient Dashboard</span>
                </header>

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder.svg" alt="Profile picture"/>
                            <AvatarFallback>{policyChronicResponse.policyMemberResponse.firstName[0]} {policyChronicResponse.policyMemberResponse.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{policyChronicResponse.policyMemberResponse.firstName} {policyChronicResponse.policyMemberResponse.lastName}</h1>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    MEMBER
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">{policyChronicResponse.policyMemberResponse.enrolmentDate}</p>
                        </div>
                    </div>
                    <button className="rounded-full p-2 hover:bg-accent">
                        <Mail className="h-5 w-5"/>
                    </button>
                </div>
                <div className=" grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <PatientBasicInfo policyMember={policyChronicResponse.policyMemberResponse}/>
                    <AppointmentSchedule/>
                </div>
                <div className="container mx-auto p-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <PatientMetricCard
                            title="Heart Rate"
                            value={110}
                            unit="bpm"
                            change={12}
                            type="primary"
                            icon="heart"
                        />
                        <PatientMetricCard
                            title="Heart Rate"
                            value={38.6}
                            unit="°C"
                            change={-20}
                            type="danger"
                            icon="skull"
                        />
                        <PatientMetricCard
                            title="Heart Rate"
                            value={120}
                            unit="mm/Hg"
                            change={-40}
                            type="warning"
                            icon="thumbs"
                        />
                        <PatientMetricCard
                            title="Heart Rate"
                            value="7h 30m"
                            unit=""
                            change={-10}
                            type="success"
                            icon="clock"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <AreaChartMetric/>
                        <BMIIndicator/>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <MedicalHistory medicalHistoryResponse={policyChronicResponse.chronicDiseaseResponse.medcalHistoryResponse}/>
                        <UpcomingSchedules/>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )

}

export default PatientDashboard


