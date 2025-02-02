import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashobard from "./dashboard/page";

export default async function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Dashobard />
    </>
  );
}
