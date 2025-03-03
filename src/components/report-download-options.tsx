import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {FilePieChart, FileSpreadsheet, FileText} from 'lucide-react'

export function ReportDownloadOptions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Download Patient Reports</CardTitle>
                <CardDescription>Select and download various reports for your patients</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily Progress</SelectItem>
                                <SelectItem value="weekly">Weekly Summary</SelectItem>
                                <SelectItem value="monthly">Monthly Overview</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select data type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vitals">Vital Signs</SelectItem>
                                <SelectItem value="medications">Medication Adherence</SelectItem>
                                <SelectItem value="assessments">Assessment Scores</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full">
                            <FilePieChart className="mr-2 h-4 w-4" />
                            Download Charts
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="last-week">Last Week</SelectItem>
                                <SelectItem value="last-month">Last Month</SelectItem>
                                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full">
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Download Spreadsheet
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

