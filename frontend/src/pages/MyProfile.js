export const Profile = () => {
  return (
    <div>
      <div className="flex flex-col md:shadow-lg md:w-1/2 mx-auto py-10">
        <div className="py-10 px-20 flex flex-row items-center justify-center">
          <div className="mr-8">
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              alt="profile"
              className="lg:w-28 rounded-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p>test1@test.com</p>
            <p className="text-gray-500">
             Embedded Systems Engineer
            </p>
          </div>
        </div>
        <span class="mb-10 w-full bg-gray-400" style={{ height: 1 }}></span>
        <div className="flex flex-row space-x-5 justify-start ml-5">
          <button className=" px-6 py-2 text-base font-semibold text-white bg-red-600  shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200">
            Delete Profile
          </button>
          <button className=" px-6 py-2 text-base font-semibold text-white bg-blue-600 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
