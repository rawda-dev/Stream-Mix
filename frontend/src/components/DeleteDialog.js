export const DeleteDialog = ({
  open,
  onClose,
  onDelete,
  title,
  description,
}) => {
  if (!open) return null;
  return (
    <div className="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="w-full h-full text-center">
        <div className="flex flex-col justify-between h-full">
          <svg
            width="40"
            height="40"
            className="w-12 h-12 m-auto mt-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
          </svg>
          <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
            {title}
          </p>
          <p className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <div className="flex items-center justify-between w-full gap-4 mt-8">
            <button
              type="button"
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Delete
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base font-semibold text-center text-red-500 transition duration-200 ease-in bg-white rounded-lg shadow-md hover:bg-gray-100 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
