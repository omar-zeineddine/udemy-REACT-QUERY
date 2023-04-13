import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  /* 
    fetchNextPage: function that will be used to tell infinite scroll what function to run
    when we want more data
    hasNextPage: boolean (determines if there's anymore data to collect)
   */

  /* 
    useInfiniteQuery arguments:
    queryKey: sw-people
    queryFunction: fed an object parameter that has pageParam as one of the properties  
   */
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  return <InfiniteScroll />;
}
