import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorkoutState {
    currentSplit: 'ppl' | 'bro' | 'ul' | 'calisthenics'
    exercises: Exercise[]
    preferences: UserPreferences
    generateWorkout: (params: GenerateParams) => Promise<void>
    logWorkout: (data: WorkoutLog) => Promise<void>
}

export const useWorkoutStore = create<WorkoutState>()(
    persist(
        (set, get) => ({
            currentSplit: 'ppl',
            exercises: [],
            preferences: defaultPreferences,
            generateWorkout: async (params) => {
                const { data } = await api.workouts.generate(params)
                set({ exercises: data.exercises })
            },
            logWorkout: async (data) => {
                await api.workouts.log(data)
                // Optimistic update
                set((state) => ({
                    recentWorkouts: [data, ...state.recentWorkouts]
                }))
            }
        }),
        { name: 'workout-storage' }
    )
)