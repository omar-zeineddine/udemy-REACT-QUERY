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
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery(
      // version 4 of react-query, queryKey needs to be an array.
      ["sw-people"],
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      }
    );

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map((pageData) => {
        return pageData.results.map((person) => {
          return (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.hair_color}
            />
          );
        });
      })}
    </InfiniteScroll>
  );
}
