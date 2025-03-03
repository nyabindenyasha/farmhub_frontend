import {Calendar, DollarSign, Scissors, Users} from 'lucide-react'
import {Card, CardContent} from "@/components/ui/card"

interface MetricCardProps {
    title: string
    value: string
    change: number
    icon: React.ReactNode
    color: string
}

function MetricCard({title, value, change, icon, color}: MetricCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-4xl font-bold">{value}</p>
                    <div className="flex items-center gap-1">
            <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
                        <span className="text-sm text-muted-foreground">vs last month</span>
                    </div>
                </div>
                <div className={`rounded-full p-4 ${color}`}>
                    {icon}
                </div>
            </CardContent>
        </Card>
    )
}

export default MetricCard
export function Metrics() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
                title="Appointment"
                value="250"
                change={40}
                icon={<Calendar className="h-6 w-6 text-white"/>}
                color="bg-teal-600"
            />
            <MetricCard
                title="New Patients"
                value="140"
                change={20}
                icon={<Users className="h-6 w-6 text-white"/>}
                color="bg-yellow-500"
            />
            <MetricCard
                title="Operations"
                value="56"
                change={-15}
                icon={<Scissors className="h-6 w-6 text-white"/>}
                color="bg-rose-500"
            />
            <MetricCard
                title="Earnings"
                value="$20.25"
                change={30}
                icon={<DollarSign className="h-6 w-6 text-white"/>}
                color="bg-blue-500"
            />
        </div>
    )
}

