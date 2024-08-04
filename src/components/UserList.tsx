import { MdEdit } from "react-icons/md";
import DeleteDialog from "./ui/DeleteDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import provinceCategory from "./provinceCategory";
import PaginationPage from "./ui/PaginationPage";
import { paginate } from "@/services/paginate";
import { useState } from "react";

type Province = (typeof provinceCategory)[number];

export interface List {
  id: number;
  name: string;
  email: string;
  number: string;
  date: string;
  city: string;
  district: string;
  province: Province;
  country: string;
  picture?: string;
}

interface Props {
  lists: List[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const UserList = ({ lists, onDelete, onEdit }: Props) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const userLists = paginate(lists, currentPage, pageSize);

  return (
    <section>
      <Table className="bg-white rounded-md">
        <TableCaption className="flex"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>City</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Picture</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userLists.length > 0 ? (
            userLists.map((el) => (
              <TableRow key={el.id}>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell>{el.number}</TableCell>
                <TableCell>{el.date}</TableCell>
                <TableCell>{el.city}</TableCell>
                <TableCell>{el.district}</TableCell>
                <TableCell>{el.province}</TableCell>
                <TableCell>{el.country}</TableCell>
                <TableCell>
                  {el.picture && (
                    <img
                      src={el.picture}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <DeleteDialog onDelete={() => onDelete(el.id)} />
                  <button>
                    <MdEdit
                      className="text-blue-400"
                      size={20}
                      onClick={() => onEdit(el.id)}
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-4">
                No Records Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationPage
        itemsCount={lists.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </section>
  );
};

export default UserList;
