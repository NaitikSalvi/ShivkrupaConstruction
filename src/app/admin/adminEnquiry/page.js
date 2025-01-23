"use client"
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

const EnquiryManagement = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track delete button loading
  const [editData, setEditData] = useState({}); // Track data for editing
  const [isSubmitting, setIsSubmitting] = useState(false); // Track edit form submission
  const [deleteEnquiryId, setDeleteEnquiryId] = useState(null); // Store the ID of the enquiry to be deleted

  // Fetch enquiries on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/userenquiry");
        const data = await response.json();
        setEnquiry(data.result || []);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle editing an enquiry
  const editEnquiry = async (id) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/userenquiry/editenquiry/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      const result = await response.json();
      const updatedEnquiries = enquiry.map((item) =>
        item._id === id ? { ...item, ...editData } : item
      );
      setEnquiry(updatedEnquiries);
      if (result.success) {
      } else {
        alert("Failed to update enquiry!");
      }
    } catch (error) {
      console.error("Error editing enquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deleting an enquiry
  const deleteEnquiry = async () => {
    if (deleteEnquiryId) {
      setLoadingId(deleteEnquiryId);
      try {
        const response = await fetch(`/api/userenquiry/${deleteEnquiryId}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.success) {
          setEnquiry((prev) => prev.filter((item) => item._id !== deleteEnquiryId));
        } else {
          alert("Failed to delete enquiry!");
        }
      } catch (error) {
        console.error("Error deleting enquiry:", error);
      } finally {
        setLoadingId(null);
        setDeleteEnquiryId(null); // Reset delete enquiry ID
      }
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Manage Enquiries
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-xs sm:text-sm">ID</th>
              <th className="border px-4 py-2 text-xs sm:text-sm">Name</th>
              <th className="border px-4 py-2 text-xs sm:text-sm">Email</th>
              <th className="border px-4 py-2 text-xs sm:text-sm">Message</th>
              <th className="border px-4 py-2 text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiry.map((item, index) => (
              <tr key={index} className="text-xs sm:text-sm">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.message}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center space-x-2">
                    {/* Edit Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          onClick={() =>
                            setEditData({
                              name: item.name,
                              email: item.email,
                              message: item.message,
                            })
                          }
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Enquiry</DialogTitle>
                        </DialogHeader>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Name
                          </label>
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
                          <label className="block text-sm font-medium mb-2">
                            Email
                          </label>
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
                          <label className="block text-sm font-medium mb-2">
                            Message
                          </label>
                          <textarea
                            value={editData.message || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                message: e.target.value,
                              })
                            }
                            className="w-full border px-4 py-2 rounded"
                            placeholder="Write your message"
                            rows={4}
                          ></textarea>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={async () => {
                                await editEnquiry(item._id);
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

                    {/* Delete Button with Confirmation */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                          onClick={() => setDeleteEnquiryId(item._id)}
                          disabled={loadingId === item._id}
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
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete this enquiry?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeleteEnquiryId(null)}>
                            No
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              deleteEnquiry();
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

export default EnquiryManagement;
