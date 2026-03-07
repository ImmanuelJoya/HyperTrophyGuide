import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { ActivityIcon, SparklesIcon } from 'lucide-react';

export function ProgressChart() {
    const { data: analytics } = useQuery({
        queryKey: ['analytics', 'progress'],
        queryFn: fetchProgressData,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    return (
        <div className="cyber-card p-6 rounded-xl border border-cyan-500/30">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <ActivityIcon className="w-5 h-5" />
                Strength Progression
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.volumeData}>
                    <XAxis
                        dataKey="date"
                        stroke="#00f3ff"
                        tick={{ fill: '#00f3ff' }}
                    />
                    <YAxis
                        stroke="#ff00ff"
                        tick={{ fill: '#ff00ff' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0a0a0f',
                            border: '1px solid #00f3ff',
                            borderRadius: '8px'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="volume"
                        stroke="#00f3ff"
                        strokeWidth={2}
                        dot={{ fill: '#00f3ff', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: '#ff00ff' }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* AI Insights */}
            {analytics && (
                <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border-l-4 border-cyan-400">
                    <p className="text-sm text-cyan-200">
                        <SparklesIcon className="inline w-4 h-4 mr-2" />
                        {analytics.aiInsight}
                    </p>
                </div>
            )}
        </div>
    )
}