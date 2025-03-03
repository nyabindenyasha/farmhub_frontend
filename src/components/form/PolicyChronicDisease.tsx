'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select'
import {AddButton} from './AddButton'
import {ScrollArea} from "@/components/ui/scroll-area"

const steps = [
    { id: 'basic', title: 'Basic Information' },
    { id: 'social', title: 'Social Demographic' },
    { id: 'treatment', title: 'Treatment Plan' },
    { id: 'allergies', title: 'Allergies' },
    { id: 'medications', title: 'Medications' },
    { id: 'history', title: 'Treatment History' },
]

export default function ChronicDiseaseForm() {
    const [chronicDiseases, setChronicDiseases] = useState<any[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<any>({
        allergyRequests: [],
        medicationRequests: [],
        historyRequests: [],
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleNestedInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, category: string) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [name]: value,
            },
        }))
    }

    const handleArrayInputChange = (index: number, field: string, value: string, arrayName: string) => {
        setFormData((prev: any) => {
            const newArray = [...prev[arrayName]]
            newArray[index] = { ...newArray[index], [field]: value }
            return { ...prev, [arrayName]: newArray }
        })
    }

    const addArrayItem = (arrayName: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [arrayName]: [...prev[arrayName], {}],
        }))
    }

    const removeArrayItem = (index: number, arrayName: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_: any, i: number) => i !== index),
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setChronicDiseases([...chronicDiseases, formData])
        setFormData({
            allergyRequests: [],
            medicationRequests: [],
            historyRequests: [],
        })
        setCurrentStep(0)
    }

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chronic Disease Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <AddButton label="Add Chronic Disease" onClick={() => {}} />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] w-[90vw]">
                        <DialogHeader>
                            <DialogTitle>Add Chronic Disease - {steps[currentStep].title}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {currentStep === 0 && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="policyMemberId">Policy Member ID</Label>
                                            <Input
                                                id="policyMemberId"
                                                name="policyMemberId"
                                                type="number"
                                                placeholder="Enter policy member ID"
                                                onChange={handleInputChange}
                                                value={formData.policyMemberId || ''}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="diagnosisDate">Diagnosis Date</Label>
                                            <Input
                                                id="diagnosisDate"
                                                name="diagnosisDate"
                                                type="date"
                                                onChange={handleInputChange}
                                                value={formData.diagnosisDate || ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="chronicDiseaseName">Chronic Disease Name</Label>
                                            <Input
                                                id="chronicDiseaseName"
                                                name="chronicDiseaseName"
                                                placeholder="Enter chronic disease name"
                                                onChange={handleInputChange}
                                                value={formData.chronicDiseaseName || ''}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="chronicType">Chronic Type</Label>
                                            <Select name="chronicType" onValueChange={(value) => handleInputChange({ target: { name: 'chronicType', value } } as any)}>
                                                <SelectTrigger id="chronicType">
                                                    <SelectValue placeholder="Select chronic type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CARDIOVASCULAR">Cardiovascular</SelectItem>
                                                    <SelectItem value="RESPIRATORY">Respiratory</SelectItem>
                                                    <SelectItem value="ENDOCRINE">Endocrine</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </>
                            )}

                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <Label>Social Demographic</Label>
                                    <Input
                                        name="occupation"
                                        placeholder="Occupation"
                                        onChange={(e) => handleNestedInputChange(e, 'socialDemographic')}
                                        value={formData.socialDemographic?.occupation || ''}
                                    />
                                    <Select
                                        name="maritalStatus"
                                        onValueChange={(value) => handleNestedInputChange({ target: { name: 'maritalStatus', value } } as any, 'socialDemographic')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Marital Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SINGLE">Single</SelectItem>
                                            <SelectItem value="MARRIED">Married</SelectItem>
                                            <SelectItem value="DIVORCED">Divorced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        name="educationLevel"
                                        onValueChange={(value) => handleNestedInputChange({ target: { name: 'educationLevel', value } } as any, 'socialDemographic')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Education Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NONE">None</SelectItem>
                                            <SelectItem value="PRIMARY">Primary</SelectItem>
                                            <SelectItem value="SECONDARY">Secondary</SelectItem>
                                            <SelectItem value="TERTIARY">Tertiary</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        name="alcoholConsumption"
                                        onValueChange={(value) => handleNestedInputChange({ target: { name: 'alcoholConsumption', value } } as any, 'socialDemographic')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Alcohol Consumption" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NONE">None</SelectItem>
                                            <SelectItem value="OCCASIONAL">Occasional</SelectItem>
                                            <SelectItem value="REGULAR">Regular</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        name="exerciseHabits"
                                        onValueChange={(value) => handleNestedInputChange({ target: { name: 'exerciseHabits', value } } as any, 'socialDemographic')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Exercise Habits" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NONE">None</SelectItem>
                                            <SelectItem value="OCCASIONAL">Occasional</SelectItem>
                                            <SelectItem value="REGULAR">Regular</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <Label>Treatment Plan</Label>
                                    <Input
                                        name="treatmentIntervals"
                                        placeholder="Treatment Intervals"
                                        onChange={(e) => handleNestedInputChange(e, 'treatmentPlan')}
                                        value={formData.treatmentPlan?.treatmentIntervals || ''}
                                    />
                                    <Textarea
                                        name="planDescription"
                                        placeholder="Plan Description"
                                        // onChange={(e) => handleNestedInputChange(e, 'treatmentPlan')}
                                        value={formData.treatmentPlan?.planDescription || ''}
                                    />
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <Label>Allergies</Label>
                                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                                        {formData.allergyRequests.slice(0, 3).map((allergy: any, index: number) => (
                                            <div key={index} className="space-y-2 mb-4">
                                                <Input
                                                    placeholder="Allergy Name"
                                                    onChange={(e) => handleArrayInputChange(index, 'allergyName', e.target.value, 'allergyRequests')}
                                                    value={allergy.allergyName || ''}
                                                />
                                                <Input
                                                    placeholder="Allergy Description"
                                                    onChange={(e) => handleArrayInputChange(index, 'allergyDescription', e.target.value, 'allergyRequests')}
                                                    value={allergy.allergyDescription || ''}
                                                />
                                                <Input
                                                    placeholder="Medication Recommendation"
                                                    onChange={(e) => handleArrayInputChange(index, 'medicationRecommendation', e.target.value, 'allergyRequests')}
                                                    value={allergy.medicationRecommendation || ''}
                                                />
                                                <Button type="button" variant="destructive" onClick={() => removeArrayItem(index, 'allergyRequests')}>
                                                    Remove Allergy
                                                </Button>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                    {formData.allergyRequests.length < 3 && (
                                        <Button type="button" onClick={() => addArrayItem('allergyRequests')}>Add Allergy</Button>
                                    )}
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-4">
                                    <Label>Medications</Label>
                                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                                        {formData.medicationRequests.slice(0, 3).map((medication: any, index: number) => (
                                            <div key={index} className="space-y-2 mb-4">
                                                <Input
                                                    placeholder="Medication Name"
                                                    onChange={(e) => handleArrayInputChange(index, 'medicationName', e.target.value, 'medicationRequests')}
                                                    value={medication.medicationName || ''}
                                                />
                                                <Select
                                                    onValueChange={(value) => handleArrayInputChange(index, 'medicationType', value, 'medicationRequests')}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Medication Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ANTIHISTAMINE">Antihistamine</SelectItem>
                                                        <SelectItem value="ANALGESIC">Analgesic</SelectItem>
                                                        <SelectItem value="ANTIBIOTIC">Antibiotic</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Select
                                                    onValueChange={(value) => handleArrayInputChange(index, 'dosageType', value, 'medicationRequests')}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Dosage Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="TABLET">Tablet</SelectItem>
                                                        <SelectItem value="CAPSULE">Capsule</SelectItem>
                                                        <SelectItem value="LIQUID">Liquid</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button type="button" variant="destructive" onClick={() => removeArrayItem(index, 'medicationRequests')}>
                                                    Remove Medication
                                                </Button>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                    {formData.medicationRequests.length < 3 && (
                                        <Button type="button" onClick={() => addArrayItem('medicationRequests')}>Add Medication</Button>
                                    )}
                                </div>
                            )}

                            {currentStep === 5 && (
                                <div className="space-y-4">
                                    <Label>Treatment History</Label>
                                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                                        {formData.historyRequests.slice(0, 3).map((history: any, index: number) => (
                                            <div key={index} className="space-y-2 mb-4">
                                                <Input
                                                    type="date"
                                                    onChange={(e) => handleArrayInputChange(index, 'treatmentDate', e.target.value, 'historyRequests')}
                                                    value={history.treatmentDate || ''}
                                                />
                                                <Textarea
                                                    placeholder="Treatment Description"
                                                    onChange={(e) => handleArrayInputChange(index, 'treatmentDescription', e.target.value, 'historyRequests')}
                                                    value={history.treatmentDescription || ''}
                                                />
                                                <Button type="button" variant="destructive" onClick={() => removeArrayItem(index, 'historyRequests')}>
                                                    Remove Treatment History
                                                </Button>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                    {formData.historyRequests.length < 3 && (
                                        <Button type="button" onClick={() => addArrayItem('historyRequests')}>Add Treatment History</Button>
                                    )}
                                </div>
                            )}

                            <DialogFooter>
                                {currentStep > 0 && (
                                    <Button type="button" variant="outline" onClick={prevStep}>
                                        Previous
                                    </Button>
                                )}
                                {currentStep < steps.length - 1 && (
                                    <Button type="button" onClick={nextStep}>
                                        Next
                                    </Button>
                                )}
                                {currentStep === steps.length - 1 && (
                                    <Button type="submit">Save Chronic Disease</Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                {chronicDiseases.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Added Chronic Diseases:</h3>
                        <ul className="list-disc pl-5">
                            {chronicDiseases.map((disease, index) => (
                                <li key={index}>{disease.chronicDiseaseName} - {disease.chronicType}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

