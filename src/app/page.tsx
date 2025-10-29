import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { Sec1 } from "./_components/sec1";
import { Sec3 } from "./_components/sec3";
export default async function Home() {
    return (
      <>
    
    <div className="bg-amber-800 h-screen w-full flex flex-col">
      <Navbar className=" h-20 shrink-0 left-0 "></Navbar>
      <main className="min-h-0 flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <Sec1 className="h-full pt-10 snap-start bg-amber-200 grid grid-cols-3 justify-between"></Sec1>
        <Sec3 className="h-full snap-start"></Sec3>
      </main>
      </div>
      




      </>
  );
}
