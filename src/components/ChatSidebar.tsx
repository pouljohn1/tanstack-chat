import { Chat } from "@/types/chat";
import { Sidebar, SidebarContent } from "./ui/sidebar";
import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

export default function ChatSidebar({ chats }: { chats: Chat[] }) {
	return (
		<Sidebar>
			<SidebarContent className="flex flex-col gap-4 p-4">
				<div className="flex flex-col gap-2">
					<h2 className="text-sm font-semibold text-muted-foreground px-2">
						Recent Chats
					</h2>
					{chats.length > 0 ? (
						<div className="flex flex-col gap-1">
							{chats.map((chat) => (
								<Link
									key={chat.id}
									className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-accent transition-colors"
									to={`/`}
								>
									<MessageSquare className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
									<div className="flex flex-col gap-0.5 min-w-0 flex-1">
										<span className="text-sm font-medium truncate">
											{chat.title}
										</span>
										<span className="text-xs text-muted-foreground">
											{chat.timestamp}
										</span>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-8 px-4 text-center">
							<MessageSquare className="size-8 text-muted-foreground/50 mb-2" />
							<p className="text-sm text-muted-foreground">
								No chats yet. Start a new conversation!
							</p>
						</div>
					)}
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
