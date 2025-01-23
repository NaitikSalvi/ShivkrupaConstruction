"use client";

import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner"; // Import Oval loader
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which delete button is loading
  const [editData, setEditData] = useState({}); // Track data for editing
  const [isSubmitting, setIsSubmitting] = useState(false); // Track edit form submission
  const [userToDelete, setUserToDelete] = useState(null); // Track the user to be deleted

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/userlogin");
        const data = await response.json();
        console.log(data.result);
        setUsers(data.result || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const editUser = async (id) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/usersignup/editUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      const result = await response.json();
      const updatedUser = users.map((item) =>
        item._id === id ? { ...item, ...editData } : item
      );
      setUsers(updatedUser);
      if (result.success) {
      } else {
        alert("Failed to update user!");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async (id) => {
    setLoadingId(id); // Set the loading state to true for the specific user

    try {
      const response = await fetch("/api/usersignup/" + id, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
        setUserToDelete(null); // Reset the user to delete
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoadingId(null); // Reset the loading state
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Manage Users
      </h2>

      <div className="overflow-hidden">
        <table className="w-full table-auto bg-white shadow rounded">
          <thead>
            <tr>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">ID</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Name</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Email</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Password</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Age</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr
                key={index}
                className="text-xs sm:text-sm even:bg-gray-100 odd:bg-white"
              >
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{index + 1}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.name}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2 break-words">{item.email}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.password}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.age}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          onClick={() =>
                            setEditData({
                              name: item.name,
                              email: item.email,
                              password: item.password,
                              age: item.age,
                            })
                          }
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
                          <input
                            type="text"
                            value={editData.name || ""}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            value={editData.email || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                email: e.target.value,
                              })
                            }
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Enter email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Password</label>
                          <input
                            type="password"
                            value={editData.password || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                password: e.target.value,
                              })
                            }
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Enter password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Age</label>
                          <input
                            type="number"
                            value={editData.age || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                age: e.target.value,
                              })
                            }
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Enter age"
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={async () => {
                                await editUser(item._id);
                              }}
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* AlertDialog for delete confirmation */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          onClick={() => setUserToDelete(item._id)} // Set the user to delete on click
                          disabled={loadingId === item._id} // Disable while loading
                        >
                          {loadingId === item._id ? (
                            <Oval
                              height={20}
                              width={20}
                              color="#ffffff"
                              visible={true}
                              ariaLabel="oval-loading"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this user?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteUser(userToDelete); // Delete the user after confirmation
                            }}
                          >
                            Yes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
