import { validateRequest } from "@/lib/auth";

export default async function DashboardPage() {
  const { user } = await validateRequest();

  return (
    <div>
      <h1>This is the dashboard</h1>
      <p>{user?.username}</p>
    </div>
  );
}
