import logo from "../../assets/logo.png";
import { useState } from "react";
import { register } from "./api";
import {useNavigate} from "react-router-dom";
export const RegisterCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onRegister = () => {
    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }
    register(name, email, password)
      .then((data) => {
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 mx-auto space-y-10 bg-white shadow-2xl lg:w-1/3 md:w-2/3 sm:w-full lg:h-auto">
      <img src={logo} alt="Stream Mix" className="w-32" />
      <input
        type="text"
        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
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
        onClick={onRegister}
        className="flex-shrink-0 w-full px-4 py-2 text-base font-semibold text-white rounded-lg shadow-md bg-rose-400 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-purple-200"
      >
        Register
      </button>
      <p>
        Already have an account?{" "}
        <span className="text-rose-400 hover:cursor-pointer hover:underline">
          Login
        </span>
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
