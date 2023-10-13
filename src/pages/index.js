import Input from "@/components/Input";
import { AiOutlineNumber } from "react-icons/ai";
import { BiSolidLockAlt } from "react-icons/bi";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center gap-5">
      <Input type="text" hint="Text only" required />
      <Input
        type="number"
        showIcon={{ icon: <AiOutlineNumber /> }}
        hint="Number only"
        required
      />
      <Input type="email" hint="Email only" required />
      <Input
        type="password"
        showIcon={{ icon: <BiSolidLockAlt /> }}
        hint="Password must be at least 8 Characters and must contain at least a Capital Letter, a Number and a Special Character."
      />
    </main>
  );
}
