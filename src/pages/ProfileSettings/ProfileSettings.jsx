import React from "react";
import ProfileForm from "../../components/userprofile/ProfileForm";
import PasswordUpdate from "../../components/userprofile/PasswordUpdate";

export default function ProfileSettings() {
  return (
    <div>
      <ProfileForm />
      <PasswordUpdate />
    </div>
  );
}
