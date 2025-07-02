import { Alert, useActiveAlerts } from '@/hooks/useActiveAlerts'
import { Position, usePositions } from '@/hooks/usePositions'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { queryClient } from '../shared/ProviderLayout'
import { useUser } from '@/hooks/useUser'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const columns = [
    'select',
    'Asset',
    'Size',
    'Entry',
    'Collateral',
    'Liq. Price',
    'Leverage',
    'Direction',
]

const alertColumns = [
    'select',
    'Coin',
    'Liq. Price',
    'Direction',
    'Acknowledged',
    'Last Alert',
]

const tabs = ['Active Positions', 'Active Alerts']

const PositionsTable = ({ data, alerts }: { data: Position[], alerts: Alert[] }) => {
    const [selected, setSelected] = useState<string[]>([])
    const { address } = useAccount()
    const { data: user } = useUser()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const all = data?.map(p => p.asset) || []
    const allSelected = !!all.length && selected.length === all.length
    const isDisabled = (p: Position) => alerts?.some(a => a.coin === p.asset && Number(a.liq_price) === Number(p.liquidationPrice) && a.direction.toLowerCase() === p.direction.toLowerCase())
    const toggle = (asset: string) => setSelected(s => s.includes(asset) ? s.filter(a => a !== asset) : [...s, asset])
    const selectAll = () => setSelected(allSelected ? [] : all.filter(a => !isDisabled(data.find(p => p.asset === a)!)))
    const createAlert = async () => {
        if ((user?.telegram_id && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(user.telegram_id)) && !user?.pd_id) {
            toast.error('Please connect your Telegram or PD account to create alerts.')
            router.push('/profile')
            return
        }
        setLoading(true)
        await axios.post('/api/alerts', {
            alerts: selected.map(a => ({
                asset: a,
                liqPrice: data.find(p => p.asset === a)?.liquidationPrice,
                direction: data.find(p => p.asset === a)?.direction.toLowerCase(),
                address
            }))
        })
        queryClient.invalidateQueries({ queryKey: ['activeAlerts'] })
        setLoading(false)
    }
    if (data.length === 0) return <div className="w-full flex items-center justify-center h-40 text-muted-foreground text-base">No active positions</div>
    return (
        <div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-muted-foreground font-medium">
                        <th className="px-4 py-2 text-left font-medium">
                            <input type="checkbox" checked={allSelected} onChange={selectAll} className="accent-primary" />
                        </th>
                        {columns.slice(1).map((c, i) => (
                            <th key={i} className="px-4 py-2 text-left font-medium">{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((p: Position) => {
                        const disabled = isDisabled(p)
                        return (
                            <tr key={p.asset} className={`transition-colors ${disabled ? 'bg-muted text-muted-foreground' : 'hover:bg-accent/40'}`}>
                                <td className="px-4 py-2">
                                    <input type="checkbox" checked={selected.includes(p.asset)} onChange={() => !disabled && toggle(p.asset)} className="accent-primary" disabled={disabled} />
                                </td>
                                <td className="px-4 py-2 font-semibold">{p.asset}</td>
                                <td className="px-4 py-2">{Math.abs(Number(p.size))}</td>
                                <td className="px-4 py-2">{p.entryPrice}</td>
                                <td className="px-4 py-2">{Number(p.collateral).toFixed(2)}</td>
                                <td className="px-4 py-2">{Number(p.liquidationPrice).toFixed(2)}</td>
                                <td className="px-4 py-2">{p.leverage.value}x {p.leverage.type}</td>
                                <td className="px-4 py-2 capitalize">{p.direction}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <Button variant="secondary" onClick={createAlert} disabled={loading || !selected.length}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Alert'}
                </Button>
            </div>
        </div>
    )
}

const AlertsTable = ({ data }: { data: Alert[] }) => {
    const [selected, setSelected] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const all = data?.map(a => a.id) || []
    const allSelected = !!all.length && selected.length === all.length
    const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(a => a !== id) : [...s, id])
    const selectAll = () => setSelected(allSelected ? [] : all)
    const deleteAlerts = async () => {
        setLoading(true)
        await axios.delete('/api/alerts', { data: selected })
        queryClient.invalidateQueries({ queryKey: ['activeAlerts'] })
        setLoading(false)
    }
    if (!data.length) return <div className="w-full flex items-center justify-center h-40 text-muted-foreground text-base">No active alerts</div>
    return (
        <div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-muted-foreground font-medium">
                        <th className="px-4 py-2 text-left font-medium">
                            <input type="checkbox" checked={allSelected} onChange={selectAll} className="accent-primary" />
                        </th>
                        {alertColumns.slice(1).map((c, i) => (
                            <th key={i} className="px-4 py-2 text-left font-medium">{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(a => (
                        <tr key={a.id} className="hover:bg-accent/40 transition-colors">
                            <td className="px-4 py-2">
                                <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggle(a.id)} className="accent-primary" />
                            </td>
                            <td className="px-4 py-2 font-semibold">{a.coin}</td>
                            <td className="px-4 py-2">{Number(a.liq_price).toFixed(2)}</td>
                            <td className="px-4 py-2 capitalize">{a.direction}</td>
                            <td className="px-4 py-2">{a.acknowledged ? 'Yes' : 'No'}</td>
                            <td className="px-4 py-2">
                                {new Date(a.last_alert).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={deleteAlerts} disabled={loading || !selected.length}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete Alerts'}
                </Button>
            </div>
        </div>
    )
}

const Positions = () => {
    const { data: positions, isLoading: positionsLoading } = usePositions()
    const { data: alerts, isLoading: alertsLoading } = useActiveAlerts()
    const [tab, setTab] = useState(0)
    if (positionsLoading || alertsLoading) return <Loader2 className="w-4 h-4 animate-spin" />
    return (
        <div className="w-full max-w-3xl mx-auto mt-6">
            <div className="flex gap-2 mb-4">
                {tabs.map((t, i) => (
                    <button
                        key={t}
                        onClick={() => setTab(i)}
                        className={`px-4 py-1.5 rounded font-medium text-sm transition ${tab === i ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            {tab === 0 && positions && alerts && <PositionsTable data={positions} alerts={alerts} />}
            {tab === 1 && alerts && <AlertsTable data={alerts} />}

        </div>
    )
}

export default Positions