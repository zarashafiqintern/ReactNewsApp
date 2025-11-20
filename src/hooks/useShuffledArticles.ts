import { useMemo } from "react";
import type { Article } from "../types/news";

export function useShuffledArticles(
  newsData?: { response?: { docs?: Article[] } },
  guardianData?: { response?: { docs?: Article[] } },
  worldNewsData?: { response?: { docs?: Article[] } }
) {
  return useMemo(() => {
    const combined: Article[] = [];
    if (guardianData?.response?.docs) combined.push(...guardianData.response.docs);

    if (newsData?.response?.docs) combined.push(...newsData.response.docs);
    if (worldNewsData?.response?.docs) combined.push(...worldNewsData.response.docs);

    return combined;
  }, [newsData, guardianData, worldNewsData]);
}
