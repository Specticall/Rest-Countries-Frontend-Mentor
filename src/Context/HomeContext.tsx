import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useDeferredValue,
  useCallback,
} from "react";
import { ChilrenProp, StateSetter } from "../Types/types";
import { BASE_URL, DEFAULT_PAGE_LENGTH } from "../Helper/config";
import { CountryData } from "../Types/types";
import { paginate } from "../Helper/helper";
import { useScreenWidth } from "../Hooks/useScreenWidth";
import { fetchRequest } from "../Helper/requestHandler";

type PageDestination = "next" | "before";

interface HomeValues {
  countries: CountryData[] | null;
  isLoading: boolean;
  getCountries: (
    country_name: string,
    stateSetter: StateSetter<CountryData[]>
  ) => void;
  setSearchQuery: StateSetter<string>;
  setSelectedFilter: StateSetter<number>;
  currentPage: number;
  pageLength: number;
  pageCount: number;
  handlePageChange: (destination: PageDestination) => void;
}

const HomeContext = createContext<HomeValues | null>(null);
const regionFilters = [
  "None",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

const QUERY_FILTER =
  "?fields=name,region,population,capital,flags,cca2,ccn3,cca3,cioc";

export function HomeProvider({ children }: ChilrenProp) {
  const [countries, setCountries] = useState<CountryData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLength, setPageLength] = useState(() => DEFAULT_PAGE_LENGTH);
  const screenWidth = useScreenWidth();
  const defferedQuery = useDeferredValue(searchQuery);
  // console.log(defferedQuery, searchQuery);
  const previousController = useRef<any>(null);

  // Creates a new controller instance.
  const controller = new AbortController();

  const getCountries = useCallback((country_name: string) => {
    setIsLoading(true);
    fetchRequest<CountryData[] | null>({
      URL: `${BASE_URL}/name/${country_name}${QUERY_FILTER}`,
      stateSetter: setCountries,
      stateSetterLoading: setIsLoading,
      previousController: previousController.current,
      signal: controller.signal,
    });
  }, []);

  // Change pagination based on the screen width (4 cols, 3 cols, 2 | 1 col)
  useEffect(() => {
    // 4 Cols
    if (screenWidth > 920) {
      setPageLength(8);
      setCurrentPage(0);
    }

    // 3 Cols
    if (screenWidth <= 920) {
      setPageLength(6);
      setCurrentPage(0);
    }

    // 2 >= cols
    if (screenWidth <= 700) {
      setPageLength(4);
      setCurrentPage(0);
    }
  }, [screenWidth]);

  // Refetches the api whenever the query updates.
  useEffect(() => {
    // TEMP
    if (!defferedQuery) {
      setCountries(null);
      return;
    }
    getCountries(defferedQuery);
  }, [defferedQuery, getCountries]);

  // 1. Derived state to filter the countries based on the selected filter
  const filteredCountries = countries
    ? countries.filter((country) => {
        const filter = regionFilters[selectedFilter];
        if (filter === "None") return country;
        return country.region === filter;
      })
    : null;

  // 2. Calculate page count (amount of pages)
  const pageCount = filteredCountries
    ? Math.ceil(filteredCountries.length / pageLength)
    : 0;

  // 3. Derived state to paginate the countries.
  const pagedCountries = filteredCountries
    ? paginate(filteredCountries, currentPage, pageLength)
    : null;

  /**
   * Changes the current page.
   * @param destination Direction in which the page will move to ("next" / "before")
   */
  const handlePageChange = (destination: "next" | "before"): void => {
    if (destination === "next") {
      setCurrentPage((current) => Math.min(pageCount - 1, current + 1));
    }
    if (destination === "before") {
      setCurrentPage((current) => Math.max(0, current - 1));
    }
  };

  return (
    <HomeContext.Provider
      value={{
        countries: pagedCountries,
        isLoading,
        getCountries,
        setSearchQuery,
        setSelectedFilter,
        currentPage,
        pageLength,
        pageCount,
        handlePageChange,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  if (!context)
    throw new Error("Home Context must be used inside its provider's scope");
  return context;
}
