import { currentUser } from "@clerk/nextjs/server";

const Dashobard = async () => {
  const user = await currentUser();
  console.log(
    "////////////////////////////////////////////////////////////////////////////////////////////////////user = ",
    user
  );

  return (
    <div>
      Hello {user?.firstName} {user?.lastName} !!!{" "}
    </div>
  );
};

export default Dashobard;
