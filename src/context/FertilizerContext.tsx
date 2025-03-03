import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {Fertilizer} from "@/lib/types/fertilizer";
import {BASE_URL} from "@/lib/constants";
import {Toast} from "primereact/toast";

// Define the context type
interface FertilizerContextType {
    fertilizers: Fertilizer[];
    getAllFertilizers: () => Promise<void>;
    createFertilizer: (fertilizerData: Fertilizer) => Promise<{ success: boolean; data?: Fertilizer; error?: string }>;
    loading: boolean
}

export const FertilizerContext = createContext<FertilizerContextType | undefined>(undefined);

interface FertilizerProviderProps {
    children: ReactNode;
}

export const FertilizerProvider: React.FC<FertilizerProviderProps> = ({children}) => {
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getAllFertilizers = useCallback(async (): Promise<void> => {
            console.log(BASE_URL + "/v1/api/fertilizer")
            try {
                const response = await apiClient.get<Fertilizer[]>(BASE_URL + "/v1/api/fertilizer");
                console.log("response: ", response)
                setFertilizers(response.data);
            } catch (error) {
                console.error("Error fetching fertilizers:", error);
            }
        }, []
    );

    const createFertilizer = async (fertilizerData: Fertilizer): Promise<{
        success: boolean;
        data?: Fertilizer;
        error?: string
    }> => {
        setLoading(true);
        try {
            const response = await apiClient.post<Fertilizer>(BASE_URL + "/v1/api/fertilizer", fertilizerData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setFertilizers([...fertilizers, response.data]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Fertilizer created successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating fertilizer:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create crop",
                life: 3000
            });
            return {success: false, error: "Failed to create fertilizer"};
        } finally {
            setLoading(false);
        }
    };

    return (
        <FertilizerContext.Provider value={{fertilizers, getAllFertilizers, createFertilizer, loading}}>
            <Toast ref={toast}/>
            {children}
        </FertilizerContext.Provider>
    );
};

// Custom hook to use the FertilizerContext
export const useFertilizerContext = (): FertilizerContextType => {
    const context = useContext(FertilizerContext);
    if (!context) {
        throw new Error("useFertilizerContext must be used within a FertilizerProvider");
    }
    return context;
};