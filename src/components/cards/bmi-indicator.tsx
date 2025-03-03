import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ChevronDown} from 'lucide-react'

export function BMIIndicator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Body Mass index</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="flex justify-between">
                        <div className="text-center">
                            <ChevronDown className="mx-auto h-6 w-6 text-teal-500" />
                            <div className="text-2xl font-bold">76</div>
                            <div className="text-sm text-muted-foreground">kg</div>
                        </div>
                        <div className="text-center">
                            <ChevronDown className="mx-auto h-6 w-6 text-teal-500" />
                            <div className="text-2xl font-bold">68</div>
                            <div className="text-sm text-muted-foreground">kg</div>
                        </div>
                        <div className="text-center">
                            <ChevronDown className="mx-auto h-6 w-6 text-teal-500" />
                            <div className="text-2xl font-bold">70</div>
                            <div className="text-sm text-muted-foreground">kg</div>
                        </div>
                    </div>
                    <div className="relative h-4 w-full rounded-full bg-gray-100">
                        <div className="absolute left-1/3 right-1/3 h-full rounded-full bg-teal-500"></div>
                        <div className="absolute left-1/3 top-full mt-2 -translate-x-1/2 text-sm text-muted-foreground">
                            Underweight
                        </div>
                        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 text-sm font-medium text-teal-500">
                            Normal (45.5)
                        </div>
                        <div className="absolute right-1/3 top-full mt-2 translate-x-1/2 text-sm text-muted-foreground">
                            Overweight
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

