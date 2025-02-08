import { currentUser } from "@clerk/nextjs/server";

const Dashobard = async () => {
  const user = await currentUser();

  return (
    <div>
      {user && (
        <>
          Hello {user?.firstName} {user?.lastName} !!!{" "}
        </>
      )}
    </div>
  );
};

export default Dashobard;
