import React, { useContext, useRef } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoHardwareChipOutline } from "react-icons/io5";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function ProfileForm() {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US")
    : "N/A";
  const minersCount = user?.owned?.length || 0;

  const getInitials = () => {
    if (!user?.firstName) return "U";
    if (!user?.lastName) return user.firstName.charAt(0).toUpperCase();
    return (
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase()
    );
  };

  const inputClass =
    "w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none";

  // Refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const companyRef = useRef();

  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();

  // Mutations
  const updatePersonal = useMutation({
    mutationFn: async () => {
      return api.patch(
        "user/personal",
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          company: companyRef.current.value,
        },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Profile updated!", { autoClose: 900 });
      queryClient.invalidateQueries(["user-info"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Update failed");
    },
  });

  const updateAddress = useMutation({
    mutationFn: async () => {
      return api.patch(
        "user/address",
        {
          street: streetRef.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          zip: zipRef.current.value,
          country: countryRef.current.value,
        },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Address updated!", { autoClose: 900 });
      queryClient.invalidateQueries(["user-info"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Address update failed");
    },
  });

  const handleSave = () => {
    updatePersonal.mutate();
    updateAddress.mutate();
  };

  return (
    <div className="flex flex-col gap-5 relative">
      {/* Title */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Profile Settings
        </h3>
        <p className="text-sm text-gray-500">
          Manage your account information and notification preferences
        </p>
      </div>

      {/* Profile Top Card */}
      <div className="border border-gray-300 rounded-xl bg-white p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          {user?.image ? (
            <img
              src={user.image}
              className="w-14 h-14 rounded-full object-cover"
              alt="user"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              {getInitials()}
            </div>
          )}

          <div>
            <p className="font-semibold text-gray-800 text-sm sm:text-base">
              {fullName}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-500 text-xs">
              <div className="flex items-center gap-1">
                <CiCalendar /> Joined: {joinedDate}
              </div>
              <div className="flex items-center gap-1">
                <IoHardwareChipOutline /> {minersCount} Miners
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="border border-gray-300 rounded-xl bg-white p-5 sm:p-6 ">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Personal Information
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className={inputClass}
              defaultValue={user?.firstName}
              placeholder="First Name"
              ref={firstNameRef}
            />

            <input
              className={inputClass}
              defaultValue={user?.lastName}
              placeholder="Last Name"
              ref={lastNameRef}
            />

            <input
              className={`${inputClass} sm:col-span-2`}
              defaultValue={user?.email}
              placeholder="Email Address"
              ref={emailRef}
            />

            <input
              className={inputClass}
              defaultValue={user?.companyName}
              placeholder="Company"
              ref={companyRef}
            />

            <input
              className={`${inputClass} sm:col-span-2`}
              defaultValue={user?.phone}
              placeholder="Phone Number"
              ref={phoneRef}
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="border border-gray-300 rounded-xl bg-white p-5 sm:p-6 ">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Address Information
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className={`${inputClass} sm:col-span-2`}
              defaultValue={user?.address?.street}
              placeholder="Street Address"
              ref={streetRef}
            />

            <input
              className={inputClass}
              defaultValue={user?.address?.city}
              placeholder="City"
              ref={cityRef}
            />

            <input
              className={inputClass}
              defaultValue={user?.address?.state}
              placeholder="State / Province"
              ref={stateRef}
            />

            <input
              className={inputClass}
              defaultValue={user?.address?.zip}
              placeholder="Zip Code"
              ref={zipRef}
            />

            <select
              className={inputClass}
              defaultValue={user?.address?.country || ""}
              ref={countryRef}
            >
              <option value="">Select Country</option>
              <option>Germany</option>
              <option>United States</option>
              <option>India</option>
              <option>Canada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full flex justify-end sm:static">
        <button
          type="button"
          className="w-full sm:w-auto bg-[#2B347A] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#232b67]"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
