import { useNews } from "../context/NewsContext";
import type { SourceFilterType } from "../types/news";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";

export const Filters = () => {
  const {
    filters,
    setSourceFilter,
    setDateFrom,
    setDateTo,
    setAuthorFilter,
    clearFilters,
    hasActiveFilters,
    availableAuthors,
    showFilters,
  } = useNews();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (showFilters) setVisible(true);
    else setVisible(false);
  }, [showFilters]);

  if (!showFilters) return null;

  return (
    <div
      id="filters-dropdown"
      className={`
        absolute right-10 w-64 bg-white  border border-gray-300 rounded-md shadow-lg z-50 p-4 space-y-4 transform transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
      `}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Source
        </label>
        <select
          value={filters.sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as SourceFilterType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
        >
          <option value="all">All Sources</option>
          <option value="newsapi">News API</option>
          <option value="guardian">The Guardian</option>
          <option value="worldnews">World News</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <select
          value={filters.authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
        >
          <option value="">All Authors</option>
          {availableAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          From Date
        </label>
        <DatePicker
          selected={filters.dateFrom ? new Date(filters.dateFrom) : null}
          onChange={(date) =>
            setDateFrom(date ? date.toISOString().split("T")[0] : "")
          }
          placeholderText="Select start date"
          dateFormat="yyyy-MM-dd"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          popperContainer={({ children }) => (
            <div className="z-50">{children}</div>
          )}
        />
      </div>

      <div>
        <label className="block! text-sm font-medium text-gray-700 mb-1">
          To Date
        </label>
        <DatePicker
          selected={filters.dateTo ? new Date(filters.dateTo) : null}
          onChange={(date) =>
            setDateTo(date ? date.toISOString().split("T")[0] : "")
          }
          placeholderText="Select end date"
          dateFormat="yyyy-MM-dd"
          className=" px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
          popperContainer={({ children }) => (
            <div className="z-50">{children}</div>
          )}
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer"
        >
          Clear
        </button>
      )}
    </div>
  );
};
