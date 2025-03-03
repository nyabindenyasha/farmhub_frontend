import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Maximize2, Minimize2} from "lucide-react"
import {PeriodUnit} from "@/lib/enums/period-unit";
import {Period} from "@/lib/types/period";
import {FertilizerApplicationMethod} from "@/lib/enums/fertilizer-application-method";
import {useFertilizerContext} from "@/context/FertilizerContext";
import {useEffect, useState} from "react";
import {Fertilizer} from "@/lib/types/fertilizer";

export interface FertilizerSchedule {
    cropScheduleId: number
    fertilizerId: number
    stageOfGrowth: Period
    applicationInterval: Period
    rate: number
    applicationMethod: FertilizerApplicationMethod
    remarks: string
    expanded: boolean
    fertilizerName: string
}

interface FertilizerScheduleFormProps {
    schedules: FertilizerSchedule[]
    onChange: (schedules: FertilizerSchedule[]) => void
}

export default function FertilizerScheduleForm({schedules, onChange}: FertilizerScheduleFormProps) {

    const {fertilizers, getAllFertilizers} = useFertilizerContext()
    const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | undefined>(undefined);
    const [search, setSearch] = useState("");

    let periodUnits = Object.keys(PeriodUnit);

    let applicationMethods = Object.keys(FertilizerApplicationMethod);

    useEffect(() => {
        getAllFertilizers()
    }, [getAllFertilizers])

    const handleAddSchedule = () => {
        const newSchedule: FertilizerSchedule = {
            cropScheduleId: schedules.length,
            fertilizerId: 0,
            stageOfGrowth: {periodUnit: PeriodUnit.DAYS, periodValue: 0},
            applicationInterval: {periodUnit: PeriodUnit.DAYS, periodValue: 0},
            rate: 0,
            applicationMethod: FertilizerApplicationMethod.SPOT_PLACEMENT,
            remarks: "",
            expanded: true, // New schedules are expanded by default
            fertilizerName: ""
        }
        onChange([...schedules, newSchedule])
    }

    const handleScheduleChange = (index: number, field: keyof FertilizerSchedule, value: any) => {
        console.log("index: ", index)
        console.log("value: ", value)
        const updatedSchedules = schedules.map((schedule, i) => {
            if (i === index) {
                return {...schedule, [field]: value}
            }
            schedule.fertilizerName = selectedFertilizer?.name as string;
            console.log(schedule)
            return schedule
        })
        console.log(updatedSchedules)
        onChange(updatedSchedules)
    }

    const toggleExpanded = (index: number) => {
        const updatedSchedules = schedules.map((schedule, i) => {
            if (i === index) {
                return {...schedule, expanded: !schedule.expanded}
            }
            return schedule
        })
        onChange(updatedSchedules)
    }

    const filteredItems = fertilizers.filter(fertilizer =>
        fertilizer.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fertilizer Schedules</h3>
            {schedules.map((schedule, index) => (
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-md font-semibold">Fertilizer Schedule {index + 1}</h4>
                        <Button variant="ghost" size="icon" onClick={() => toggleExpanded(index)}
                                className="h-8 w-8 p-0">
                            {schedule.expanded ? <Minimize2 className="h-4 w-4"/> : <Maximize2 className="h-4 w-4"/>}
                        </Button>
                    </div>
                    {!schedule.expanded && (
                        <div className="text-sm text-gray-500">
                            Fertilizer : {schedule.fertilizerName}, Rate: {schedule.rate}g,
                            Method: {schedule.applicationMethod}, Stage: {schedule.stageOfGrowth.periodValue} {schedule.stageOfGrowth.periodUnit}
                        </div>
                    )}
                    {schedule.expanded && (
                        <>
                            {/*<div className="mb-2">*/}
                            {/*    <Label htmlFor={`fertilizerId-${index}`}>Fertilizer ID</Label>*/}
                            {/*    <Input*/}
                            {/*        id={`fertilizerId-${index}`}*/}
                            {/*        type="number"*/}
                            {/*        value={schedule.fertilizerId}*/}
                            {/*        onChange={(e) => handleScheduleChange(index, "fertilizerId", Number.parseInt(e.target.value))}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div>
                                <Label htmlFor="name">Fertilizer</Label>
                                <Select onValueChange={(value) => {
                                    let fertilizer = fertilizers.find(item => item.name === value)
                                    setSelectedFertilizer(fertilizer)
                                    handleScheduleChange(index, "fertilizerId", fertilizer?.id)
                                }
                                }>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Fertilizer"/>
                                    </SelectTrigger>
                                    <SelectContent className="max-h-40 overflow-y-auto">
                                        <div className="p-2">
                                            <Input
                                                placeholder="Search..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="mb-2"
                                            />
                                        </div>
                                        {filteredItems.map(item => (
                                            <SelectItem key={item.name}
                                                        value={item.name}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {selectedFertilizer && (
                                    <p className="mt-2 text-sm text-gray-500">Selected: {selectedFertilizer.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor={`stageOfGrowth-${index}`}>Stage of Growth</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id={`stageOfGrowth-${index}`}
                                        type="number"
                                        value={schedule.stageOfGrowth.periodValue}
                                        onChange={(e) =>
                                            handleScheduleChange(index, "stageOfGrowth", {
                                                ...schedule.stageOfGrowth,
                                                periodValue: Number.parseInt(e.target.value),
                                            })
                                        }
                                    />
                                    <Select
                                        value={schedule.stageOfGrowth.periodUnit.toString()}
                                        onValueChange={(value) =>
                                            handleScheduleChange(index, "stageOfGrowth", {
                                                ...schedule.stageOfGrowth,
                                                periodUnit: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select unit"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {periodUnits.map((periodUnit) => (
                                                <SelectItem value={periodUnit}>
                                                    {periodUnit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor={`applicationInterval-${index}`}>Application Interval</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id={`applicationInterval-${index}`}
                                        type="number"
                                        value={schedule.applicationInterval.periodValue}
                                        onChange={(e) =>
                                            handleScheduleChange(index, "applicationInterval", {
                                                ...schedule.applicationInterval,
                                                periodValue: Number.parseInt(e.target.value),
                                            })
                                        }
                                    />
                                    <Select
                                        value={schedule.applicationInterval.periodUnit.toString()}
                                        onValueChange={(value) =>
                                            handleScheduleChange(index, "applicationInterval", {
                                                ...schedule.applicationInterval,
                                                periodUnit: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select unit"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {periodUnits.map((periodUnit) => (
                                                <SelectItem value={periodUnit}>
                                                    {periodUnit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor={`rate-${index}`}>Rate</Label>
                                <Input
                                    id={`rate-${index}`}
                                    type="number"
                                    value={schedule.rate}
                                    onChange={(e) => handleScheduleChange(index, "rate", Number.parseFloat(e.target.value))}
                                />
                            </div>
                            <div>
                                <Label htmlFor={`applicationMethod-${index}`}>Application Method</Label>
                                <Select
                                    value={schedule.applicationMethod.toString()}
                                    onValueChange={(value) =>
                                        handleScheduleChange(index, "applicationMethod", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select application method"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {applicationMethods.map((applicationMethod) => (
                                            <SelectItem value={applicationMethod}>
                                                {applicationMethod}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor={`remarks-${index}`}>Remarks</Label>
                                <Textarea
                                    id={`remarks-${index}`}
                                    value={schedule.remarks}
                                    onChange={(e) => handleScheduleChange(index, "remarks", e.target.value)}
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
            <Button type="button" onClick={handleAddSchedule}>
                Add Fertilizer Schedule
            </Button>
        </div>
    )
}