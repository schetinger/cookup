import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { Sec1 } from "./_components/sec1";

export default async function Home() {
    return (
      <>
    
    <div className="h-screen flex flex-col">
      <Navbar className=" flex-1 top-0 left-0 w-full z-10"></Navbar>  
      <main className=" bg-gray-500 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <Sec1 className="pt-10 padding-top snap-start h-full bg-amber-200 grid grid-cols-3 items-start justify-between"></Sec1>
        <section className=" snap-start h-full bg-blue-500">
          <p>paradas</p>
        </section>
      </main>
    </div>
      
      




      </>
  );
}
