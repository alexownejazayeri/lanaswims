import { useQuery } from "@tanstack/react-query";

export const useTides = () => {
  const baseUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["tides"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?product=predictions&date=today&station=9410170&datum=MLLW&units=english&time_zone=lst_ldt&format=json`
      );

      return await response.json();
    },
  });

  return { isPending, error, data, isFetching };
};
