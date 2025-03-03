import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {Settings} from 'lucide-react'
import CustomStatus from "@/components/status/CustomStatus";

export function PatientActivitiesTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <input type="checkbox" className="rounded border-gray-300" />
                    </TableHead>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Care Plan</TableHead>
                    <TableHead>Last Assessment</TableHead>
                    <TableHead>Assigned Nurse</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>PT001</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>5 May 24</TableCell>
                    <TableCell>
                        <CustomStatus type="active" text="Active" />
                    </TableCell>
                    <TableCell>Diabetes Management</TableCell>
                    <TableCell>3 May 24</TableCell>
                    <TableCell>Nurse Smith</TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>PT002</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>6 May 24</TableCell>
                    <TableCell>
                        <CustomStatus type="active" text="Pending" />
                    </TableCell>
                    <TableCell>Post-Surgery Recovery</TableCell>
                    <TableCell>1 May 24</TableCell>
                    <TableCell>Nurse Johnson</TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

