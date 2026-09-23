import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Login button clicked");

  try {
    setLoading(true);
    setError("");

    const result = await loginUser({
      email,
      password,
    });

    console.log(result);

    localStorage.setItem(
      "token",
      result.token
    );

        localStorage.setItem(
        "token",
        result.token
        );

        localStorage.setItem(
        "user",
        JSON.stringify(result.user)
        );

window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          REDS Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white p-3 rounded-lg"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

      </div>

    </div>
  );
}