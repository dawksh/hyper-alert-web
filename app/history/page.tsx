import React from 'react'

const data = [
  {
    asset: 'ETH/USDC',
    type: 'SHORT',
    liquidation: '$4500.45',
    alert: '$2,945.24',
    margin: '$3200.45',
    marginPct: '25%',
    leverage: '2x',
    time: '00:25:44',
    action: 'NO',
    actionColor: 'text-red-600',
  },
  {
    asset: 'ETH/USDC',
    type: 'SHORT',
    liquidation: '$4500.45',
    alert: '$2,945.24',
    margin: '$3200.45',
    marginPct: '25%',
    leverage: '2x',
    time: '00:25:44',
    action: 'YES',
    actionColor: 'text-green-600',
  },
]

const stats = [
  { label: 'Alert History', value: '200', size: 'text-8xl' },
  { label: 'Liquidations Saved', value: '184', size: 'text-8xl' },
  { label: 'Total Funds Saved', value: '10.4k$', size: 'text-8xl' },
  { label: 'Total alert sent', value: '200', size: 'text-8xl' },
]

const History = () => (
  <div className="w-full min-h-screen bg-zinc-900 flex flex-col items-center py-2 px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5">
      <div className="flex flex-row justify-between items-center bg-lime-400 rounded-2xl p-4 w-full mb-4 h-[30vh]">
        <div className="flex flex-col gap-2">
          <span className="text-neutral-900 text-8xl font-bold">Alert</span>
          <span className="text-neutral-900 text-8xl font-bold">History</span>
        </div>
        <div className='flex flex-row gap-2'>
        <div className='flex flex-col justify-between gap-2 bg-neutral-900 rounded-2xl h-full py-8 px-4 w-[15vw]'>
           <div className='text-white text-3xl font-semibold'>Total Alerts Sent</div>
           <div className='text-white text-6xl font-semibold'>100</div>
        </div>
        <div className='flex flex-col justify-between gap-2 bg-neutral-900 rounded-2xl h-full py-8 px-4 w-[15vw]'>
           <div className='text-white text-3xl font-semibold'>Liquidations Saved</div>
           <div className='text-white text-6xl font-semibold'>184</div>
        </div>
        <div className='flex flex-col justify-between gap-2 bg-neutral-900 rounded-2xl h-full py-8 px-4 w-[15vw]'>
           <div className='text-white text-3xl font-semibold'>Total Funds Saved</div>
           <div className='text-white text-6xl font-semibold'>10.4k$</div>
        </div>
        </div>
      </div>
      <div className="w-full bg-indigo-500 rounded-3xl p-6 flex flex-col gap-4">
        <div className="grid grid-cols-8 gap-4 text-white text-md font-semibold px-8 h-8 items-center">
          <div>Asset</div>
          <div>Size</div>
          <div>Margin</div>
          <div>Liquidation</div>
          <div>Alert Price</div>
          <div>Margin %</div>
          <div>Time</div>
          <div>Action</div>
        </div>
        {data.length === 0 ? (
          <div className="text-white text-lg text-center font-medium">No history found</div>
        ) : (
          data.map((row, i) => (
            <div key={i} className="grid grid-cols-8 gap-4 bg-white rounded-2xl px-8 h-16 items-center mb-4:last:mb-0">
              <div className="text-neutral-900 text-lg font-bold flex flex-col">{row.asset}<span className="text-neutral-500 text-xs font-medium">{row.type}</span></div>
              <div className="text-neutral-900 text-lg">-</div>
              <div className="text-neutral-900 text-lg">{row.leverage}</div>
              <div className="text-neutral-900 text-lg">{row.margin}</div>
              <div className="text-neutral-900 text-lg">-</div>
              <div className="text-neutral-900 text-lg">{row.liquidation}</div>
              <div className="text-neutral-900 text-lg">-</div>
              <div className={row.actionColor + ' font-bold'}>{row.action}</div>
            </div>
          ))
        )}
      </div>
  </div>
)

export default History