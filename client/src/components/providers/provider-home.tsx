import { ProviderHomeContext } from "@/hooks/providers/useProviderHome";
import { useData } from "@/hooks/data/useData";

const ProviderHome = ({ children }: { children: React.ReactNode }) => {
	const data = useData();
	return (
		<ProviderHomeContext.Provider value={data}>
			{children}
		</ProviderHomeContext.Provider>
	);
};

export default ProviderHome;