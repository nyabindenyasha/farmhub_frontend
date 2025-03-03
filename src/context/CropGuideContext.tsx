import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {Toast} from "primereact/toast";
import {CropGuide} from "@/lib/types/crop-guide";

interface CropGuideContextType {
    cropGuides: CropGuide[];
    getAllCropGuides: () => Promise<void>;
    getCropGuideById: (cropId: number) => Promise<CropGuide | null>;
    createCropGuide: (cropData: CropGuide) => Promise<{ success: boolean; data?: CropGuide; error?: string }>;
    loading: boolean
}

export const CropGuideContext = createContext<CropGuideContextType | undefined>(undefined);

interface CropGuideProviderProps {
    children: ReactNode;
}

export const CropGuideProvider: React.FC<CropGuideProviderProps> = ({children}) => {
    const [cropGuides, setCropGuides] = useState<CropGuide[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getAllCropGuides = useCallback(async (): Promise<void> => {
        try {
            const response = await apiClient.get<CropGuide[]>("/v1/api/crop/data");
            setCropGuides(response.data);

        } catch (error) {

            console.error("Error fetching crop guides:", error);
        }
    }, []);

    const getCropGuideById = useCallback(async (cropId: number): Promise<CropGuide | null> => {
            try {
                const response = await apiClient.get<CropGuide>("/v1/api/crop/data/" + cropId);
                return response.data;
            } catch (error) {
                console.error("Error Fetching CropGuide:", error);
                return null
            }
        }, []);

    const createCropGuide = async (cropData: CropGuide): Promise<{
        success: boolean;
        data?: CropGuide;
        error?: string
    }> => {
        setLoading(true);
        try {
            const response = await apiClient.post<CropGuide>("/v1/api/crop/data", cropData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCropGuides([...cropGuides, response.data]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Crop Guide created successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating crop guide:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create crop",
                life: 3000
            });
            return {success: false, error: "Failed to create crop"};
        } finally {
            setLoading(false);
        }
    };

    return (
        <CropGuideContext.Provider value={{cropGuides, getAllCropGuides, getCropGuideById, createCropGuide, loading}}>
            <Toast ref={toast}/>
            {children}
        </CropGuideContext.Provider>
    );
};

// Custom hook to use the CropContext
export const useCropGuideContext = (): CropGuideContextType => {
    const context = useContext(CropGuideContext);
    if (!context) {
        throw new Error("useCropGuideContext must be used within a CropGuideProvider");
    }
    return context;
};
