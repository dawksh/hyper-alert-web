import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

export type Position = {
    asset: string
    size: string
    entryPrice: string
    collateral: string
    liquidationPrice: string
    leverage: {
        type: string
        value: number
    }
    direction: string
}

export const usePositions = () => {
    const { address } = useAccount()
    const { data, isLoading, error } = useQuery({
        queryKey: ['positions', address],
        queryFn: async () => {
            const { data } = await axios.get<Position[]>(`/api/positions?wallet=${address}`)
            return data
        },
        enabled: !!address,
        refetchInterval: 60000,
    })
    return { data, isLoading, error }
}