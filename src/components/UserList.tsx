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
  return (
    <section className="px-8">
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
          {lists.length > 0 ? (
            lists.map((el) => (
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
                  {el.picture && el.picture.length > 0 && (
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
    </section>
  );
};

export default UserList;
