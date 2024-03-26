// eslint-disable-next-line react/prop-types
export default function Button({ children, halfWidth = false, inputClick }) {
  return (
    <button
      onClick={() => {
        inputClick(children);
      }}
      type="button"
      className={`text-[2.1rem] text-white focus:ring-4 focus:ring-indigo-400 font-medium rounded-lg text-sm mr-2 last:mr-0 focus:outline-none  h-[6rem] ${!halfWidth ? "w-full dark:bg-indigo-400 dark:hover:bg-indigo-500 bg-indigo-400 hover:bg-indigo-400 dark:focus:ring-indigo-400" : "w-[205%] dark:bg-orange-400 dark:hover:bg-orange-500 bg-orange-400 hover:bg-orange-400 dark:focus:ring-orange-400"}`}
    >
      {children}
    </button>
  );
}
