import ChatBox from "@/components/aiHelper/chatbox";
import InputBox from "@/components/aiHelper/inputbox";
import Sidebar from "@/components/aiHelper/siderbar";


export default function HomePage() {
  return (
    <div className="flex w-full">

      <div className="flex flex-col relative  w-full h-screen">
        <ChatBox />
        <InputBox />
      </div>
    </div>
  );
}
