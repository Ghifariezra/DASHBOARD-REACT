import { createColumnHelper } from "@tanstack/react-table";
import type { RowData } from "@/types/provinces";

const helper = createColumnHelper<RowData>();

const tableColumnsNames = [
	"Kabupaten",
	"Bentuk Pendidikan",
	"Banyak Sekolah",
	"Anggaran",
] as const;

const revColumns = tableColumnsNames.map((column) => {
	if (column === "Anggaran") {
		return helper.accessor(column, {
			header: () => <p className="text-center">{column}</p>,
			cell: (info) => <p className="text-center">Rp.{info.getValue()}</p>,
		});
	} else {
		return helper.accessor(column, {
			header: () => <p className="text-center">{column}</p>,
			cell: (info) => <p className="text-center">{info.getValue()}</p>,
		});
	}
});

export { revColumns };
