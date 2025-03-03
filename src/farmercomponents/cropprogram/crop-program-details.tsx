"use client"

import {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {useCropProgramContext} from "@/context/CropProgramContext";
import {CropProgram} from "@/lib/types/crop-program";
import {Schedule} from "@/lib/types/schedule";

interface CropProgramDetailsProps {
    programId: number
    onClose: () => void
}

export default function CropProgramDetails({programId, onClose}: CropProgramDetailsProps) {

    const {getCropProgramById} = useCropProgramContext();

    const [program, setProgram] = useState<CropProgram | null>(null);

    // Fetch program data when component mounts or programId changes
    // Fetch program data only when programId changes
    useEffect(() => {
        let isMounted = true;
        console.log("CropProgramDetails");

        const fetchProgram = async () => {
            try {
                // setLoading(true);
                const programData = await getCropProgramById(programId);
                if (programData && isMounted) {
                    setProgram(programData);
                    console.log("Program data received:", programData);
                } else if (isMounted) {
                    // setError("Program not found");
                    console.log("Program not found")
                }
            } catch (err) {
                if (isMounted) {
                    // setError("Error fetching cropprogram details");
                    console.log("Error fetching cropprogram details:", err)
                }
            } finally {
                if (isMounted) {
                    // setLoading(false);
                    console.log("Finally")
                }
            }
        };

        fetchProgram();

        // Cleanup function to prevent setting state on unmounted component
        return () => {
            isMounted = false;
        };
    }, [programId]); // Remove getCropProgramById from dependencies since it's now memoized


    // Initialize tasks state as empty array
    const [tasks, setTasks] = useState<Schedule[]>([]);

    // Update tasks when program changes
    useEffect(() => {
        if (program) {
            setTasks([
                ...(program.fertilizerScheduleList || []),
                ...(program.pesticideScheduleList || []),
            ]);
        }
    }, [program]);

    if (!program) {
        console.log("!program");
        return null;
    }

    const handleTaskRemarks = (taskId: number, remarks: string) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? {...task, taskRemarks: remarks} : task)))
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crop Program Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Crop Information</h3>
                    <p>Name: {program.crop.name}</p>
                    <p>Family: {program.crop.family}</p>
                    <p>Genus: {program.crop.genus}</p>
                    <p>Species: {program.crop.species}</p>
                    <p>Sub-species: {program.crop.subSpecies}</p>
                    <p>Program Name: {program.name}</p>
                    <p>Description: {program.description}</p>
                    <p>Schedule Type: {program.cropScheduleType}</p>

                    <h3 className="text-lg font-semibold mt-6">Pesticide Schedule</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pesticide</TableHead>
                                <TableHead>Stage of Growth</TableHead>
                                <TableHead>Application Method</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {program.pesticideScheduleList.map((schedule) => (
                                <TableRow key={schedule.id}>
                                    <TableCell>{schedule.pesticide.name}</TableCell>
                                    <TableCell>{`${schedule.stageOfGrowth.periodValue} ${schedule.stageOfGrowth.periodUnit}`}</TableCell>
                                    <TableCell>{schedule.applicationMethod}</TableCell>
                                    <TableCell>{schedule.remarks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <h3 className="text-lg font-semibold mt-6">Fertilizer Schedule</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fertilizer</TableHead>
                                <TableHead>Stage of Growth</TableHead>
                                <TableHead>Application Method</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {program.fertilizerScheduleList.map((schedule) => (
                                <TableRow key={schedule.id}>
                                    <TableCell>{schedule.fertilizer.name}</TableCell>
                                    <TableCell>{`${schedule.stageOfGrowth.periodValue} ${schedule.stageOfGrowth.periodUnit}`}</TableCell>
                                    <TableCell>{schedule.applicationMethod}</TableCell>
                                    <TableCell>{schedule.rate}</TableCell>
                                    <TableCell>{schedule.remarks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}
