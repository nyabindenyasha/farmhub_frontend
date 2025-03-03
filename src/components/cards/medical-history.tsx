import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Trash2} from "lucide-react";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {MedicalHistoryResponse} from "@/lib/types";


const medicalHistory : {
    doctorName: string;
    diagnosis: string;
    date: string;
    disease: string;
}[] = [
    {
        doctorName: "Dr. John Doe",
        diagnosis: "Cardiology",
        date: "2024-03-15",
        disease: "Heart Disease"
    },
    {
        doctorName: "Dr. Jane Smith",
        diagnosis: "Pediatrics",
        date: "2024-02-20",
        disease: "Flu"
    },
    {
        doctorName: "Dr. Michael Johnson",
        diagnosis: "Orthopedics",
        date: "2024-01-10",
        disease: "Fractured ankle"
    },
    {
        doctorName: "Dr. Emily Brown",
        diagnosis: "Dermatology",
        date: "2023-12-05",
        disease: "Skin rash"
    },



];
export function MedicalHistory({medicalHistoryResponse}:{medicalHistoryResponse: MedicalHistoryResponse[]}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Medical History</CardTitle>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost">Show all</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Full Medical History</DialogTitle>
                        </DialogHeader>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Doctor name</TableHead>
                                    <TableHead>Diagnosis</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Disease</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {medicalHistoryResponse.map((history, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{history.doctorName}</TableCell>
                                        <TableCell>{history.diagnosis}</TableCell>
                                        <TableCell>{history.treatmentDate}</TableCell>
                                        <TableCell>{history.disease}</TableCell>
                                        <TableCell>{history.treatmentDescription}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30px]">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </TableHead>
                                <TableHead>Doctor name</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Disease</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medicalHistoryResponse.map((history, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </TableCell>
                                    <TableCell className="font-medium">{history.doctorName}</TableCell>
                                    <TableCell>{history.diagnosis}</TableCell>
                                    <TableCell>{history.treatmentDate}</TableCell>
                                    <TableCell>{history.disease}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

