import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items } from "@/utils/menu/items";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent className="bg-[#293e5d] text-white">
				<SidebarGroup>
					<SidebarGroupContent className="flex flex-col gap-6 items-center pt-4">
						<div className="aspect-square w-24 bg-gray-200 overflow-hidden rounded-2xl">
							<img
								src="https://ditjenbinaadwil.kemendagri.go.id/asset/logo/logokemendagri.png"
								alt="logo"
								className="h-full w-full object-contain"
							/>
						</div>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className="flex items-center gap-3 w-full py-2 px-3 text-[15px] pl-3">
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
