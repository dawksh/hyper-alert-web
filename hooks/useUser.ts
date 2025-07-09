import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useAccount } from "wagmi"

type Credit = {
  id: string
  user_id: string
  credits: number
  createdAt: string
  updatedAt: string
}

type Payment = {
  id: string
  user_id: string
  amount: number
  createdAt: string
  stripe_id: string
  mode: string
  payment_id: string
  receipt_url: string
}

type User = {
  id: string
  address: string
  pd_id: string
  telegram_id: string
  email: string | null
  createdAt: string
  updatedAt: string
  threshold: number
  subscription_valid_until: string | null
  stripe_id: string | null
  credits: Credit[]
  payments: Payment[]
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
