import {
  Users,
  Map,
  ClipboardList,
  Wallet,
} from "lucide-react";

const icons = {
  customers: Users,
  plots: Map,
  allocations: ClipboardList,
  payments: Wallet,
};

export default function StatCard({
  title,
  value,
  icon,
}) {
  const Icon = icons[icon];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex justify-between items-center">

      <div>
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h3 className="text-4xl font-bold mt-2">
          {value}
        </h3>
      </div>

      <div className="w-14 h-14 rounded-xl bg-violet-600 text-white flex items-center justify-center">
        <Icon size={26} />
      </div>

    </div>
  );
}