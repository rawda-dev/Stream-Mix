export const EditProfile = () => {
  return (
    <div className="md:shadow-lg lg:w-1/2 mx-auto px-10 py-5">
      <h2 className="text-rose-400 text-lg ">Edit Profile</h2>
      <div className="flex flex-col space-y-4 ">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="profile"
            className="lg:w-28 rounded-full"
          />
          <button className="bg-gray-200 text-gray-700 text-sm font-semibold px-2 py-1 rounded-md hover:bg-gray-300">
            Upload photo
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="rounded-lg border-gray-200 flex-1 appearance-none border  w-2/3 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-lg border-gray-200 flex-1 appearance-none border  w-2/3 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg border-gray-200 flex-1 appearance-none border  w-2/3 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
          />
          <textarea
            type="text"
            placeholder="About"
            className="rounded-lg border-gray-200 flex-1 appearance-none border  w-2/3 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent "
          />
        </div>
        <div className="ml-5 flex flex-row space-x-4 item-center ">
          <button className="bg-rose-400 text-white text-sm font-semibold rounded-md hover:bg-rose-500 px-10 py-2  focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-rose-200">
            Save
          </button>
          <button className="bg-gray-200 text-gray-700 text-sm font-semibold px-10 py-2 rounded-md hover:bg-gray-300  focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200">
            Cancel  
          </button>
        </div>
      </div>
    </div>
  );
};
