// components/AdminUsersDashboard.tsx
import { useState } from "react";
import { SideBar } from "@/components/ui/SideBar";
import { Input, Spinner } from "@heroui/react";
import { useUsers } from "./useUser";
import { UserTable } from "./UserTable";
import { cn } from "@/utils/cn";
import { FiSearch } from "react-icons/fi";

export const AdminUsersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useUsers({
    page: currentPage,
    search: searchTerm,
    limit: 50,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (isError)
    return <div className="p-8 text-red-600">Error loading users</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 min-w-[1200px]">
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-3 ml-64">
        {/* Fixed Header Section */}
        <div
          className={cn(
            "sticky top-0 z-10 mb-4 pt-2 pb-2  backdrop-blur",
            "border-b border-gray-200 flex items-center justify-between",
            "transition-all duration-300"
          )}
        >
          <h1 className="text-2xl font-bold text-gray-900 ml-4">
            User Management
          </h1>

          <div className="flex-1 max-w-xl mx-8">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className={cn(
                "rounded-xl w-full",
                "border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
                "transition-all duration-200",
                "placeholder-gray-400 text-gray-700"
              )}
              startContent={<FiSearch className="w-5 h-5 text-gray-400" />}
            />
          </div>
        </div>

        {/* Content Area with scroll */}
        <div>
          {/* Adjust margin to account for fixed header */}
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-3xl space-y-4">
                <Spinner size="lg" className="text-primary-600" />
                <span className="text-gray-600 text-lg font-medium">
                  Loading user data...
                </span>
              </div>
            ) : data ? (
              <UserTable
                data={data.data}
                pagination={data.pagination}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            ) : null}
          </div>
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
