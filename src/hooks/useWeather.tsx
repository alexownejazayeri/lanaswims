import { useQuery } from "@tanstack/react-query";

export const useWeather = () => {
  const baseUrl = "https://api.weather.gov";
  const berkeleyMarinaLat = 37.865;
  const berkeleyMarinaLng = -122.3067;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      try {
        const initialResponse = await fetch(
          `${baseUrl}/points/${berkeleyMarinaLat},${berkeleyMarinaLng}`
        );

        const initialData = await initialResponse.json();
        const forecastUrl = initialData?.properties?.forecastHourly;

        if (!forecastUrl) {
          throw new Error("Failed to obtain forecast URL");
        }

        const response = await fetch(forecastUrl);
        return await response.json();
      } catch (error) {
        console.warn(error);
        return { error };
      }
    },
  });

  return {
    isPending,
    error,
    data,
    isFetching,
  };
};
