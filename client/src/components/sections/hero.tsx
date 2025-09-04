import Hero from "@/components/cards/hero";
import { useProviderHome } from "@/hooks/providers/useProviderHome";
import { memo } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";

function HeroSection() {
	const {
		data,
        findProvince,
		isLoading,
		setCoordinates,
		provinceData,
		provinceLoading,
		resultRevPerProvince,
		center,
	} = useProviderHome();

	return (
		<section className="flex flex-row gap-4 min-h-screen w-full p-6">
			<Hero
				title="Persebaran Program Revitalisasi Sekolah Nasional"
				description="Menampilkan distribusi program revitalisasi sekolah di seluruh provinsi">
				{isLoading ? (
					<div className="relative w-full h-full">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 animate-pulse" />
					</div>
				) : (
					<div className="relative w-full h-full">
						<MapContainer
							center={center}
							zoom={8}
							scrollWheelZoom={true}
							className="w-full h-full overflow-hidden rounded-2xl border cursor-grab">
							<TileLayer
								url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=Kk2KDLReCwxsHIcAMphD"
								attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
							/>
							{data.map((feature, index) => {
								// Check if the feature is a MultiPolygon
								if (feature.geometry.type === "MultiPolygon") {
									return feature.geometry.coordinates.map(
										(polygon, polyIndex) => {
											const positions = polygon[0].map(
												(coord: number[]) => {
													// Get Langitude and Latitude
													if (coord.length === 2) {
														const [lng, lat] =
															coord;
														return [lat, lng] as [
															number,
															number
														];
													}
													throw new Error(
														"Invalid coordinate length"
													);
												}
											) as [number, number][];
											return (
												<Polygon
													key={`${index}-${polyIndex}`}
													stroke-opacity={1}
													stroke-width={3}
													stroke-linecap="round"
													stroke-linejoin="round"
													fillColor="#3388ff"
													fill-opacity={0.2}
													fill-rule="evenodd"
													positions={positions}
													eventHandlers={{
														click: () => {
															setCoordinates(
																positions
															);
														},
													}}
												/>
											);
										}
									);
								}
								return null;
							})}
						</MapContainer>
					</div>
				)}
			</Hero>
			<Hero
				title="Data Ringkasan - Nasional"
				description="Detail alokasi anggaran untuk setiap tingkat pendidikan">
                    <h1 className="text-3xl font-bold text-center text-red-600">{findProvince?.province_kemendagri_name}</h1>
				{provinceLoading ? (
					<div className="relative w-full h-full">
						<div className="w-full h-full bg-gray-400/30 animate-pulse rounded-2xl" />
					</div>
				) : (
					provinceData ? (
						<div className="grid grid-cols-2 gap-4">
							{resultRevPerProvince.map((item, index) => (
								<div
									key={index}
									className="flex flex-col gap-2 w-full h-full p-4 bg-blue-400/10 rounded-2xl border-l-4">
									<h1 className="text-sm">{item.name}</h1>
									<p className="text-base md:text-lg lg:text-2xl font-bold break-all">
										Rp.{item.value.toLocaleString("id-ID")}
									</p>
								</div>
							))}
						</div>
					):
                    <div className="relative w-full h-full">
                        <div className="w-full h-full bg-gray-400/30 animate-pulse rounded-2xl flex items-center justify-center" >
                            Tolong pilih provinsi terlebih dahulu
                        </div>
                    </div>
				)}
			</Hero>
		</section>
	);
}

export default memo(HeroSection);
