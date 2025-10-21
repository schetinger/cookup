import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";

export default async function Home() {
    return (
      <>
      <Navbar></Navbar>

      <main className="bg-gray-500">
        <h1>teste</h1>
          <p>teste</p>
      </main>

      <footer>
        <p>teste3</p>
      </footer>
      




      </>
  );
}
