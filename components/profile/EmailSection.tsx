import { queryClient } from "@/components/shared/ProviderLayout"
import axios from "axios"
import { Loader2 } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"

export const EmailSection = ({
  email,
  id,
}: {
  email: string | null | undefined
  id: string | null | undefined
}) => {
  const [emailValue, setEmailValue] = useState(email || "")
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    if (!id) return
    setIsLoading(true)
    try {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailValue)) {
        toast.error("Invalid email")
        return
      }
      await axios.post("/api/user", { id, email: emailValue })
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success("Profile updated")
    } catch {
      toast.error("Failed to update email")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="bg-lime-400 rounded-md w-full flex flex-col items-start px-12 py-6 gap-1 ">
        <div className="text-zinc-800 text-5xl font-bold font-['Archivo']">Register your email</div>
        <div className="text-zinc-800 text-xl font-normal font-['Archivo']">Enter your email to be able to buy plans.</div>
      </div>
      <div className="flex flex-row gap-1 w-full">
        <div className="flex-1 bg-[#2A2A2A] rounded-md h-20 flex items-center px-8 text-white text-xl font-medium font-['Archivo']">Your email to get alerts</div>
        <input
          type="email"
          value={emailValue}
          placeholder="email@example.com"
          onChange={e => setEmailValue(e.target.value)}
          className="w-2/5 bg-white rounded-md h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo']"
        />
        <div
          className={`bg-indigo-500 rounded-md h-20 flex items-center px-8 text-neutral-900 text-xl font-medium font-['Archivo'] cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleSubmit}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Update"}
        </div>
      </div>
    </div>
  )
} 