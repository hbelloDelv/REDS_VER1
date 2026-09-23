import {
  LayoutDashboard,
  Users,
  Map,
  ClipboardList,
  CreditCard,
  Shield,
  History,
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Plots",
    path: "/plots",
    icon: Map,
  },
  {
    name: "Allocations",
    path: "/allocations",
    icon: ClipboardList,
  },
  {
    name: "Payments",
    path: "/payments",
    icon: CreditCard,
  },
  {
    name: "Users",
    path: "/users",
    icon: Shield,
  },
  {
    name: "Audit Logs",
    path: "/audit-logs",
    icon: History,
  },
];