import { SetStateAction } from "react";

export interface ChilrenProp {
  children: React.ReactNode;
}

export type NativeName = {
  official: string;
  common: string;
};

export type StateSetter<T> = React.Dispatch<SetStateAction<T>>;

type currency = {
  name: string;
  symbol: string;
};

export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName: unknown;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
  };
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
}

export type CountryDetails = {
  name: {
    common: string;
    official: string;
    nativeName: any;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  currencies: Record<string, currency>;
  languages: Record<string, string>;
  flags: {
    png: string;
  };
  borders: string[];
};
