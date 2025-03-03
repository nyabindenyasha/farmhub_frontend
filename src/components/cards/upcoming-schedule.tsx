import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function UpcomingSchedules() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Schedules</CardTitle>
                <Select defaultValue="august">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="august">August</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {days.map((day) => (
                        <div key={day} className="font-medium">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                        <div
                            key={i}
                            className={`rounded-full p-2 text-sm ${
                                i === 14 ? 'bg-blue-500 text-white' : ''
                            }`}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

