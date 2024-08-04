import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"; // Adjust import if necessary
import { List } from "./UserList";

const UserInfo = () => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("userListStore");
    if (savedData) {
      setLists(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
      <div className="grid grid-cols-2 gap-4">
        {lists.map((user) => (
          <Card key={user.id} className="shadow-lg p-4 border rounded-lg">
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p className="text-sm font-medium">Email: {user.email}</p>
              <p className="text-sm font-medium">Number: {user.number}</p>
              <p className="text-sm font-medium">Date: {user.date}</p>
              <p className="text-sm font-medium">City: {user.city}</p>
              <p className="text-sm font-medium">District: {user.district}</p>
              <p className="text-sm font-medium">Province: {user.province}</p>
              <p className="text-sm font-medium">Country: {user.country}</p>
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-24 h-24 object-cover rounded-full mt-2"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Link to="/" className="mt-4 inline-block text-blue-500">
        Back to Home
      </Link>
    </div>
  );
};

export default UserInfo;
