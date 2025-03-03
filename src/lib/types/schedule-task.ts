import {TaskStatus} from "@/lib/enums/task-status";

export interface ScheduleTask {
    id: number
    fertilizer?: {
        id: number
        name: string
        alias: string
        composition: string
        remarks: string
    }
    pesticide?: {
        id: number
        name: string
        alias: string
        activeIngredients: string[]
        applicationRate: string
        safetyInterval: number
        pesticideType: string
        modeOfAction: string
        targetPests: string[]
        targetDiseases: string[]
        alternatives: string | null
    }
    stageOfGrowth: {
        id: number
        periodUnit: string
        periodValue: number
    }
    applicationInterval: {
        id: number
        periodUnit: string
        periodValue: number
    }
    rate?: number
    applicationMethod: string
    remarks: string
    isCompleted: boolean
    completionDate: string | null
    taskRemarks: string | null
    taskStatus: TaskStatus
    taskDate: string
}