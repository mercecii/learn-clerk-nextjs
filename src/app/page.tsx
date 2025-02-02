import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashobard from "./dashboard/page";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }
  return (
    <>
      <h1>Home Page</h1>
      <Dashobard />
    </>
  );
}
