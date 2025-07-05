import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import { useActiveAlerts } from "./useActiveAlerts"

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
    id: string
}

export const usePositions = () => {
    const { address } = useAccount()
    const {data: alerts} = useActiveAlerts()
    const { data, isLoading, error } = useQuery({
        queryKey: ['positions', address],
        queryFn: async () => {
            const { data } = await axios.get<Position[]>(`/api/positions?wallet=${address}`)
            return data
        },
        enabled: !!address,
        refetchInterval: 60000,
    })
    const modifiedData = data?.map(position => {
        const hasActiveAlert = alerts?.some(alert => 
            alert.coin === position.asset && 
            Number(alert.liq_price) === Number(position.liquidationPrice) && 
            alert.direction.toLowerCase() === position.direction.toLowerCase()
        )
        return {
            ...position,
            isActive: hasActiveAlert,
            id: alerts?.find(alert => alert.coin === position.asset && alert.direction.toLowerCase() === position.direction.toLowerCase())?.id
        }
    })
    return { data: modifiedData, isLoading, error }
}