import { StateSetter } from "../Types/types";

type fetchRequestParams<S> = {
  URL: string;
  stateSetter: StateSetter<S>;
  stateSetterLoading?: StateSetter<boolean>;
  previousController: AbortController | null;
  // Idk what the type is
  signal: any;
};

export async function fetchRequest<State>({
  URL,
  stateSetter,
  stateSetterLoading,
  previousController,
  signal,
}: fetchRequestParams<State>): Promise<void> {
  try {
    // Aborts previous processes
    if (previousController) {
      previousController.abort();
    }

    const response = await fetch(URL, { signal });
    const data = await response.json();

    if (!response.ok)
      throw new Error("Something went wrong when fetching countries");

    stateSetter(data);
  } catch (error) {
    // If the error is the instanc of the Error constructor
    if (error instanceof Error) {
      // Logs a string when the error is caused by an abort controller.
      if (error.name === "AbortController") console.log("Request Aborted");
      // console.log(error.message);
    } else {
      console.log(JSON.stringify(error));
    }
  } finally {
    if (stateSetterLoading) {
      stateSetterLoading(false);
    }
  }
}
