import { useChat } from "@ai-sdk/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { getChatByIdFn } from "@/api/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/chat/$chatId")({
	component: ChatDetails,
	pendingComponent: Loader,
	loader: async ({ params }) =>
		await getChatByIdFn({ data: Number.parseInt(params.chatId, 10) }),
});

function Loader() {
	return (
		<div className="p-4">
			<Skeleton className="w-full h-[40px] mb-4" />
		</div>
	);
}

function ChatDetails() {
	const chat = Route.useLoaderData();
	if (!chat) {
		throw notFound();
	}

	const { messages, sendMessage, status } = useChat({
		id: chat.id.toString(),
		transport: new DefaultChatTransport({
			api: `/api/chat/${chat.id}`,
		}),
	});
	const [input, setInput] = useState("");

	return (
		<div className="p-4">
			{messages.map((message) => (
				<div key={message.id}>
					{message.role === "user" ? "User: " : "AI: "}
					{message.parts.map((part, index) =>
						// biome-ignore lint/suspicious/noArrayIndexKey: not ideal but for now ok
						part.type === "text" ? <span key={index}>{part.text}</span> : null,
					)}
				</div>
			))}

			<form
				className="flex gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					if (input.trim()) {
						sendMessage({ text: input });
						setInput("");
					}
				}}
			>
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					disabled={status !== "ready"}
					placeholder="Say something..."
				/>
				<Button type="submit" disabled={status !== "ready"}>
					Submit
				</Button>
			</form>
		</div>
	);
}
