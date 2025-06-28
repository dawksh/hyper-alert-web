import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useAccount } from "wagmi"

type User = {
    id: string
    address: string
    pd_id: string | null
    telegram_id: string | null
    email: string | null
    createdAt: string
    updatedAt: string
}

export const useUser = (): { data: User | undefined, isLoading: boolean } => {
    const { address } = useAccount()
    const { data, isLoading } = useQuery<User>({
        queryKey: ['user', address],
        queryFn: async () => {
            const { data } = await axios.get(`/api/user`, {
                params: {
                    wallet: address
                }
            })
            return data
        },
        enabled: !!address,
        refetchInterval: 60000
    })
    return { data, isLoading }
}
