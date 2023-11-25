manual fetch request on home context:

  // const getCountries = async (country_name: string) => {
  //   try {
  //     // Aborts previous processes
  //     if (previousController.current) {
  //       previousController.current.abort();
  //     }

  //     const response = await fetch(
  //       `${BASE_URL}/name/${country_name}${QUERY_FILTER}`,
  //       { signal }
  //     );
  //     const data: CountryData[] = await response.json();

  //     if (!response.ok)
  //       throw new Error("Something went wrong when fetching countries");

  //     setCountries(data);
  //   } catch (error) {
  //     // If the error is the instanc of the Error constructor
  //     if (error instanceof Error) {
  //       // Logs a string when the error is caused by an abort controller.
  //       if (error.name === "AbortController") console.log("Request Aborted");
  //       // console.log(error.message);
  //     } else {
  //       console.log(JSON.stringify(error));
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };