// components/AdminUsersDashboard.tsx
import { useState } from "react";
import { SideBar } from "@/components/ui/SideBar";
import { Input, Select, SelectItem, Spinner } from "@heroui/react";
import { cn } from "@/utils/cn";
import { FiSearch } from "react-icons/fi";
import { useCategories } from "./useCategories";
import { CategoriesTable } from "./CategoriesTable";
type TableFilters = {
  search: string;
  page: number;
  limit: number;
};
export const AdminCategoriesDashboard = () => {
  const [filters, setFilters] = useState<TableFilters>({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError } = useCategories(filters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  const handleLimitChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      limit: Number(value),
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  if (isError)
    return <div className="p-8 text-red-600">Error loading Categories</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 min-w-[1200px]">
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-3 ml-64">
        {/* Fixed Header Section */}
        <div
          className={cn(
            "sticky top-0 z-10 mb-4 mx-2 pt-2 pb-3 backdrop-blur",
            "border-b border-gray-200 flex items-center justify-between",
            "transition-all duration-300"
          )}
        >
          <h1 className="text-2xl font-bold text-gray-900 ml-4 ">
            Category Management
          </h1>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={handleSearch}
              className={cn(
                "rounded-xl w-[500px]",
                "border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
                "transition-all duration-200",
                "placeholder-gray-400 text-gray-700"
              )}
              startContent={<FiSearch className="w-5 h-5 text-gray-400" />}
            />

            {/* Limit Selector */}
            <Select
              label="Show"
              labelPlacement="outside-left"
              className="w-32 text-black"
              selectedKeys={[String(filters.limit)]}
              onChange={(e) => handleLimitChange(e.target.value)}
            >
              <SelectItem key="10" className="text-black" textValue="10">
                10
              </SelectItem>
              <SelectItem key="20" className="text-black" textValue="20">
                20
              </SelectItem>
              <SelectItem key="30" className="text-black" textValue="30">
                30
              </SelectItem>
            </Select>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-3xl space-y-4">
              <Spinner size="lg" className="text-primary-600" />
              <span className="text-gray-600 text-lg font-medium">
                Loading category data...
              </span>
            </div>
          ) : data ? (
            <CategoriesTable
              data={data.data}
              pagination={data.pagination}
              currentPage={filters.page}
              onPageChange={handlePageChange}
              currentLimit={filters.limit}
            />
          ) : null}

          {/* Empty State */}
          {!isLoading && data?.data.length === 0 && (
            <div className="mt-8 text-center py-12 bg-gray-50 rounded-xl">
              <div className="text-gray-500 text-lg">
                No Category found matching your criteria
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
