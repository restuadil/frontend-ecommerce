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
import { cn } from "@/utils/cn";
import { IPagination } from "@/types/web";
import { ICategory } from "@/types/category";

interface UserTableProps {
  data: ICategory[];
  pagination: IPagination;
  currentPage: number;
  onPageChange: (page: number) => void;
  currentLimit: number;
}

export const CategoriesTable = ({
  data,
  pagination,
  currentPage,
  onPageChange,
  currentLimit,
}: UserTableProps) => {
  const startNumber = (currentPage - 1) * currentLimit + 1;
  const endNumber = Math.min(currentPage * currentLimit, pagination.totalData);
  return (
    <div>
      <Table aria-label="Users table" className="text-slate-500">
        <TableHeader>
          <TableColumn className="w-[5%]">No</TableColumn>
          <TableColumn className="w-[40%]">Category</TableColumn>
          <TableColumn className="w-[40%]">Description</TableColumn>
          <TableColumn className="w-[20%] text-center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((c, index) => (
            <TableRow key={c._id} className={cn("hover:bg-gray-50")}>
              <TableCell>{startNumber + index}</TableCell>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>{c.description}</TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="ghost"
                    color="primary"
                    onPress={() => console.log("Edit", c._id)}
                  >
                    <FiEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="light"
                    color="danger"
                    onPress={() => console.log("Delete", c._id)}
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
