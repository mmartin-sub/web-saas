import { BasicItemSkeleton } from "~/components/base-item";
import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Platform Admin"
        text="Administrate, create and manage your AI-driven best practices."
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <BasicItemSkeleton />
        <BasicItemSkeleton />
        <BasicItemSkeleton />
      </div>
    </DashboardShell>
  );
}
