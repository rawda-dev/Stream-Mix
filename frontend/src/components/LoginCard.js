import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/api-auth";
import auth from "../auth/auth-helpers";
export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onLogin = () => {
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    login(email, password)
      .then((data) => {
        console.log(data);
        auth.authenticate(data, () => {
          setError("");
          navigate("/");
        });
      })
      .catch((err) => {
        setError(err.error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 mx-auto space-y-10 bg-white shadow-2xl lg:w-1/3 md:w-2/3 sm:w-full lg:h-auto">
      <img src={logo} alt="Stream Mix" className="w-32" />
      <input
        type="text"
        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="flex-shrink-0 w-full px-4 py-2 text-base font-semibold text-white rounded-lg shadow-md bg-rose-400 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        onClick={onLogin}
      >
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <span className="text-rose-400 hover:cursor-pointer hover:underline">
          Register
        </span>
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
