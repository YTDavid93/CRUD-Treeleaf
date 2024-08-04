import { useEffect, useState } from "react";
import UserForm, { FormData } from "./components/UserForm";
import UserList, { List } from "./components/UserList";
import { SubmitHandler } from "react-hook-form";

const App = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [currentData, setCurrentData] = useState<FormData | null>(null);

  // load data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("userListStore");
    if (savedData) {
      const saveDetails = JSON.parse(savedData);
      setLists(saveDetails);
    } else {
      setLists([]);
    }
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const postData = {
      name: data.name,
      email: data.email,
      number: data.number,
      date: data.date,
      city: data.city,
      district: data.district,
      province: data.province,
      country: data.country,
      picture: data.picture,
    };

    let updatedLists;
    if (id) {
      updatedLists = lists.map((list) =>
        list.id === id ? { ...list, ...postData } : list
      );
    } else {
      updatedLists = [...lists, { ...postData, id: lists.length + 1 }];
    }

    setLists(updatedLists);
    localStorage.setItem("userListStore", JSON.stringify(updatedLists));

    setId(null);
    setCurrentData(null);
  };

  const handleEdit = (id: number) => {
    setId(id);
    const dataToEdit = lists.find((list) => list.id === id);
    if (dataToEdit) {
      setCurrentData(dataToEdit);
    }
  };

  const handleDelete = (id: number) => {
    const updatedLists = lists.filter((e) => e.id !== id);
    setLists(updatedLists);
    localStorage.setItem("userListStore", JSON.stringify(updatedLists));
  };

  return (
    <main>
      <UserForm onSubmit={onSubmit} editId={id} currentData={currentData} />
      <UserList lists={lists} onDelete={handleDelete} onEdit={handleEdit} />
    </main>
  );
};

export default App;
