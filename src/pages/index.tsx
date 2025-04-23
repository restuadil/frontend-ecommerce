import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
