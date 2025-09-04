import { revitalitas } from "@/utils/api/revitalitas";
import { useQuery } from "@tanstack/react-query";
import type { Provinces } from "@/types/provinces";

export const useQueryProvinces = () => {
    const fetch = useQuery({
        queryKey: ["provinces"],
        queryFn: () => revitalitas.get("/provinces").then(res => res.data.data),
    })

    return {
        ...fetch,
        data: fetch.data as Provinces[],
    }
};

export const useQueryProvince = (id: string) => {
    const fetch = useQuery({
        queryKey: ["province", id],
        queryFn: () => revitalitas.get(`/provinces/${id}`).then(res => res.data.data),
        enabled: !!id
    })

    return {
        ...fetch,
        data: fetch.data as Provinces[],
    }
}