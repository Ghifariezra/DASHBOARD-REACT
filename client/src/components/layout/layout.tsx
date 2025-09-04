import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useProviderHome } from "@/hooks/providers/useProviderHome";
import { BarChartComponent } from "@/components/ui/donut-chart/bar-chart";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { openBar, barRef, chartDataByKab } = useProviderHome();

	// Gabungkan data revitalisasi dan anggaran ke dalam satu array
	const combinedChartData = chartDataByKab.revitalisasi.map(
		(revItem, index) => ({
			name: revItem.name,
			uv: chartDataByKab.anggaran[index]?.value || 0, // uv untuk anggaran
			pv: revItem.value, // pv untuk jumlah revitalisasi
		})
	);

	return (
		<div className="flex w-full min-h-screen overflow-hidden">
			<SidebarProvider>
				<div className="flex min-h-screen w-full">
					{/* Sidebar */}
					<AppSidebar />

					{/* Konten utama */}
					<main className="flex flex-1 flex-col min-h-screen">
						{/* Header */}
						<header className="sticky top-0 flex items-center gap-2 border-b bg-white px-4 py-3 z-10">
							<SidebarTrigger
								className="cursor-pointer"
								size="icon"
							/>
							<h1 className="text-lg font-semibold">Dashboard</h1>
						</header>

						{/* Isi konten */}
						<div className="flex-1 w-full p-4">{children}</div>
					</main>
				</div>
			</SidebarProvider>
			{openBar && (
				<div className="fixed top-0 left-0 w-full h-full bg-gray-800/30 z-100 cursor-pointer">
					<div
						ref={barRef}
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-white p-8">
						<BarChartComponent data={combinedChartData} />
					</div>
				</div>
			)}
		</div>
	);
}
