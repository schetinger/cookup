import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";

export default async function Home() {
    return (
      <>
    
    <div className="h-screen flex flex-col">
      <Navbar className=" flex-1 top-0 left-0 w-full z-10"></Navbar>  
      <main className=" bg-gray-500 h-full overflow-y-scroll snap-y snap-mandatory">
        <section className="padding-top snap-start h-full bg-amber-200">
          <h1>teste</h1>
          <p>teste</p>
        </section>
        <section className=" snap-start h-full bg-blue-500">
          <p>paradas</p>
        </section>
      </main>
    </div>
      
      




      </>
  );
}
