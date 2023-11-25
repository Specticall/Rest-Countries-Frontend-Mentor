import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChilrenProp, CountryDetails } from "../Types/types";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../Helper/config";

/*
Native name
Population
Region
Sub Region
Capital
Top Level Domain
Currencies Euro
Languages
Border countries: [...,...,...]
*/

interface CountryValues {
  isLoading: boolean;
  country: CountryDetails | null;
}

const CountryContext = createContext<CountryValues | null>(null);
const QUERY_FILTER =
  "fields=name,population,region,subregion,capital,currencies,languages,flags,borders";

export function CountryProvider({ children }: ChilrenProp): ReactElement {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const countryCode = searchParams.get("codes");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCountry = async (): Promise<void> => {
      try {
        //prettier-ignore
        const response = await fetch(`${BASE_URL}/alpha?codes=${countryCode}&${QUERY_FILTER}`,{ signal });
        const data = await response.json();

        if (!response.ok)
          throw new Error("Something went wrong while fetching");

        setCountry(data[0]);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCountry();

    // Abort ongoing data fetches on unmount.
    return () => {
      controller.abort();
    };
  }, [countryCode]);

  return (
    <CountryContext.Provider value={{ country, isLoading }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context)
    throw new Error(
      "Country context must be used inside its provider's scope!"
    );
  return context;
}
