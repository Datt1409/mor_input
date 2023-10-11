import Input from "@/components/Input";
import { BiSolidLockAlt } from "react-icons/bi";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center gap-5">
      <Input type="text" />
      <Input type="number" />
      <Input type="email" />
      <Input type="password" showIcon={{ icon: <BiSolidLockAlt /> }} />
    </main>
  );
}
