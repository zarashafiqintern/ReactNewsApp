import React from "react";

interface FiltersProps {
  sourceFilter: string;
  setSourceFilter: (value: string) => void;
  dateFrom: string;
  setDateFrom: (value: string) => void;
  dateTo: string;
  setDateTo: (value: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  sourceFilter,
  setSourceFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  return (
    <div className="bg-white border-t p-4 flex flex-wrap gap-4 z-20">
      <select
        value={sourceFilter}
        onChange={(e) => setSourceFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="all">All Sources</option>
        <option value="newsapi">News API</option>
        <option value="guardian">The Guardian</option>
        <option value="worldnews">World News</option>
      </select>

      <input
        type="date"
        className="px-3 py-2 border rounded-lg"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />

      <input
        type="date"
        className="px-3 py-2 border rounded-lg"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />
    </div>
  );
};
