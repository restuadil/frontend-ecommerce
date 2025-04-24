import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div>
      <div>Admin page</div>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
