import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {CropBatch} from "@/lib/types/crop-batch";
import {CropBatchRequest} from "@/farmercomponents/cropbatches/create-crop-batch";
import {Toast} from "primereact/toast";
import {Crop} from "@/lib/types/crop";
import {CropBatchTaskUpdateRequest} from "@/lib/types/crop-batch-task-update-request";


// Define the context type
interface CropBatchContextType {
    cropBatches: CropBatch[];
    getAllCropBatches: () => Promise<void>;
    getCropBatchById: (id: number) => Promise<CropBatch | null>
    createCropBatch: (cropBatchData: CropBatchRequest) => Promise<{
        success: boolean;
        data?: CropBatch;
        error?: string
    }>;
    updateCropBatchTask: (cropBatchTaskUpdateRequest: CropBatchTaskUpdateRequest) => Promise<{
        success: boolean;
        data?: CropBatch;
        error?: string
    }>;
    loading: boolean
}

// Create the context with a default value
export const CropBatchContext = createContext<CropBatchContextType | undefined>(undefined);

// Create the provider component
interface CropBatchProviderProps {
    children: ReactNode;
}

export const CropBatchProvider: React.FC<CropBatchProviderProps> = ({children}) => {

    const [cropBatches, setCropBatches] = useState<CropBatch[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getAllCropBatches = useCallback(async (): Promise<void> => {
        try {
            const response = await apiClient.get<CropBatch[]>("/v1/api/crop/batch");
            setCropBatches(response.data);
        } catch (error) {
            console.error("Error fetching Crop Batches:", error);
        }
    }, []);

    const getCropBatchById = useCallback(async (id: number): Promise<CropBatch | null> => {
        try {
            const response = await apiClient.get<CropBatch>("/v1/api/crop/batch/" + id);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return null;
        }
    }, []);

    const createCropBatch = useCallback(async (cropBatchData: CropBatchRequest): Promise<{
        success: boolean;
        data?: CropBatch;
        error?: string
    }> => {
        setLoading(true);
        try {
            const response = await apiClient.post<CropBatch>("/v1/api/crop/batch", cropBatchData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCropBatches(prevBatches => [...prevBatches, response.data]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Crop Batch created successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating crop:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create crop batch",
                life: 3000
            });
            return {success: false, error: "Failed to create crop"};
        } finally {
            setLoading(false);
        }

    }, []);

    const updateCropBatchTask = useCallback(async (cropBatchTaskUpdateRequest: CropBatchTaskUpdateRequest): Promise<{
        success: boolean;
        data?: CropBatch;
        error?: string
    }> => {
        setLoading(true);
        try {
            const response = await apiClient.put<CropBatch>("/v1/api/crop/batch/update-task", cropBatchTaskUpdateRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    //        setCropBatches(cropBatches.map((cropBatch) => (cropBatch.id === response.data.id ? response.data : cropBatch)))
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Crop Batch Updated successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating crop:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to update crop batch",
                life: 3000
            });
            return {success: false, error: "Failed to create crop"};
        } finally {
            setLoading(false);
        }

    }, []);

    return (
        <CropBatchContext.Provider value={{cropBatches, getAllCropBatches, getCropBatchById, createCropBatch, updateCropBatchTask, loading}}>
            {children}
        </CropBatchContext.Provider>
    );
};

// Custom hook to use the CropBatchContext
export const useCropBatchContext = (): CropBatchContextType => {
    const context = useContext(CropBatchContext);
    if (!context) {
        throw new Error("useCropBatchContext must be used within a CropBatchProvider");
    }
    return context;
};
