// components/AdminUsersDashboard.tsx
import { useState } from "react";
import { SideBar } from "@/components/ui/SideBar";
import { Button, Input, Select, SelectItem, Spinner } from "@heroui/react";
import { useUsers } from "./useUsers";
import { UsersTable } from "./UsersTable";
import { cn } from "@/utils/cn";
import { FiSearch } from "react-icons/fi";
type TableFilters = {
  search: string;
  page: number;
  limit: number;
};
export const AdminUsersDashboard = () => {
  const [filters, setFilters] = useState<TableFilters>({
    search: "",
    page: 1,
    limit: 50,
  });

  const { data, isLoading, isError, error, refetch } = useUsers(filters);

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
            User Management
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
              <SelectItem key="50" className="text-black" textValue="50">
                50
              </SelectItem>
              <SelectItem key="100" className="text-black" textValue="100">
                100
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
                Loading user data...
              </span>
            </div>
          ) : isError ? (
            // Alternatif error state dengan ikon lebih menarik
            <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden">
              <div className="text-center p-8 bg-red-50/80">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-16 h-16 text-red-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-red-800 mb-2">
                    Failed to Load Data
                  </h3>
                  <p className="text-red-700 text-sm mb-4">
                    {error?.message || "Unable to fetch user data"}
                  </p>
                  <Button
                    variant="solid"
                    color="danger"
                    onPress={() => refetch()}
                    className="px-6"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          ) : data ? (
            <UsersTable
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
                No users found matching your criteria
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
