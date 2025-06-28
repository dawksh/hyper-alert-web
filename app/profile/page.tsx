"use client"
import { useUser } from "@/hooks/useUser"
import { useState, useEffect } from "react"

const page = () => {
    const { data, isLoading } = useUser()
    const [formData, setFormData] = useState({
        email: "",
        telegram_id: "",
        pd_id: ""
    })
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (data) {
            setFormData({
                email: data.email || "",
                telegram_id: data.telegram_id || "",
                pd_id: data.pd_id || ""
            })
        }
    }, [data])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">alerts profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Telegram ID</label>
                    <input
                        type="text"
                        name="telegram_id"
                        value={/^\d+$/.test(formData.telegram_id) ? formData.telegram_id : ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        disabled={true}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">PD ID</label>
                    <input
                        type="text"
                        name="pd_id"
                        value={formData.pd_id}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Profile
                </button>
            </form>
            {data?.telegram_id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.telegram_id) && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
                    <p className="text-yellow-800">
                        To Connect Telegram, visit{' '}
                        <a href="https://t.me/liquialertbot" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://t.me/liquialertbot</a>
                        {' '}and send <b>/register</b> command and provide{' '}
                        <span
                            className="cursor-pointer bg-white px-2 py-1 rounded border border-yellow-400 hover:bg-yellow-200 transition-colors"
                            onClick={() => {
                                navigator.clipboard.writeText(data.telegram_id || "")
                                setCopied(true)
                                setTimeout(() => setCopied(false), 1200)
                            }}
                        >
                            {data.telegram_id}
                        </span>
                        {copied && <span className="ml-2 text-green-600">Copied!</span>}
                    </p>
                </div>
            )}
        </div>
    )
}

export default page