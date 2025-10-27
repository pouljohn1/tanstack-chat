import { openai } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getChatById } from "@/db/chat";

export const Route = createFileRoute("/api/chat/$chatId")({
	server: {
		handlers: {
			POST: async ({ request, params }) => {
				const { chatId } = params;
				const chat = await getChatById(Number.parseInt(chatId, 10));
				if (!chat) {
					return new Response("Chat not found", { status: 404 });
				}

				const { messages }: { messages: UIMessage[] } = await request.json();

				const result = streamText({
					model: openai("gpt-4.1"),
					system: "You are a helpful assistant.",
					messages: convertToModelMessages(messages),
				});

				return result.toUIMessageStreamResponse();
			},
		},
	},
});
