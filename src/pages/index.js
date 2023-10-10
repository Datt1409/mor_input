import Input from "@/components/Input";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="text-lg font-bold">
        Currently there's only two icons: "heart" and "lock" :D
      </div>
      <Input type="text" />
      <Input type="number" />
      <Input type="password" />
    </main>
  );
}
