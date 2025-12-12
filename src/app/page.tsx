import { Sec1 } from "./_components/sec1";
import { Sec3 } from "./_components/sec3";

export default async function Home() {
  return (
    // Removido h-screen e overflow-hidden para o footer funcionar
    <div className="w-full flex flex-col bg-amber-800">
      <Sec1 className="min-h-[calc(100vh-80px)] bg-amber-200 grid grid-cols-3 justify-between" />
      <Sec3 className="min-h-screen bg-white" />
    </div>
  );
}