import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Download, Filter, Plus, RotateCcw, Settings} from 'lucide-react'
import {OvertimeCard} from "@/components/cards/overtime-card";
import {ReportDownloadOptions} from "@/components/report-download-options";
import {PatientProgressGraph} from "@/components/cards/patient-progress";
import {PatientActivitiesTable} from "@/components/table/patient-activities";


function Report(){
    return(
        <DashboardLayout>
            <div className="flex w-screen p-5 space-y-6 min-h-screen flex-col">
                <div className="w-full max-w-7xl mx-auto p-4 space-y-8">
                    <h2 className="text-2xl font-semibold mb-6">Managed Care Reports</h2>
                    <div className="flex gap-4 border-b">
                        <button className="px-4 py-2 text-muted-foreground hover:text-primary">Patient List</button>
                        <button className="px-4 py-2 text-muted-foreground hover:text-primary">Care Plans</button>
                        <button className="px-4 py-2 border-b-2 border-primary">Assessments</button>
                        <button className="px-4 py-2 text-muted-foreground hover:text-primary">Medications</button>
                        <button className="px-4 py-2 text-muted-foreground hover:text-primary">Appointments</button>
                        <button className="px-4 py-2 text-muted-foreground hover:text-primary">Reports</button>
                        <button className="px-4 py-2 text-muted-foreground hover:text-primary">Team Collaboration
                        </button>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="relative">
                            <select className="h-9 px-3 py-1 bg-background border rounded-md w-40">
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>Custom Range</option>
                            </select>
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2"/>
                            Filters
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <PatientProgressGraph/>
                        </div>
                        <div>
                            <OvertimeCard totalHours={40} overtimeHours={5} amountDue={1250}/>
                        </div>
                    </div>

                    <ReportDownloadOptions/>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Patient Activities</h3>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Search patients, assessments..."
                                    className="w-[300px]"
                                />
                                <Button variant="outline" size="icon">
                                    <RotateCcw className="h-4 w-4"/>
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4"/>
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Settings className="h-4 w-4"/>
                                </Button>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Add
                                </Button>
                            </div>
                        </div>

                        <PatientActivitiesTable/>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )

}

export default Report


