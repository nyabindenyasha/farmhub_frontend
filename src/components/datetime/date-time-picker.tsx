"use client"

import {useEffect, useState} from "react"
import {format} from "date-fns"
import {CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

interface DateTimePickerProps {
    value: string
    onChange: (value: string) => void
    label?: string
}

export function DateTimePicker({ value, onChange, label }: DateTimePickerProps) {
    const [date, setDate] = useState<Date | undefined>(() => (value ? new Date(value) : new Date()))
    const [time, setTime] = useState(() => {
        if (value) {
            const [, timeStr] = value.split(" ")
            const [hours, minutes, seconds] = timeStr.split(":")
            return { hours, minutes, seconds }
        }
        const now = new Date()
        return {
            hours: now.getHours().toString().padStart(2, "0"),
            minutes: now.getMinutes().toString().padStart(2, "0"),
            seconds: now.getSeconds().toString().padStart(2, "0"),
        }
    })

    useEffect(() => {
        if (!value) {
            const now = new Date()
            setDate(now)
            setTime({
                hours: now.getHours().toString().padStart(2, "0"),
                minutes: now.getMinutes().toString().padStart(2, "0"),
                seconds: now.getSeconds().toString().padStart(2, "0"),
            })
        }
    }, [value])

    const formatDateTime = (selectedDate: Date | undefined, selectedTime: typeof time) => {
        if (!selectedDate) return ""
        const { hours, minutes, seconds } = selectedTime
        const formattedDate = format(selectedDate, "yyyy-MM-dd")
        return `${formattedDate} ${hours}:${minutes}:${seconds}`
    }

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        onChange(formatDateTime(newDate, time))
    }

    const handleTimeChange = (field: "hours" | "minutes" | "seconds", value: string) => {
        const numValue = Number.parseInt(value, 10)
        if (isNaN(numValue)) return

        let formattedValue = numValue.toString().padStart(2, "0")
        if (field === "hours" && numValue > 23) formattedValue = "23"
        if ((field === "minutes" || field === "seconds") && numValue > 59) formattedValue = "59"

        const newTime = { ...time, [field]: formattedValue }
        setTime(newTime)
        onChange(formatDateTime(date, newTime))
    }

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}
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
                        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
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
        </div>
    )
}

