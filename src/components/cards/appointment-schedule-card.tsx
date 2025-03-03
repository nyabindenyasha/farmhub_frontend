import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {AppointmentResponse} from "@/lib/types";


const appointmentResponses: AppointmentResponse[] = Array(6).fill({
    id: 9,
    appointmentName: "Monthly Check Up",
    address: "1 Dapi Rd Seke Unit K",
    appContactNumber: "1234567",
    appDescription: "Montly check up done to NMB Patients",
    status: "PENDING",
    appointmentType:"ACTIVE",
    appDateTime:"12 Dec 2024 T 1200h",
    appointmentStatus:"PENDING",
    serviceProvider:{
        providerName:"Dr Alvin",
        practiceNumber:"12345",
        email:"ga@gmail.com",
        subDiscipline:"",
        contactNumber:"+263777487599",
        alternativeContactNumber:"PENDING",
        disciplineCode:"PENDING",
        providerStatus:"PENDING",
        address:{
            addressLine1:"PENDING",
            addressLine2:"PENDING",
            city:"PENDING",
            province:"PENDING",
            country:"PENDING",
            postalCode:"PENDING"
        }
    },
    careGiverPolicy:{
        careGiverId: 1,
        careGiverName: "John Doe",
        careGiverPhoneNumber: "+263777487599",
        patientId: 1,
        patientName: "Mary jane",
        patientPhoneNumber: "+263777487599",
        diseaseName: "Flu",
        patientCondition: "HIGH"
    },
})

function AppointmentSchedule() {
    return (

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Appointment Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] overflow-y-auto pr-2">
                            <div className="relative space-y-6">
                                { appointmentResponses.map((appointment, index, array) => (
                                    <div key={1} className="relative pl-6 group">
                                        <div className={`absolute left-0 top-2 h-2 w-2 rounded-full ${'bg-yellow-500'}`} />
                                        {index !== array.length - 1 && (
                                            <div className="absolute left-[3px] top-4 h-full w-[2px] bg-border" />
                                        )}
                                        <div className="space-y-1 p-2 rounded-md transition-colors duration-200 group-hover:bg-accent">
                                            <p className="text-sm text-muted-foreground">{appointment.appDateTime}</p>
                                            <p className="font-medium">{appointment.appointmentName}</p>
                                            <p className="text-sm text-muted-foreground">{appointment.serviceProvider.providerName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>


    )
}

export default AppointmentSchedule







