import logo from "../assets/logo.png";
export const LoginCard = () => {
  return (
    <div className="flex flex-col space-y-10 items-center justify-center lg:w-1/3  md:w-2/3 sm:w-full lg:h-auto mx-auto p-10 bg-white shadow-2xl">
      <img src={logo} alt="Stream Mix" className="w-32" />
      <input
        type="text"
        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
        placeholder="Name"
      />

      <input
        type="password"
        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
        placeholder="Password"
      />
      <button className="flex-shrink-0 w-full px-4 py-2 text-base font-semibold text-white bg-rose-400 rounded-lg shadow-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-purple-200">
        Register
      </button>
      <p>
        Don't have an account?{" "}
        <span className="text-rose-400 hover:cursor-pointer hover:underline">Register</span>
      </p>
    </div>
  );
};
