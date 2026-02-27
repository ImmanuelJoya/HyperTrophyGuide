from openai import AsyncOpenAI
import json

class AIService:
    def __init__(self):
        self.client = AsyncOpenAI()
        
    async def generate_personalized_workout(
        self,
        user_profile: dict,
        preferences: WorkoutPreferences,
        recent_history: list,
        available_exercises: list
    ) -> WorkoutPlan:
        
        system_prompt = """You are an elite strength coach with 20 years experience. 
        Generate personalized workouts based on:
        - User's training history and recovery status
        - Progressive overload principles
        - Exercise variety to prevent adaptation
        - Scientific periodization"""
        
        user_prompt = f"""
        User Profile: {json.dumps(user_profile)}
        Requested Split: {preferences.split_type}
        Available Time: {preferences.duration_minutes} minutes
        Recent Workouts: {json.dumps(recent_history[-5:])}
        Equipment: {preferences.equipment_available}
        
        Generate a workout with exercise selection, sets, reps, rest periods, and RPE targets.
        Include form cues and safety warnings where relevant.
        """
        
        response = await self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.7
        )
        
        return WorkoutPlan.parse_raw(response.choices[0].message.content)