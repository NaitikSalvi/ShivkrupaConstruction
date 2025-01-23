"use client";

import { useState, useEffect } from "react";
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

const PostPropertyManagement = () => {
  const [property, setProperty] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track the ID of the button being clicked
  const [editData, setEditData] = useState({}); // Track data for editing
  const [isSubmitting, setIsSubmitting] = useState(false); // Track edit form submission
  const [deleteId, setDeleteId] = useState(null); // Track the property ID for deletion

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/addProperty");
        const data = await response.json();
        console.log(data.result);
        setProperty(data.result || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const editProperty = async (id) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/addProperty/editproperty/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      const result = await response.json();
      const updatedProperty = property.map((item) =>
        item._id === id ? { ...item, ...editData } : item
      );
      setProperty(updatedProperty);
      if (!result.success) {
        alert("Failed to update Property!");
      }
    } catch (error) {
      console.error("Error editing Property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduct = async () => {
    if (!deleteId) return;
    setLoadingId(deleteId); // Set the loading state for the clicked button
    try {
      let response = await fetch(`/api/addProperty/${deleteId}`, {
        method: "DELETE",
      });
      response = await response.json();
      if (response.success) {
        const propertyAfterDelete = property.filter(
          (properties) => properties._id !== deleteId
        );
        setProperty(propertyAfterDelete);
        setDeleteId(null); // Reset deleteId after success
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Please try again.");
    } finally {
      setLoadingId(null); // Reset the loading state after the request
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Manage PostProperty
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">ID</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">User Type</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Name</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Email</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Mobile</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Location</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Property Type</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Property Name</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Price</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Description</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Date of Post</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {property.map((item, index) => (
              <tr key={index} className="text-xs sm:text-sm even:bg-gray-100 odd:bg-white">
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{index + 1}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.accountType}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.name}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2 break-words">{item.email}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.mobile}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.location}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.propertyType}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.propertyName}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.price}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2 break-words">{item.description}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{item.createdAt}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          onClick={() =>
                            setEditData({
                              userType: item.accountType,
                              name: item.name,
                              email: item.email,
                              mobile: item.mobile,
                              location: item.location,
                              propertyType: item.propertyType,
                              propertyName: item.propertyName,
                              price: item.price,
                              description: item.description,
                            })
                          }
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md h-96 overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Property</DialogTitle>
                        </DialogHeader>
                        <div>{/* Input fields for editing */}</div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={async () => {
                                await editProperty(item._id);
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

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          onClick={() => setDeleteId(item._id)} // Set the delete ID when clicked
                          disabled={loadingId === item._id} // Disable while loading
                        >
                          {loadingId === item._id ? (
                            <span className="loader border-t-transparent border-2 border-white rounded-full w-4 h-4 mr-2"></span>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this property?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription></AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeleteId(null)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteProduct(); // Perform the deletion
                            }}
                          >
                            Confirm
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

export default PostPropertyManagement;
