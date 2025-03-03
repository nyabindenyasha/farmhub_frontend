import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {CropVariety} from "@/lib/types/crop-variety";
import {BASE_URL} from "@/lib/constants";
import {CropVarietyRequest} from "@/othercomponents/cropvariety/create-crop-variety";
import {Toast} from "primereact/toast";

// Define the context type
interface CropVarietyContextType {
    cropVarieties: CropVariety[];
    getAllCropVarieties: () => Promise<void>;
    createCropVariety: (cropVarietyData: CropVarietyRequest) => Promise<{
        success: boolean;
        data?: CropVariety;
        error?: string
    }>;
    loading: boolean
}

// Create the context with a default value
export const CropVarietyContext = createContext<CropVarietyContextType | undefined>(undefined);

// Create the provider component
interface CropVarietyProviderProps {
    children: ReactNode;
}

export const CropVarietyProvider: React.FC<CropVarietyProviderProps> = ({children}) => {
    const [cropVarieties, setCropVarieties] = useState<CropVariety[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getAllCropVarieties = useCallback(async (): Promise<void> => {
        console.log(BASE_URL + "/v1/api/crop-variety")
        try {
            const response = await apiClient.get<CropVariety[]>(BASE_URL + "/v1/api/crop-variety");
            setCropVarieties(response.data);
        } catch (error) {
            console.error("Error fetching cropVarieties:", error);
        }
    }, []);

    const createCropVariety = async (cropVarietyData: CropVarietyRequest): Promise<{
        success: boolean;
        data?: CropVariety;
        error?: string
    }> => {
        console.log(JSON.stringify(cropVarietyData))
        try {
            const response = await apiClient.post<CropVariety>(BASE_URL + "/v1/api/crop-variety", cropVarietyData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCropVarieties([...cropVarieties, response.data]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Crop Variety created successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating Crop Variety:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create Crop Variety",
                life: 3000
            });
            return {success: false, error: "Failed to create Crop Variety"};
        } finally {
            setLoading(false);
        }
    };

    return (
        <CropVarietyContext.Provider value={{cropVarieties, getAllCropVarieties, createCropVariety, loading}}>
            <Toast ref={toast}/>
            {children}
        </CropVarietyContext.Provider>
    );
};

// Custom hook to use the CropVarietyContext
export const useCropVarietyContext = (): CropVarietyContextType => {
    const context = useContext(CropVarietyContext);
    if (!context) {
        throw new Error("useCropVarietyContext must be used within a CropVarietyProvider");
    }
    return context;
};