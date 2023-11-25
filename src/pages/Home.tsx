import { ReactElement } from "react";
import { HomeProvider, useHome } from "../Context/HomeContext";
import { CountryData } from "../Types/types";
import { Spinner } from "../Components/Spinner";
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import AppLayout from "../Components/AppLayout";

export default function Home(): ReactElement {
  return (
    <HomeProvider>
      <AppLayout>
        <Navbar />
        <div className="flex items-center justify-between max-[700px]:flex-col max-[700px]:gap-8 max-[700px]:items-start  max-[420px]:gap-4">
          <Search />
          <Filter />
        </div>
        <Countries />
        <PaginateButtons />
      </AppLayout>
    </HomeProvider>
  );
}

function Search(): ReactElement {
  const { setSearchQuery } = useHome();
  return (
    <div className=" bg-element-lightmode dark:bg-element-darkmode w-[25rem] rounded-md text-text-lightmode dark:text-text-darkmode relative shadow-lg max-[700px]:w-full">
      <i className="bx bx-search-alt-2 absolute text-lg top-[50%] translate-y-[-50%] left-6"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        className="bg-transparent border-none outline-none text-sm py-4 pr-6 pl-16 w-full"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

function Filter(): ReactElement {
  const { setSelectedFilter } = useHome();
  const region_filters = [
    "None",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ];

  return (
    <div className="relative">
      <i className="bx bx-chevron-down absolute right-[1rem] top-[50%] translate-y-[-50%] text-lg text-text-lightmode dark:text-text-darkmode"></i>
      <select
        placeholder="Filter by Region"
        className="required:invalid:text-gray-500 py-4 bg-element-lightmode text-text-lightmode dark:text-text-darkmode dark:bg-element-darkmode text-sm w-[13rem] px-6 rounded-md appearance-none shadow-lg"
        onChange={(e) => {
          setSelectedFilter(+e.target.value);
        }}
      >
        <option defaultValue={"default"} disabled className="disabled:hidden">
          Filter by Region
        </option>
        {region_filters.map((region, i) => {
          return (
            <option value={i} key={`filter-${region}`}>
              {region}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function Countries(): ReactElement {
  const { isLoading, countries } = useHome();

  if (countries === null) return <CountriesEmpty />;
  if (isLoading) return <CountriesFetching />;
  if (countries.length === 0) return <CountriesDoesNotExist />;

  return (
    <div className="grid grid-cols-4 gap-16 mt-10  max-[1300px]:gap-10 max-[1100px]:gap-6 max-[920px]:grid-cols-3 max-[700px]:grid-cols-2 max-[500px]:grid-cols-1">
      {countries.map((countryInfo) => {
        return (
          <CountryItem
            countryInfo={countryInfo}
            key={`${countryInfo.name.common}-key`}
          />
        );
      })}
    </div>
  );
}

function CountryItem({ countryInfo }: { countryInfo: CountryData }) {
  const { name, capital, population, region, flags, cca2, ccn3, cca3, cioc } =
    countryInfo;

  const countryCodes = `${cca2},${ccn3},${cca3},${cioc}`;
  const InfoList = [
    ["Population", population.toLocaleString()],
    ["Region", region],
    ["Capital", capital],
  ];
  return (
    <Link
      to={`/countries/${name.official
        .split(" ")
        .join("-")
        .toLocaleLowerCase()}?codes=${countryCodes}`}
    >
      <article className="bg-element-lightmode dark:bg-element-darkmode rounded-md overflow-hidden shadow-lg">
        <div className=" aspect-video">
          <img
            src={flags.png}
            alt=""
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="pt-8 px-6 pb-8">
          <h3 className="text-text-lightmode dark:text-text-darkmode font-semibold mb-4">
            {name.official}
          </h3>
          <div className="text-sm">
            {InfoList.map(([info, content]) => {
              return (
                <p
                  className="text-text-lightmode dark:text-text-darkmode font-semibold"
                  key={`${content}-${info}`}
                >
                  {info}:{" "}
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {content}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </Link>
  );
}

function PaginateButtons(): ReactElement | null {
  const { countries, isLoading, currentPage, pageCount, handlePageChange } =
    useHome();
  if (countries === null || countries.length === 0 || isLoading) return null;

  const buttonStyles =
    " text-xl bg-element-lightmode text-text-lightmode dark:bg-element-darkmode dark:text-text-darkmode w-8 aspect-square flex items-center justify-center rounded-md hover:opacity-[0.6]";

  return (
    <div className=" flex items-center justify-center gap-4 mt-12">
      <button onClick={() => handlePageChange("before")}>
        <i className={`bx bx-chevron-left ${buttonStyles}`}></i>
      </button>
      <p className="text-text-lightmode dark:text-text-darkmode">
        {currentPage + 1} / {pageCount}
      </p>
      <button onClick={() => handlePageChange("next")}>
        <i className={`bx bx-chevron-right ${buttonStyles}`}></i>
      </button>
    </div>
  );
}

function CountriesEmpty() {
  return (
    <div className="grid place-items-center h-[25rem] text-gray-500 text-xl">
      <div className="flex gap-4 items-center">
        <i className="bx bx-search"></i>
        <p>Search for Countries</p>
      </div>
    </div>
  );
}

function CountriesFetching() {
  return (
    <div className="grid place-items-center h-[25rem]">
      <Spinner />
    </div>
  );
}

function CountriesDoesNotExist() {
  return (
    <div className="grid place-items-center h-[25rem] text-gray-500 text-xl">
      <div className="flex gap-4 items-center">
        <p className="text-center">No country matches your request</p>
      </div>
    </div>
  );
}
