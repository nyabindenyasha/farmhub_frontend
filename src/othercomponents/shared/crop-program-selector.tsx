"use client"

import {useEffect, useState} from "react"
import {Search} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"
import {CropProgram} from "@/lib/types/crop-program";
import {useCropProgramContext} from "@/context/CropProgramContext";
import {DialogProps} from "@/lib/types/dialog-props";

interface CropProgramSelectorProps {
    // crop: Crop | null
    crop: any
    onCropProgramSelect: (cropProgram: CropProgram) => void
    dialogProps: DialogProps
}

export function CropProgramSelector({crop, onCropProgramSelect, dialogProps}: CropProgramSelectorProps) {
    const {cropPrograms, getCropProgramsByCrop} = useCropProgramContext()
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCropProgram, setSelectedCropProgram] = useState<CropProgram | null>(null)
    const [filteredCropPrograms, setFilteredCropPrograms] = useState(cropPrograms)

    useEffect(() => {
        getCropProgramsByCrop(crop.id)
    }, [getCropProgramsByCrop])

    useEffect(() => {
        const filtered = cropPrograms.filter((cropProgram) => cropProgram.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredCropPrograms(filtered)
    }, [searchTerm])

    const handleCropProgramSelect = (cropProgram: CropProgram) => {
        setSelectedCropProgram(cropProgram)
        setIsOpen(false)
        onCropProgramSelect(cropProgram)  // Notify the parent component
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    {selectedCropProgram ? selectedCropProgram.name : "Select cropProgram..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[${dialogProps.width}px]`}>
                <DialogHeader>
                    <DialogTitle>{dialogProps.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Search cropPrograms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="col-span-3"
                    />
                    <ScrollArea className="h-[200px]">
                        {filteredCropPrograms.length === 0 ? (
                            <p className="text-sm text-muted-foreground p-2">
                                {cropPrograms.length === 0 ? "No cropPrograms available. Please add cropPrograms first." : "No cropProgram found. Type to search."}
                            </p>
                        ) : (
                            filteredCropPrograms.map((cropProgram) => (
                                <Button
                                    key={cropProgram.id}
                                    variant="ghost"
                                    className="w-full justify-start font-normal"
                                    onClick={() => handleCropProgramSelect(cropProgram)}
                                >
                                    <span className="truncate">{cropProgram.name} {cropProgram.cropScheduleType} </span>
                                </Button>
                            ))
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}