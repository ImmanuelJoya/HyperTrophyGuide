import { Suspense } from 'react'
import { WorkoutGenerator } from '@/components/workouts/WorkoutGenerator'
import { WorkoutSkeleton } from '@/components/ui/skeletons'

export const metadata = {
    title: 'Generate Workout | HyperTrophyGuide Pro',
    description: 'AI-powered workout generation tailored to your goals',
}

export default async function WorkoutsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Workout Generator
            </h1>
            <Suspense fallback={<WorkoutSkeleton />}>
                <WorkoutGenerator />
            </Suspense>
        </div>
    )
}