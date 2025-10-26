import { Sidebar, SidebarContent } from "./ui/sidebar";

export default function ChatSidebar() {
	return (
		<Sidebar>
			<SidebarContent className="flex flex-col gap-4 p-4">
				Hello Sidebar
			</SidebarContent>
		</Sidebar>
	);
}
