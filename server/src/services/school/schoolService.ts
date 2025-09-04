import { prisma } from "../../../config/client";

export const provinces = async () => {
    const data = await prisma.school.findMany();

    const dataSafe = data.map(s => ({
        ...s,
        id: s.id.toString(),
        kode_pro: s.kode_pro?.toString(),
    }));

    return dataSafe;
};

export const province = async (id: number) => {
    // Cari semua provinsi dengan kode_pro yang sama
    const data = await prisma.school.findMany({
        where: { kode_pro: id },
    });

    const serialized = data.map(item =>
        Object.fromEntries(
            Object.entries(item).map(([key, value]) =>
                typeof value === "bigint" ? [key, value.toString()] : [key, value]
            )
        )
    );
    
    return serialized;
};