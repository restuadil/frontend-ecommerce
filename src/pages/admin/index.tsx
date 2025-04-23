import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div>
      <div>Admin page</div>
      <h1>Welcome {session?.user?.username}</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
