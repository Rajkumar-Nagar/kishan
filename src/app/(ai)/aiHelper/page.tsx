"use client";
import ChatForm from "@/components/aiHelper/chat-form";
import PreviewMessage from "@/components/aiHelper/preview-message";
import { ChatGpt } from "@/components/skelton/skeltHomePage";
import { useAppSelector } from "@/lib/redux";

export default function HomePage() {
  const { conversation, prompt } = useAppSelector((state) => state.ai)
  return (
    <div className="flex overflow-hidden w-full max-h-dvh flex-1 flex-col">
      <div className="chats flex-1 py-10 px-6">
        {
          prompt && conversation.length == 0 ? (
            <div>
              <PreviewMessage chat={{
                id: Math.random().toString(),
                content: prompt,
                role: 'user',
                createdAt: new Date()
              }} />
              <ChatGpt />
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="max-w-md text-center space-y-4 m-auto">
                <h1 className="md:text-3xl text-xl">Welcome to Your Farming Assistant! 🌱</h1>
                <p className="text-zinc-500">Here to help with everything from crop advice to market trends.</p>
                <p className="text-lg text-zinc-400"> How can I assist you today?</p>
              </div>
            </div>
          )
        }
      </div>
      <ChatForm newChat />
    </div>
  );
}
