import { useEffect, useRef } from 'react'

export function useWorkoutSession(workoutId: string) {
    const ws = useRef<WebSocket | null>(null)

    useEffect(() => {
        ws.current = new WebSocket(
            `wss://api.hypertrophyguide.com/ws/workouts/${workoutId}`
        )

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data)

            switch (data.type) {
                case 'rest_timer':
                    // Sync rest timer across devices
                    updateRestTimer(data.remaining_seconds)
                    break
                case 'partner_update':
                    // For future social feature - workout with friends
                    showPartnerProgress(data)
                    break
                case 'form_check':
                    // AI form feedback in real-time
                    showFormFeedback(data.feedback)
                    break
            }
        }

        return () => ws.current?.close()
    }, [workoutId])

    const logSet = (setData: SetData) => {
        ws.current?.send(JSON.stringify({
            type: 'log_set',
            timestamp: new Date().toISOString(),
            data: setData
        }))
    }

    return { logSet }
}