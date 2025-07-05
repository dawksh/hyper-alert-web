"use client";
import { queryClient } from "@/components/shared/ProviderLayout";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { Loader2, MessageCircleQuestion } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import phone from "phone"
import { useRouter } from "next/navigation";

const page = () => {
  const { data, isLoading: userLoading } = useUser();
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    telegram_id: "",
    pd_id: "",
    threshold: 20,
  });
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [threshold, setThreshold] = useState(
    data?.threshold ? data.threshold * 100 : 20
  );

  useEffect(() => {
    if (data) {
      setFormData({
        email: data.email || "",
        telegram_id: data.telegram_id || "",
        pd_id: data.pd_id || "",
        threshold: data.threshold * 100 || 20,
      });
      setThreshold(data.threshold * 100 || 20);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (!data?.id) return;
    setIsLoading(true);
    try {
      const number = phone(formData.pd_id)
      if (!number.isValid) {
        toast.error("Invalid phone number, please verify.");
        return;
      }
      await axios.post("/api/user", {
        id: data?.id,
        telegram_id: formData.telegram_id,
        pd_id: formData.pd_id,
        threshold: threshold / 100,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
      router.push("/")
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };


  const { data: session } = useSession();

  if (!session?.address)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>Connect your wallet to get started</p>
        <ConnectButton />
      </div>
    );

  if (userLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">alerts profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            Telegram ID
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 cursor-pointer">
                  <MessageCircleQuestion size={16} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Unique ID for your Telegram account, used for alert delivery. Cannot be edited, please use the /register command to register your account.
              </TooltipContent>
            </Tooltip>
          </label>
          <div className={`w-full p-2 border rounded ${/^\d+$/.test(formData.telegram_id) ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {/^\d+$/.test(formData.telegram_id) ? "Connected" : "Not Connected"}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 flex items-center gap-1">
            Phone Number (With Country Code)
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 cursor-pointer">
                  <MessageCircleQuestion size={16} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Phone number for call alerts, include country code (e.g. +1).
              </TooltipContent>
            </Tooltip>
          </label>
          <PhoneInput
            defaultCountry="us"
            value={formData.pd_id || data?.pd_id || ""}
            onChange={(phone) =>
              setFormData((prev) => ({ ...prev, pd_id: phone }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            Liquidation Threshold (%)
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="ml-1 cursor-pointer">
                  <MessageCircleQuestion size={16} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Set the percentage at which you want to be alerted for
                liquidation risk.
              </TooltipContent>
            </Tooltip>
          </label>
          <input
            type="range"
            min={0}
            max={90}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-xs mt-1">{threshold}%</div>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Update Profile"}
        </button>
      </div>
    
      {data?.telegram_id &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          data.telegram_id
        ) && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-yellow-800">
              To Connect Telegram, visit{" "}
              <a
                href="https://t.me/liquialertbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://t.me/liquialertbot
              </a>{" "}
              and send <b>/register</b> command and provide{" "}
              <span
                className="cursor-pointer bg-white px-2 py-1 rounded border border-yellow-400 hover:bg-yellow-200 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(data.telegram_id || "");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }}
              >
                {data.telegram_id}
              </span>
              {copied && <span className="ml-2 text-green-600">Copied!</span>}
            </p>
          </div>
        )}
          {!!data?.payments?.length && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">invoices</h2>
          <ul className="space-y-2">
            {data.payments.filter(p => p.receipt_url).map(p => (
              <li key={p.id}>
                  invoice for ${p.amount} - {new Date(p.createdAt).toLocaleDateString()} - <a href={p.receipt_url!} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">view</a>
              </li>
            ))}
            {data.payments.filter(p => p.receipt_url).length === 0 && (
              <li className="text-gray-500">no invoices</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default page;
