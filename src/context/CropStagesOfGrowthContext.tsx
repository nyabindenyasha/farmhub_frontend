import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {CropStagesOfGrowth} from "@/lib/types/crop-stages-of-growth";
import {CropStagesOfGrowthRequest} from "@/othercomponents/cropstages/create-crop-stages-of-growth";
import {Toast} from "primereact/toast";

// Define the context type
interface CropStagesOfGrowthContextType {
    cropStagesOfGrowths: CropStagesOfGrowth[];
    getAllCropStagesOfGrowths: () => Promise<void>;
    createCropStagesOfGrowth: (cropStagesOfGrowthData: CropStagesOfGrowthRequest) => Promise<{
        success: boolean;
        data?: CropStagesOfGrowth;
        error?: string
    }>;
    loading: boolean
}

// Create the context with a default value
export const CropStagesOfGrowthContext = createContext<CropStagesOfGrowthContextType | undefined>(undefined);

// Create the provider component
interface CropStagesOfGrowthProviderProps {
    children: ReactNode;
}

export const CropStagesOfGrowthProvider: React.FC<CropStagesOfGrowthProviderProps> = ({children}) => {
    const [cropStagesOfGrowths, setCropStagesOfGrowths] = useState<CropStagesOfGrowth[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);


    const getAllCropStagesOfGrowths = useCallback(async (): Promise<void> => {
        try {
            const response = await apiClient.get<CropStagesOfGrowth[]>("/v1/api/crop-stages-of-growth");
            setCropStagesOfGrowths(response.data);
        } catch (error) {
            console.error("Error fetching cropStagesOfGrowths:", error);
        }
    }, []);

    const createCropStagesOfGrowth = async (cropStagesOfGrowthData: CropStagesOfGrowthRequest): Promise<{
        success: boolean;
        data?: CropStagesOfGrowth;
        error?: string
    }> => {
        try {
            const response = await apiClient.post<CropStagesOfGrowth>("/v1/api/crop-stages-of-growth", cropStagesOfGrowthData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Crop Stages Of Growth created successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating Crop Stages Of Growth:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create Crop Stages Of Growth",
                life: 3000
            });
            return {success: false, error: "Failed to create Stages Of Growth Variety"};
        } finally {
            setLoading(false);
        }
    };

    return (
        <CropStagesOfGrowthContext.Provider
            value={{cropStagesOfGrowths, getAllCropStagesOfGrowths, createCropStagesOfGrowth, loading}}>
            <Toast ref={toast}/>
            {children}
        </CropStagesOfGrowthContext.Provider>
    );
};

// Custom hook to use the CropStagesOfGrowthContext
export const useCropStagesOfGrowthContext = (): CropStagesOfGrowthContextType => {
    const context = useContext(CropStagesOfGrowthContext);
    if (!context) {
        throw new Error("useCropStagesOfGrowthContext must be used within a CropStagesOfGrowthProvider");
    }
    return context;
};