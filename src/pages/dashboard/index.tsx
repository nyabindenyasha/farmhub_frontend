import React, {useEffect, useState} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import PrimaryButton from "@/components/buttons/customButton";
import {Calendar, ChevronRight, DollarSign, Scissors, TrendingUp, Users} from "lucide-react";
import MetricCard from "@/components/cards/metrics";
import {Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {useUser} from "@/hooks/useUser";

const departmentData = [
    { name: 'Neurology', value: 35, color: '#5f9ea0' },
    { name: 'Dental Care', value: 25, color: '#ff7f50' },
    { name: 'Gynecology', value: 20, color: '#da70d6' },
    { name: 'Orthopedic', value: 20, color: '#ffa500' },
]
const monthlyData = [
    { name: 'Jan', male: 45, female: 30 },
    { name: 'Feb', male: 50, female: 25 },
    { name: 'Mar', male: 35, female: 45 },
    { name: 'Apr', male: 40, female: 35 },
    { name: 'May', male: 55, female: 30 },
    { name: 'Jun', male: 45, female: 40 },
    { name: 'Jul', male: 50, female: 35 },
    { name: 'Aug', male: 60, female: 40 },
    { name: 'Sep', male: 45, female: 35 },
    { name: 'Oct', male: 50, female: 30 },
    { name: 'Nov', male: 55, female: 35 },
    { name: 'Dec', male: 45, female: 40 },
]
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

function Dashboard() {

    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {user, getAllUsers, logout} = useUser()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers(); // Fetch users from the context
                setUsers(userList);
                setError(null);
            } catch (err) {
                console.error("Error loading users:", err);
                setError("Failed to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [getAllUsers]); // Add `getAllUsers` as a dependency

    console.log("all users on dashboard home page:  ", users)

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleCreateAppointment = async () => {
    }
    return (
        <DashboardLayout>
            <div className={" w-screen p-5 space-y-6"}>
                <div>
                    <header className="flex items-center gap-2 py-4">
                        <h1 className="text-2xl font-bold text-[#14532d]">Dashboard</h1>
                        <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                        <span className="text-muted-foreground text-[#a1a1aa]">Admin Dashboard</span>
                    </header>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-green-900">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="h-full w-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"/>
                    </div>
                    <div className="relative flex items-center justify-between p-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-white">Good Morning, {user?.userAccount.firstName + " " + user?.userAccount.lastName} </h2>
                            <p className="text-teal-50">
                                Today is a good day. Stay optimistic!
                            </p>
                            <PrimaryButton secondary text={"Create Appointment"} onClick={handleCreateAppointment}/>
                        </div>
                    </div>
                </div>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Patient Visit by Gender</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-[#5f9ea0] rounded-full"/>
                                        <span className="text-sm">Male 75%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-[#ffa500] rounded-full"/>
                                        <span className="text-sm">Female 25%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlyData}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Line type="monotone" dataKey="male" stroke="#5f9ea0" strokeWidth={2}/>
                                        <Line type="monotone" dataKey="female" stroke="#ffa500" strokeWidth={2}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>


                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Pie Chart - Label</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                            >
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>


            </div>

        </DashboardLayout>

    )


}

export default Dashboard
