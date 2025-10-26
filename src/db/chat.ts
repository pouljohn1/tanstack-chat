import { readContent, writeContent } from "@/lib/fileUtils";
import type { Chat } from "@/types/chat";

export async function getChats() {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return (await readContent<Chat[]>("chats.json")) ?? [];
}

export async function createChat(title: string) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const chats = await getChats();
	const newChat: Chat = {
		id: chats.length + 1,
		title,
		timestamp: new Date().toISOString(),
	};
	chats.push(newChat);
	await writeContent<Chat[]>("chats.json", chats);
	return newChat;
}
