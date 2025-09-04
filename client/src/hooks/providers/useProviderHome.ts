import { createContext, useContext } from "react";
import { useData } from "@/hooks/data/useData";

export type ProviderHomeContext = ReturnType<typeof useData>;

export const ProviderHomeContext = createContext<ProviderHomeContext | null>(null);

export const useProviderHome = () => {
    const context = useContext(ProviderHomeContext);
    if (!context)
        throw new Error("useProviderHome must be used within a ProviderHome");
    return context;
};