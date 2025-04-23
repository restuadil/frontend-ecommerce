// components/ui/UserTable.tsx
import {
  Button,
  Table,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@heroui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Pagination, User } from "./useUser";
import { cn } from "@/utils/cn";

interface UserTableProps {
  data: User[];
  pagination: Pagination;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const UserTable = ({
  data,
  pagination,
  currentPage,
  onPageChange,
}: UserTableProps) => {
  const startNumber = (currentPage - 1) * pagination.limit + 1;
  const endNumber = Math.min(
    currentPage * pagination.limit,
    pagination.totalData
  );
  return (
    <div>
      <Table aria-label="Users table" className="text-slate-500">
        <TableHeader>
          <TableColumn className="w-[5%]">No</TableColumn>
          <TableColumn className="w-[40%]">Name</TableColumn>
          <TableColumn className="w-[40%]">Email</TableColumn>
          <TableColumn className="w-[20%] text-center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={user._id} className={cn("hover:bg-gray-50")}>
              <TableCell>{startNumber + index}</TableCell>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="ghost"
                    color="primary"
                    onPress={() => console.log("Edit", user._id)}
                  >
                    <FiEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="light"
                    color="danger"
                    onPress={() => console.log("Delete", user._id)}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="mt-7 pt-4 flex justify-between items-center border-t border-gray-200 ">
        <span className="text-sm text-gray-600">
          Showing {startNumber} to {endNumber} of {pagination.totalData} results
        </span>
        <div className="flex space-x-2">
          <Button
            variant="light"
            onPress={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="light"
            onPress={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage >= pagination.totalPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
