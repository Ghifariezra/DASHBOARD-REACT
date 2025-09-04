export interface Provinces {
    kode_pro: string;
    kode_kab: string;
    nama_wilayah: string;
    tingkat_label: string;
    Jml_rev_paud: string;
    Jml_revi_sd: string;
    Jml_rev_smp: string;
    Jml_rev_sma: string;
    total_jml_rev_sekolah: string;
    anggaran_rev_paud: string;
    anggaran_rev_sd: string;
    anggaran_rev_smp: string;
    anggaran_rev_sma: string;
    total_anggaran_rev: string;
    id: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface ProvinceRevData {
    Jml_rev_paud: string;
    Jml_revi_sd: string;
    Jml_rev_smp: string;
    Jml_rev_sma: string;
    total_jml_rev_sekolah: string;
    anggaran_rev_paud: string;
    anggaran_rev_sd: string;
    anggaran_rev_smp: string;
    anggaran_rev_sma: string;
    total_anggaran_rev: string;
}

export type RowData = {
    Kabupaten: string;
    "Bentuk Pendidikan": string;
    "Banyak Sekolah": string;
    Anggaran: string;
};

export type DataKab = {
    Kabupaten: string;
    TotalSekolah: number;
    TotalAnggaran: number;
};