import KPISection from "@/components/dashboard/KPISection";
import MonthlyLineChart from "@/components/dashboard/MonthlyLineChart";
import StatusPieChart from "@/components/dashboard/StatusPieChart";
import SourceBarChart from "@/components/dashboard/SourceBarChart";
import FunnelChart from "@/components/dashboard/FunnelChart";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <KPISection />

      <MonthlyLineChart />

      <div className="grid md:grid-cols-2 gap-8">
        <StatusPieChart />
        <SourceBarChart />
      </div>

      <FunnelChart />
    </div>
  );
}