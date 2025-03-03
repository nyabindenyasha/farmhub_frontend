import {Card, CardContent} from "@/components/ui/card"
import {Clock, Heart, Skull, ThumbsUp} from 'lucide-react'

interface MetricCardProps {
    title: string
    value: string | number
    unit: string
    change: number
    type: 'primary' | 'danger' | 'warning' | 'success'
    icon: 'heart' | 'skull' | 'thumbs' | 'clock'
}

const icons = {
    heart: Heart,
    skull: Skull,
    thumbs: ThumbsUp,
    clock: Clock,
}

const colors = {
    primary: 'text-blue-500 bg-blue-50',
    danger: 'text-red-500 bg-red-50',
    warning: 'text-amber-500 bg-amber-50',
    success: 'text-rose-500 bg-rose-50',
}

export function PatientMetricCard({ title, value, unit, change, type, icon }: MetricCardProps) {
    const Icon = icons[icon]
    const colorClass = colors[type]

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div className={`rounded-lg p-2 ${colorClass}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className={`rounded-full px-2 py-1 text-sm ${
                        change > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                        {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <div className="flex items-baseline">
                        <h3 className="text-2xl font-bold">{value}</h3>
                        <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">vs last month</p>
                </div>
            </CardContent>
        </Card>
    )
}

