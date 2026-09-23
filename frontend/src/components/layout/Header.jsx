import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick }) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  };

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (
    <header className="bg-white border-b px-4 md:px-8 h-20 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

      </div>

      <div className="flex items-center gap-6">

        <Bell size={22} />

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-full bg-violet-600 text-white flex items-center justify-center">
            {user?.full_name?.charAt(0)}
          </div>

          <div>
            <p className="font-medium">
              {user?.full_name}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}