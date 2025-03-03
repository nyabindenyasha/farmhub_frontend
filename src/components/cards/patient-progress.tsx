import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

const data = [
    { name: 'Mon', completedAssessments: 4, pendingAssessments: 2, carePlanProgress: 75, average: 60 },
    { name: 'Tue', completedAssessments: 3, pendingAssessments: 1, carePlanProgress: 80, average: 61 },
    { name: 'Wed', completedAssessments: 5, pendingAssessments: 3, carePlanProgress: 72, average: 63 },
    { name: 'Thu', completedAssessments: 6, pendingAssessments: 2, carePlanProgress: 78, average: 65 },
    { name: 'Fri', completedAssessments: 4, pendingAssessments: 4, carePlanProgress: 70, average: 62 },
    { name: 'Sat', completedAssessments: 3, pendingAssessments: 1, carePlanProgress: 85, average: 64 },
    { name: 'Sun', completedAssessments: 2, pendingAssessments: 2, carePlanProgress: 82, average: 63 },
]

export function PatientProgressGraph() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Care Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="completedAssessments" stroke="#10B981" name="Completed Assessments" />
                            <Line type="monotone" dataKey="pendingAssessments" stroke="#F59E0B" name="Pending Assessments" />
                            <Line type="monotone" dataKey="carePlanProgress" stroke="#3B82F6" name="Care Plan Progress" />
                            <Line type="monotone" dataKey="average" stroke="#6B7280" name="Average" strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

