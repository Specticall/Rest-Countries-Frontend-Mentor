import { ReactElement } from "react";
import { useApp } from "../Context/AppContext";

export function Navbar(): ReactElement {
  const { setDarkmode, darkmode } = useApp();

  return (
    <nav className="bg-element-lightmode dark:bg-element-darkmode  text-text-lightmode dark:text-text-darkmode fixed top-0 left-0 right-0 z-10 shadow-lg">
      <div className="px-8 py-6 flex items-center justify-between  max-w-[1300px] mx-auto">
        <h1 className="font-[800] text-xl max-[420px]:text-sm">
          Where in the world?
        </h1>

        <button
          className="flex items-center justify-center gap-3 max-[420px]:text-sm"
          onClick={() => {
            setDarkmode((current) => !current);
          }}
        >
          {darkmode && <i className="bx bxs-moon"></i>}
          {darkmode || <i className="bx bx-moon"></i>}
          <p>{darkmode ? "Light Mode" : "Dark Mode"}</p>
        </button>
      </div>
    </nav>
  );
}
