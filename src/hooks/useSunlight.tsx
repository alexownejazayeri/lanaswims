import { useQuery } from "@tanstack/react-query";

export const useSunlight = () => {
  const baseUrl = "https://api.sunrisesunset.io/json";

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["sunlight"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}?lat=37.865&lng=-122.3067`);

      return await response.json();
    },
  });

  return { isPending, error, data, isFetching };
};
