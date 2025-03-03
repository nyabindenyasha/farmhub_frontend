"use client"

import {useState} from "react"
import {format} from "date-fns"
import {CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Input} from "@/components/ui/input"

export function DatePickerField() {
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState({ hours: "00", minutes: "00", seconds: "00" })

    const formatDateOfTransplant = () => {
        if (!date) return ""
        const { hours, minutes, seconds } = time
        const formattedDate = format(date, "yyyy-MM-dd")
        return `${formattedDate} ${hours}:${minutes}:${seconds}`
    }

    const handleTimeChange = (field: "hours" | "minutes" | "seconds", value: string) => {
        const numValue = Number.parseInt(value, 10)
        if (isNaN(numValue)) return

        let formattedValue = numValue.toString().padStart(2, "0")
        if (field === "hours" && numValue > 23) formattedValue = "23"
        if ((field === "minutes" || field === "seconds") && numValue > 59) formattedValue = "59"

        setTime((prev) => ({ ...prev, [field]: formattedValue }))
    }

    return (
        <div className="space-y-2">
            <label htmlFor="dateOfTransplant" className="block text-sm font-medium text-gray-700">
                Date of Transplant
            </label>
            <div className="flex space-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                </Popover>
                <Input
                    type="number"
                    value={time.hours}
                    onChange={(e) => handleTimeChange("hours", e.target.value)}
                    className="w-16"
                    min="0"
                    max="23"
                    placeholder="HH"
                />
                <Input
                    type="number"
                    value={time.minutes}
                    onChange={(e) => handleTimeChange("minutes", e.target.value)}
                    className="w-16"
                    min="0"
                    max="59"
                    placeholder="MM"
                />
                <Input
                    type="number"
                    value={time.seconds}
                    onChange={(e) => handleTimeChange("seconds", e.target.value)}
                    className="w-16"
                    min="0"
                    max="59"
                    placeholder="SS"
                />
            </div>
            <input type="hidden" id="dateOfTransplant" name="dateOfTransplant" value={formatDateOfTransplant()} />
            <p className="text-sm text-gray-500">Selected: {formatDateOfTransplant() || "No date selected"}</p>
        </div>
    )
}

