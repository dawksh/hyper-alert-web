import { Position, usePositions } from '@/hooks/usePositions'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

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

const tabs = ['Active Positions', 'Active Alerts']

const Positions = () => {
    const { data, isLoading } = usePositions()
    const [selected, setSelected] = useState<string[]>([])
    const [tab, setTab] = useState(0)
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />
    const all = data?.map(p => p.asset) || []
    const allSelected = all.length && selected.length === all.length
    const toggle = (asset: string) => setSelected(s => s.includes(asset) ? s.filter(a => a !== asset) : [...s, asset])
    const selectAll = () => setSelected(allSelected ? [] : all)
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
            {tab === 0 && (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-muted-foreground font-medium">
                            <th className="px-4 py-2 text-left font-medium">
                                <button onClick={selectAll} className="rounded bg-accent text-accent-foreground text-xs font-medium px-2 py-1 hover:bg-accent/70 transition">{allSelected ? 'Deselect All' : 'Select All'}</button>
                            </th>
                            {columns.slice(1).map((c, i) => (
                                <th key={i} className="px-4 py-2 text-left font-medium">{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((p: Position) => (
                            <tr key={p.asset} className="hover:bg-accent/40 transition-colors">
                                <td className="px-4 py-2">
                                    <input type="checkbox" checked={selected.includes(p.asset)} onChange={() => toggle(p.asset)} className="accent-primary" />
                                </td>
                                <td className="px-4 py-2 font-semibold">{p.asset}</td>
                                <td className="px-4 py-2">{p.size}</td>
                                <td className="px-4 py-2">{p.entryPrice}</td>
                                <td className="px-4 py-2">{p.collateral}</td>
                                <td className="px-4 py-2">{Number(p.liquidationPrice).toFixed(2)}</td>
                                <td className="px-4 py-2">{p.leverage.value}x {p.leverage.type}</td>
                                <td className="px-4 py-2 capitalize">{p.direction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {tab === 1 && (
                <div className="w-full flex items-center justify-center h-40 text-muted-foreground text-base">No active alerts</div>
            )}
        </div>
    )
}

export default Positions