import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useAccount } from "wagmi"

export type Alert = {
    id: string
    coin: string
    liq_price: number
    user_address: string
    acknowledged: boolean
    direction: string
    last_alert: string
    createdAt: string
    updatedAt: string
}

export const useActiveAlerts = () => {
    const { address } = useAccount()
    const { data, isLoading, error } = useQuery({
        queryKey: ['activeAlerts', address],
        queryFn: async () => {
            const { data } = await axios.get<Alert[]>(`/api/alerts?wallet=${address}`)
            return data
        },
        enabled: !!address,
        refetchInterval: 60000,
    })

    return { data, isLoading, error }
}