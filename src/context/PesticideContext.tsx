import React, {createContext, ReactNode, useCallback, useContext, useRef, useState} from "react";
import apiClient from "../utils/apiClient";
import {Pesticide} from "@/lib/types/pesticide";
import {BASE_URL} from "@/lib/constants";
import {Toast} from "primereact/toast";

interface PesticideContextType {
    pesticides: Pesticide[];
    getAllPesticides: () => Promise<void>;
    createPesticide: (pesticideData: Pesticide) => Promise<{ success: boolean; data?: Pesticide; error?: string }>;
    loading: boolean;
}

export const PesticideContext = createContext<PesticideContextType | undefined>(undefined);

interface PesticideProviderProps {
    children: ReactNode;
}

export const PesticideProvider: React.FC<PesticideProviderProps> = ({children}) => {
    const [pesticides, setPesticides] = useState<Pesticide[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast | null>(null);

    const getAllPesticides = useCallback(async (): Promise<void> => {
            console.log(BASE_URL + "/v1/api/chemical")
            try {
                const response = await apiClient.get<Pesticide[]>(BASE_URL + "/v1/api/pesticide");
                setPesticides(response.data);
            } catch (error) {
                console.error("Error fetching pesticides:", error);
            }
        }, []
    );


    const createPesticide = async (pesticideData: Pesticide): Promise<{
        success: boolean;
        data?: Pesticide;
        error?: string
    }> => {
        setLoading(true);
        try {
            const response = await apiClient.post<Pesticide>(BASE_URL + "/v1/api/pesticide", pesticideData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setPesticides([...pesticides, response.data]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Pesticide created successfully",
                life: 3000
            });
            return {success: true, data: response.data};
        } catch (error) {
            console.error("Error creating chemical:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create chemical",
                life: 3000
            });
            return {success: false, error: "Failed to create chemical"};
        } finally {
            setLoading(false);
        }
    };

    return (
        <PesticideContext.Provider value={{pesticides, getAllPesticides, createPesticide, loading}}>
            <Toast ref={toast}/>
            {children}
        </PesticideContext.Provider>
    );
};

// Custom hook to use the PesticideContext
export const usePesticideContext = (): PesticideContextType => {
    const context = useContext(PesticideContext);
    if (!context) {
        throw new Error("usePesticideContext must be used within a PesticideProvider");
    }
    return context;
};