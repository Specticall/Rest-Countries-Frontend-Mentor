import { ReactElement } from "react";
import AppLayout from "../Components/AppLayout";
import { Navbar } from "../Components/Navbar";
import { CountryProvider, useCountry } from "../Context/CountryContext";
import { Spinner } from "../Components/Spinner";
import { CountryDetails, NativeName } from "../Types/types";
import { arrayToStringList } from "../Helper/helper";
import { Link } from "react-router-dom";

export default function Country() {
  return (
    <CountryProvider>
      <AppLayout wrapperClassName="max-[450px]:px-4">
        <Navbar />
        <div className="">
          <Link to={"../"}>
            <button className=" flex items-center justify-center text-text-lightmode dark:text-text-darkmode px-8 py-2 gap-2 bg-element-lightmode dark:bg-element-darkmode shadow-lg shadow-black/20 hover:opacity-70">
              <i className="bx bxs-chevron-left"></i>
              <p>Back</p>
            </button>
          </Link>
        </div>
        <CountryDetails />
      </AppLayout>
    </CountryProvider>
  );
}

function Flag(): ReactElement | null {
  const { country, isLoading } = useCountry();
  if (isLoading) return null;

  return (
    <div className="w-[45%] aspect-[16/10] shadow-lg max-[1300px]:max-w-[550px] max-[1300px]:w-full">
      <img
        src={country?.flags.png}
        alt="flag image"
        className="h-full w-full"
      />
    </div>
  );
}

function CountryDetails() {
  const { isLoading, country } = useCountry();

  if (!country || isLoading)
    return (
      <div className="flex items-center justify-center mt-24">
        <Spinner />
      </div>
    );
  return (
    <div className="mt-12 flex gap-24 items-center justify-between max-[1300px]:flex-col">
      <Flag />
      <CountryInfo country={country} />
    </div>
  );
}

function CountryInfo({ country }: { country: CountryDetails }): ReactElement {
  const nativeName = Object.values(country.name.nativeName)[0] as NativeName;

  const infoListTop = [
    ["Native Name", nativeName.official],
    ["Population", country.population.toLocaleString()],
    ["Region", country.region],
    ["Sub Region", country.subregion],
  ];

  const infoListBottom = [
    ["Capital", arrayToStringList(country.capital)],
    [
      "Currencies",
      arrayToStringList(
        Object.values(country.currencies).map((current) => current.name)
      ),
    ],
    ["Languages", arrayToStringList(Object.values(country.languages))],
  ];

  return (
    <article className="max-[600px]:items-start max-[600px]:w-full">
      <h2 className="text-3xl text-text-lightmode dark:text-text-darkmode font-bold mb-8">
        {country.name.official}
      </h2>
      <div className="flex gap-24 max-[600px]:flex-col max-[600px]:gap-8">
        <CountryInfoList list={infoListTop} />
        <CountryInfoList list={infoListBottom} />
      </div>

      <CountryBorders list={country.borders} />
    </article>
  );
}

function CountryInfoList({ list }: { list: string[][] }) {
  return (
    <div className="">
      {list.map(([title, content]) => {
        return (
          <p className="text-text-lightmode dark:text-text-darkmode mb-2 font-semibold">
            {title} :{" "}
            <span className=" text-gray-700 dark:text-gray-300 font-medium ">
              {content}
            </span>
          </p>
        );
      })}
    </div>
  );
}

function CountryBorders({ list }: { list: string[] }) {
  return (
    <div className="flex text-text-lightmode dark:text-text-darkmode items-center mt-10 max-[600px]:flex-col max-[600px]:items-start  gap-y-4 gap-x-4 font-semibold">
      Border Countries:
      <ul className="flex gap-2 items-center justify-center">
        {list.length === 0 ? (
          <li className=" bg-element-lightmode dark:bg-element-darkmode rounded-sm shadow-lg px-7 py-1 text-sm  text-gray-700 dark:text-gray-300 ml-3 ">
            No borders
          </li>
        ) : (
          list.map((border) => {
            return (
              <li className=" bg-element-lightmode dark:bg-element-darkmode rounded-sm shadow-lg px-7 py-1 text-sm text-gray-700 dark:text-gray-300 mr-3">
                {border}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
