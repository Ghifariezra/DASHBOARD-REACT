import { Request, Response } from "express";
import { provinces, province } from "../../services/school/schoolService";

export const getAllProvinces = async (req: Request, res: Response) => {
    const data = await provinces();

    return res.status(200).json({ data });
};

export const getProvince = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await province(parseInt(id));

    if (!data) return res.status(404).json({ message: "Province not found" });

    return res.status(200).json({ data });
};