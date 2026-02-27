from sqlalchemy import String, Boolean, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import List, Optional

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    
    # Profile & Preferences
    profile: Mapped[Optional[dict]] = mapped_column(JSON, default=dict)
    fitness_level: Mapped[str] = mapped_column(String(20), default="beginner")
    goals: Mapped[List[str]] = mapped_column(JSON, default=list)
    
    # Relationships
    workouts: Mapped[List["WorkoutLog"]] = relationship(back_populates="user")
    templates: Mapped[List["WorkoutTemplate"]] = relationship(back_populates="user")
    
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    last_active: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    
    # Security
    is_verified: Mapped[bool] = mapped_column(default=False)
    mfa_enabled: Mapped[bool] = mapped_column(default=False)
    failed_login_attempts: Mapped[int] = mapped_column(default=0)

# models/workout.py
class WorkoutLog(Base):
    __tablename__ = "workout_logs"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String(100))
    split_type: Mapped[str] = mapped_column(String(20))
    
    # Structured data for analytics
    exercises: Mapped[list] = mapped_column(JSON)  # [{name, sets, reps, weight, rpe}]
    duration_minutes: Mapped[int]
    volume_kg: Mapped[float]  # Calculated total volume
    
    # AI-generated insights
    performance_score: Mapped[Optional[float]]
    recommendations: Mapped[Optional[list]] = mapped_column(JSON)
    
    started_at: Mapped[datetime]
    completed_at: Mapped[Optional[datetime]]
    
    user: Mapped["User"] = relationship(back_populates="workouts")