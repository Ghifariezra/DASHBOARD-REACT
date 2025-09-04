import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { geoID, sampleCoords } from "@/utils/geo/indonesia";
import { useQueryProvinces, useQueryProvince } from "@/hooks/query/useQueryProvinces";
import type { DataKab, RowData } from "@/types/provinces";

export const useData = () => {
    const barRef = useRef<HTMLDivElement>(null);
    const [openBar, setOpenBar] = useState(false);
    const [selectedKab, setSelectedKab] = useState<string | null>(null);
    const [center] = useState<[number, number]>(
        [-7.285360296123383, 109.7012369795483]
    );
    const [coordinates, setCoordinates] = useState<[number, number][]>([...sampleCoords]);
    const { data, isLoading } = useQueryProvinces();
    const { features } = geoID;

    // Mengambil data yang sesuai
    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];

        return features.filter(feature => {
            const match = data.find(d =>
                d.kode_pro === feature.properties.province_kemendagri_code &&
                d.nama_wilayah.toLowerCase() === feature.properties.province_kemendagri_name.toLowerCase()
            );
            return !!match;
        });
    }, [data, features]);

    // Mengambil data provinsi berdasarkan koordinat
    const findProvince = useMemo(() => {
        if (coordinates.length === 0) return undefined;

        const EPS = 0.0001;

        return filteredData.find(feature => {
            if (feature.geometry.type !== "MultiPolygon") return false;

            return feature.geometry.coordinates.some(polygon => {
                const polygonPositions = polygon[0].map(([lng, lat]) => [lat, lng] as [number, number]);

                // cek apakah polygonPositions sama dengan coordinates yang diklik
                if (polygonPositions.length !== coordinates.length) return false;

                return polygonPositions.every(([lat1, lng1], idx) => {
                    const [lat2, lng2] = coordinates[idx];
                    return Math.abs(lat1 - lat2) < EPS && Math.abs(lng1 - lng2) < EPS;
                });
            });
        })?.properties || undefined;
    }, [filteredData, coordinates]);

    // Mengambil data provinsi berdasarkan provinsi yang telah dipilih
    const { data: provinceData, isLoading: provinceLoading } = useQueryProvince(
        findProvince?.province_kemendagri_code || "",
    );

    // Menghitung total revitalisasi per provinsi
    const resultRevPerProvince = useMemo(() => {
        if (!provinceData || provinceData.length === 0) return [];

        // hitung total
        const totalRevPAUD = provinceData.reduce((sum, item) => sum + Number(item.Jml_rev_paud), 0);
        const totalRevSD = provinceData.reduce((sum, item) => sum + Number(item.Jml_revi_sd), 0);
        const totalRevSMP = provinceData.reduce((sum, item) => sum + Number(item.Jml_rev_smp), 0);
        const totalRevSMA = provinceData.reduce((sum, item) => sum + Number(item.Jml_rev_sma), 0);
        const totalRevSekolah = provinceData.reduce((sum, item) => sum + Number(item.total_jml_rev_sekolah), 0);

        const parseAnggaran = (str: string) => Number(str.replace(/[, ]+/g, ""));
        const totalAnggaranPAUD = provinceData.reduce((sum, item) => sum + parseAnggaran(item.anggaran_rev_paud), 0);
        const totalAnggaranSD = provinceData.reduce((sum, item) => sum + parseAnggaran(item.anggaran_rev_sd), 0);
        const totalAnggaranSMP = provinceData.reduce((sum, item) => sum + parseAnggaran(item.anggaran_rev_smp), 0);
        const totalAnggaranSMA = provinceData.reduce((sum, item) => sum + parseAnggaran(item.anggaran_rev_sma), 0);
        const totalAnggaran = provinceData.reduce((sum, item) => sum + parseAnggaran(item.total_anggaran_rev), 0);

        // kembalikan array, siap di-loop
        return [
            { name: "Total Revitalisasi Sekolah", value: totalRevSekolah },
            { name: "Anggaran Total Revitalisasi Sekolah", value: totalAnggaran },
            { name: "Revitalisasi Sekolah PAUD", value: totalRevPAUD },
            { name: "Anggaran Revitalisasi Sekolah PAUD", value: totalAnggaranPAUD },
            { name: "Revitalisasi Sekolah SD", value: totalRevSD },
            { name: "Anggaran Revitalisasi Sekolah SD", value: totalAnggaranSD },
            { name: "Revitalisasi Sekolah SMP", value: totalRevSMP },
            { name: "Anggaran Revitalisasi Sekolah SMP", value: totalAnggaranSMP },
            { name: "Revitalisasi Sekolah SMA", value: totalRevSMA },
            { name: "Anggaran Revitalisasi Sekolah SMA", value: totalAnggaranSMA },
        ];
    }, [provinceData]);


    // Menghitung total revitalisasi per provinsi
    const resultRevTable = useMemo(() => {
        const formattedData: RowData[] = [];

        if (!provinceData || provinceData.length === 0) return [];

        provinceData.forEach((prov) => {
            if (prov.Jml_rev_paud !== "0") {
                formattedData.push({
                    Kabupaten: prov.nama_wilayah,
                    "Bentuk Pendidikan": "PAUD",
                    "Banyak Sekolah": prov.Jml_rev_paud,
                    Anggaran: prov.anggaran_rev_paud,
                });
            }
            if (prov.Jml_revi_sd !== "0") {
                formattedData.push({
                    Kabupaten: prov.nama_wilayah,
                    "Bentuk Pendidikan": "SD",
                    "Banyak Sekolah": prov.Jml_revi_sd,
                    Anggaran: prov.anggaran_rev_sd,
                });
            }
            if (prov.Jml_rev_smp !== "0") {
                formattedData.push({
                    Kabupaten: prov.nama_wilayah,
                    "Bentuk Pendidikan": "SMP",
                    "Banyak Sekolah": prov.Jml_rev_smp,
                    Anggaran: prov.anggaran_rev_smp,
                });
            }
            if (prov.Jml_rev_sma !== "0") {
                formattedData.push({
                    Kabupaten: prov.nama_wilayah,
                    "Bentuk Pendidikan": "SMA",
                    "Banyak Sekolah": prov.Jml_rev_sma,
                    Anggaran: prov.anggaran_rev_sma,
                });
            }
        });

        return formattedData;
    }, [provinceData]);

    // Mencari total anggaran sebelumnya
    const filterDataRevNational = useMemo(() => {
        return resultRevPerProvince
            .filter((_, i) => i % 2 !== 0)
            .map((item) => ({
                name: item.name.split(" ")[3],
                value: Number(item.value),
            }))
            .slice(1);
    }, [resultRevPerProvince]);

    // Menyaring & menghitung data berdasarkan kabupaten
    const findRevByKab = useMemo(() => {
        return resultRevTable.reduce((acc: Record<string, DataKab>,
            item: RowData
        ) => {
            const sekolah = Number(item["Banyak Sekolah"]);
            const anggaran = Number(item.Anggaran.replace(/[, ]+/g, ""));

            if (acc[item.Kabupaten]) {
                acc[item.Kabupaten].TotalSekolah += sekolah;
                acc[item.Kabupaten].TotalAnggaran += anggaran;
            } else {
                acc[item.Kabupaten] = {
                    Kabupaten: item.Kabupaten,
                    TotalSekolah: sekolah,
                    TotalAnggaran: anggaran,
                };
            }

            return acc;
        },
            {} as Record<
                string,
                {
                    Kabupaten: string;
                    TotalSekolah: number;
                    TotalAnggaran: number;
                }
            >
        );
    }, [resultRevTable]);

    // Menghitung data grafik berdasarkan kabupaten
    const chartDataByKab = useMemo(() => {
        if (!selectedKab || !provinceData || provinceData.length === 0) {
            return {
                revitalisasi: [],
                anggaran: [],
            };
        }

        const kabData = provinceData.find(prov => prov.nama_wilayah === selectedKab);

        if (!kabData) {
            return {
                revitalisasi: [],
                anggaran: [],
            };
        }

        // Data untuk grafik Jumlah Revitalisasi
        const revitalisasiData = [
            { name: "PAUD", value: Number(kabData.Jml_rev_paud) },
            { name: "SD", value: Number(kabData.Jml_revi_sd) },
            { name: "SMP", value: Number(kabData.Jml_rev_smp) },
            { name: "SMA", value: Number(kabData.Jml_rev_sma) },
        ];

        // Data untuk grafik Total Anggaran
        const parseAnggaran = (str: string) => Number(str.replace(/[,.]+/g, ""));
        const anggaranData = [
            { name: "PAUD", value: parseAnggaran(kabData.anggaran_rev_paud) },
            { name: "SD", value: parseAnggaran(kabData.anggaran_rev_sd) },
            { name: "SMP", value: parseAnggaran(kabData.anggaran_rev_smp) },
            { name: "SMA", value: parseAnggaran(kabData.anggaran_rev_sma) },
        ];

        return {
            revitalisasi: revitalisasiData,
            anggaran: anggaranData,
        };
    }, [selectedKab, provinceData]);

    const handleBarClick = useCallback((kab: string) => {
        setSelectedKab(kab);
        setOpenBar(true);
    }, []);

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (barRef.current && !barRef.current.contains(event.target as Node)) {
            setOpenBar(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [handleOutsideClick]);
    
    return {
        data: filteredData,
        isLoading,
        setCoordinates,
        findProvince,
        coordinates,
        provinceData,
        provinceLoading,
        resultRevPerProvince,
        center,
        resultRevTable,
        filterDataRevNational,
        findRevByKab,
        openBar,
        handleBarClick,
        barRef,
        chartDataByKab
    };
};