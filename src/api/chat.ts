import { createServerFn } from "@tanstack/react-start";
import { createChat, getChatById, getChats } from "@/db/chat";

export const addChatFn = createServerFn({ method: "POST" })
	.inputValidator((title: string) => title)
	.handler(async ({ data }) => {
		return await createChat(data);
	});

export const getChatsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await getChats();
	},
);

export const getChatByIdFn = createServerFn({ method: "GET" })
	.inputValidator((chatId: number) => chatId)
	.handler(async ({ data }) => {
		return await getChatById(data);
	});
