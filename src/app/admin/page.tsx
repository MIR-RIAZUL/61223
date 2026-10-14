import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Matrix | Anti-Gravity Operations",
  description: "Protected administrative panel for Rapier physics configuration, WebGPU buffers, and GitHub webhook telemetry.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
