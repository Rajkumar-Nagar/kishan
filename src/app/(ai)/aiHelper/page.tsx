import ChatForm from "@/components/aiHelper/chat-form";

export default function HomePage() {
  return (
    <div className="flex overflow-hidden w-full max-h-dvh flex-1 flex-col">
      <div className="chats flex-1 py-10 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="md:text-3xl text-xl">Welcome to Your Farming Assistant! 🌱</h1>
          <p className="text-zinc-500">Here to help with everything from crop advice to market trends.</p>
          <p className="text-lg text-zinc-400"> How can I assist you today?</p>
        </div>
      </div>
      <ChatForm newChat />
    </div>
  );
}
