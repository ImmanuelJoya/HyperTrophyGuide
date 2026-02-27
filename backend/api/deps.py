from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """JWT validation with Redis blacklist check"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
        
        # Check token blacklist (logout handling)
        if await redis.exists(f"blacklist:{credentials.credentials}"):
            raise HTTPException(status_code=401, detail="Token revoked")
            
        user = await db.get(User, int(user_id))
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return user
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Rate limiting
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost", encoding="utf8")
    await FastAPILimiter.init(redis)

# routers/workouts.py
@router.post("/generate", 
    response_model=WorkoutResponse,
    dependencies=[Depends(RateLimiter(times=10, seconds=60))])  # 10 req/min
async def generate_workout(
    request: WorkoutGenerateRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    ai_service: AIService = Depends(get_ai_service)
):
    """
    AI-powered workout generation with personalization
    """
    # Get user's recent history for personalization
    recent_workouts = await get_recent_workouts(db, user.id, limit=10)
    
    # AI-enhanced selection (not just random)
    workout_plan = await ai_service.generate_personalized_workout(
        user_profile=user.profile,
        preferences=request.preferences,
        recent_history=recent_workouts,
        available_exercises=exercise_db
    )
    
    # Cache result for 1 hour
    cache_key = f"workout:{user.id}:{hash(str(request.preferences))}"
    await redis.setex(cache_key, 3600, workout_plan.json())
    
    return workout_plan