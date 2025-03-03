"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Area, AreaChart, ResponsiveContainer, XAxis, YAxis} from "recharts"

const data = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 55 },
    { month: "Mar", value: 58 },
    { month: "Apr", value: 40 },
    { month: "May", value: 60 },
    { month: "Jun", value: 62 },
    { month: "Jul", value: 75 },
    { month: "Aug", value: 80 },
    { month: "Sep", value: 40 },
    { month: "Nov", value: 42 },
    { month: "Dec", value: 90 },
]

export function AreaChartMetric() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Static of your Health</CardTitle>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600">↑ 40% vs last month</span>
                        <select className="rounded-md border px-2 py-1 text-sm">
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#14b8a6"
                            fill="url(#gradient)"
                            fillOpacity={0.2}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

