import ChatForm from "@/components/aiHelper/chat-form";
import ChatBox from "@/components/aiHelper/chatbox";
import Sidebar from "@/components/aiHelper/siderbar";


export default function HomePage() {
  return (
    <div className="flex w-full">

      <div className="flex flex-col relative  w-full h-screen">
        <ChatBox />
        <ChatForm newChat />
      </div>
    </div>
  );
}
