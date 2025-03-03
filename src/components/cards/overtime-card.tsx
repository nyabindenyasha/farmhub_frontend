import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

interface OvertimeCardProps {
    totalHours: number
    overtimeHours: number
    amountDue: number
}

export function OvertimeCard({ totalHours, overtimeHours, amountDue }: OvertimeCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overtime Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                        <p className="text-2xl font-bold">{totalHours}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Overtime Hours</p>
                        <p className="text-2xl font-bold">{overtimeHours}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Amount Due</p>
                        <p className="text-2xl font-bold">${amountDue.toFixed(2)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

