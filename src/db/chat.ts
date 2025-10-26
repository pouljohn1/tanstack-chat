import type { Chat } from "@/types/chat";

const chats: Chat[] = [];

export async function getChats() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return chats;
}

export async function createChat(title: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newChat: Chat = { id: chats.length + 1, title, timestamp: new Date().toISOString() }
  chats.push(newChat);
  return newChat;
}