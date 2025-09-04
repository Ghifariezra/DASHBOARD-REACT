import { memo } from "react";
import Layout from "@/components/layout/layout";
import HeroSection from "@/components/sections/hero";
import SecondSection from "@/components/sections/second";
import ThirdSection from "@/components/sections/third";
import ProviderHome from "@/components/providers/provider-home";
import "leaflet/dist/leaflet.css";

function App() {
	return (
		<ProviderHome>
			<Layout>
				<HeroSection />
				<SecondSection />
				<ThirdSection />
			</Layout>
		</ProviderHome>
	);
}

export default memo(App);
