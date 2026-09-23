import { NavLink } from "react-router-dom";
import { menuItems } from "../../data/menuItems";

export default function Sidebar() {
  return (
      <aside className="w-[280px] max-w-[85vw] bg-slate-900 text-slate-300 flex flex-col h-screen">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-white">
          REDS
        </h1>

      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-6 py-3 mx-3 mb-1
                rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-slate-800"
                }
                `
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">

        <p className="text-xs text-slate-500">
          REDS Enterprise v1.0
        </p>

      </div>

    </aside>
  );
}