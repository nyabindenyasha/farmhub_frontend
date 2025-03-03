import {Calendar, Mail, Phone, User} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {PolicyMember} from "@/lib/types";


function PatientBasicInfo({policyMember}:{policyMember: PolicyMember}) {
    const member = policyMember || {}
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Basic Informational</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Gender</p>
                            <p>{member.gender}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Birthday</p>
                            <p>{member.dateOfBirth}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Phone Number</p>
                            <p>{member.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>{member.email}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-2 p-4">Sources</p>
                        <div className="flex gap-2">
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default PatientBasicInfo



