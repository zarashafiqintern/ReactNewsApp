import { useMemo } from "react";
import type { Article } from "../types/news";

export function useShuffledArticles(
  newsData?: { response?: { docs?: Article[] } },
  guardianData?: { response?: { docs?: Article[] } },
  worldNewsData?: { response?: { docs?: Article[] } }
) {
  return useMemo(() => {
    const combined: Article[] = [];

    if (newsData?.response?.docs) combined.push(...newsData.response.docs);
    if (guardianData?.response?.docs) combined.push(...guardianData.response.docs);
    if (worldNewsData?.response?.docs) combined.push(...worldNewsData.response.docs);

    const shuffled = [...combined];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [newsData, guardianData, worldNewsData]);
}
