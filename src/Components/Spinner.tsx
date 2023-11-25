import { useApp } from "../Context/AppContext";
import "../Style/spinner.css";

export function Spinner() {
  const { darkmode } = useApp();
  return (
    <div className="lds-ring">
      {new Array(4).fill(".").map((_, i) => (
        <div
          key={`${i}loaderdiv`}
          className={`${darkmode ? "darkmode" : ""}`}
        ></div>
      ))}
    </div>
  );
}
