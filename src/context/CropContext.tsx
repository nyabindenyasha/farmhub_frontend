import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {Crop} from "@/lib/types/crop";
import {Toast} from "primereact/toast";

interface CropContextType {
    crops: Crop[];
    getAllCrops: () => Promise<void>;
    createCrop: (cropData: Crop) => Promise<{ success: boolean; data?: Crop; error?: string}>;
    loading: boolean
}

export const CropContext = createContext<CropContextType | undefined>(undefined);

interface CropProviderProps {
    children: ReactNode;
}

export const CropProvider: React.FC<CropProviderProps> = ({children}) => {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getAllCrops = useCallback(async (): Promise<void> => {
        try {
            const response = await apiClient.get<Crop[]>("/v1/api/crop");
            setCrops(response.data);

        } catch (error) {

            console.error("Error fetching crops:", error);
        }
    }, []);

    const createCrop = async (cropData: Crop): Promise<{ success: boolean; data?: Crop; error?: string }> => {
        setLoading(true);
        console.log("### Creating crop:", JSON.stringify(cropData));
        try {
            const response = await apiClient.post<Crop>("/v1/api/crop", cropData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCrops([...crops, response.data]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Crop created successfully",
                life: 3000
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error creating crop:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create crop",
                life: 3000
            });
            return { success: false, error: "Failed to create crop" };
        } finally {
            setLoading(false);
        }
    };

    return (
        <CropContext.Provider value={{crops, getAllCrops, createCrop, loading}}>
            <Toast ref={toast}/>
            {children}
        </CropContext.Provider>
    );
};

// Custom hook to use the CropContext
export const useCropContext = (): CropContextType => {
    const context = useContext(CropContext);
    if (!context) {
        throw new Error("useCropContext must be used within a CropProvider");
    }
    return context;
};
