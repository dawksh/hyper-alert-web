import { queryClient } from "@/components/shared/ProviderLayout";
import axios from "axios";
import { Loader2 } from "lucide-react";
import phone from "phone";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";

export const MobileSection = ({
  mobileNumber,
  id,
}: {
  mobileNumber: string | null | undefined;
  id: string | null | undefined;
}) => {
  const [phoneNumber, setPhoneNumber] = useState(mobileNumber || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const number = phone(phoneNumber);
      if (!number.isValid) {
        toast.error("Invalid phone number, please verify.");
        return;
      }
      await axios.post("/api/user", {
        id: id,
        pd_id: phoneNumber,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="bg-lime-400 rounded-md w-full flex flex-col items-start px-12 py-6 gap-1 ">
        <div className="text-zinc-800 text-5xl font-bold font-['Archivo']">
          Get alerts on your phone
        </div>
        <div className="text-zinc-800 text-xl font-normal font-['Archivo']">
        Enter your phone number to get alert calls.
        </div>
      </div>
      <div className="flex flex-row gap-1 w-full">
        <div className="flex-1 bg-[#2A2A2A] rounded-md h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo']">
          Your mobile number to get alert calls
        </div>
        <PhoneInput
          defaultCountry="us"
          value={mobileNumber || phoneNumber}
          className="w-2/5 bg-white rounded-md h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo']"
          onChange={(phone) => setPhoneNumber(phone)}
        />
        <div
          className={`bg-indigo-500 rounded-md h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo'] cursor-pointer ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
        </div>
      </div>
    </div>
  );
}; 