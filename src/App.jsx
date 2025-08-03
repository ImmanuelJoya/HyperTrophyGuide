import { ArrowRight, Clock, Dumbbell, Flame, LogOut, Play, Sparkles, Star, Target, TrendingUp, Trophy, Users, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
// Mock data for demonstration
const armsData = {
  armExercises: [
    { name: "Bicep Curls" },
    { name: "Hammer Curls" },
    { name: "Tricep Dips" },
    { name: "Overhead Press" },
    { name: "Cable Curls" }
  ]
};

const backData = {
  backExercises: [
    { name: "Pull-ups" },
    { name: "Lat Pulldowns" },
    { name: "Bent-over Rows" },
    { name: "Deadlifts" },
    { name: "Cable Rows" }
  ]
};

const chestData = {
  chestExercises: [
    { name: "Push-ups" },
    { name: "Bench Press" },
    { name: "Chest Flyes" },
    { name: "Incline Press" },
    { name: "Dips" }
  ]
};

const lowerBodyData = {
  legExercises: [
    { name: "Squats" },
    { name: "Lunges" },
    { name: "Leg Press" },
    { name: "Calf Raises" },
    { name: "Bulgarian Split Squats" }
  ]
};

const shouldersAndAbsData = {
  shoulderExercises: [
    { name: "Shoulder Press" },
    { name: "Lateral Raises" },
    { name: "Front Raises" },
    { name: "Rear Delt Flyes" },
    { name: "Upright Rows" }
  ]
};

function App() {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [user, setUser] = useState(null);
  const [, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [authPopupVisible, setAuthPopupVisible] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWorkoutTypeSelection = (type) => {
    setSelectedWorkoutType(type);
    setExerciseList([]);
  };

  const getRandomExercises = (arr, count) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, arr.length));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      // Mock authentication
      setUser({ email });
      setAuthPopupVisible(false);
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      console.error('Auth error:', error.message);
      alert('Authentication failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setSelectedWorkoutType(null);
    setExerciseList([]);
    setIsGuest(false);
    setAuthPopupVisible(true);
  };

  const handleGuestAccess = () => {
    setIsGuest(true);
    setAuthPopupVisible(false);
  };

  const renderPopupButtons = () => {
    const workoutButtonClass = "group relative bg-white/95 hover:bg-white text-gray-900 hover:text-gray-800 px-8 py-6 rounded-3xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl border-2 border-white/50 hover:border-white backdrop-blur-xl overflow-hidden";

    switch (selectedWorkoutType) {
      case 'PushPullLegs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <button
              className={`${workoutButtonClass} hover:shadow-orange-500/20`}
              onClick={() => setExerciseList(getRandomExercises(chestData.chestExercises, 2).concat(getRandomExercises(shouldersAndAbsData.shoulderExercises, 2), getRandomExercises(armsData.armExercises, 2)))}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black">Push Day</span>
                </div>
                <p className="text-gray-600 mb-4">Chest, Shoulders & Triceps</p>
                <div className="flex items-center justify-center space-x-2 text-orange-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>45-60 min</span>
                </div>
              </div>
            </button>

            <button
              className={`${workoutButtonClass} hover:shadow-blue-500/20`}
              onClick={() => setExerciseList(getRandomExercises(backData.backExercises, 3).concat(getRandomExercises(armsData.armExercises, 2)))}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black">Pull Day</span>
                </div>
                <p className="text-gray-600 mb-4">Back & Biceps</p>
                <div className="flex items-center justify-center space-x-2 text-blue-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>45-60 min</span>
                </div>
              </div>
            </button>

            <button
              className={`${workoutButtonClass} hover:shadow-green-500/20`}
              onClick={() => setExerciseList(getRandomExercises(lowerBodyData.legExercises, 3).concat(getRandomExercises(armsData.armExercises, 2)))}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black">Leg Day</span>
                </div>
                <p className="text-gray-600 mb-4">Lower Body Power</p>
                <div className="flex items-center justify-center space-x-2 text-green-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>60-75 min</span>
                </div>
              </div>
            </button>
          </div>
        );
      case 'BroSplit':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {[
              { name: 'Chest', icon: Flame, color: 'from-red-400 to-pink-500', onClick: () => setExerciseList(getRandomExercises(chestData.chestExercises, 3)) },
              { name: 'Shoulders', icon: Sparkles, color: 'from-yellow-400 to-orange-500', onClick: () => setExerciseList(getRandomExercises(shouldersAndAbsData.shoulderExercises, 3)) },
              { name: 'Arms', icon: Zap, color: 'from-purple-400 to-pink-500', onClick: () => setExerciseList(getRandomExercises(armsData.armExercises, 3)) },
              { name: 'Legs', icon: TrendingUp, color: 'from-green-400 to-teal-500', onClick: () => setExerciseList(getRandomExercises(lowerBodyData.legExercises, 3)) },
              { name: 'Back', icon: Target, color: 'from-blue-400 to-indigo-500', onClick: () => setExerciseList(getRandomExercises(backData.backExercises, 3)) }
            ].map((workout) => {
              const IconComponent = workout.icon;
              return (
                <button key={workout.name} className={workoutButtonClass} onClick={workout.onClick}>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${workout.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-black">{workout.name}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>45 min</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        );
      case 'UpperBody-LowerBody':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <button
              className={`${workoutButtonClass} hover:shadow-purple-500/20`}
              onClick={() => setExerciseList(getRandomExercises(chestData.chestExercises, 3).concat(getRandomExercises(shouldersAndAbsData.shoulderExercises, 3)))}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black">Upper Body</span>
                </div>
                <p className="text-gray-600 mb-4">Chest, Back, Arms & Shoulders</p>
                <div className="flex items-center justify-center space-x-2 text-purple-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>50-65 min</span>
                </div>
              </div>
            </button>

            <button
              className={`${workoutButtonClass} hover:shadow-emerald-500/20`}
              onClick={() => setExerciseList(getRandomExercises(lowerBodyData.legExercises, 3))}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black">Lower Body</span>
                </div>
                <p className="text-gray-600 mb-4">Legs, Glutes & Core</p>
                <div className="flex items-center justify-center space-x-2 text-emerald-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>55-70 min</span>
                </div>
              </div>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Auth Popup */}
        {authPopupVisible && !user && !isGuest && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 w-full max-w-md shadow-2xl shadow-black/50">
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-orange-500/30 animate-pulse">
                  <Dumbbell className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {isLogin ? 'Welcome Back!' : 'Join FitFlow'}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {isLogin ? 'Ready to crush your goals?' : 'Transform your fitness journey today'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 focus:border-orange-400 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg backdrop-blur-xl"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 focus:border-orange-400 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg backdrop-blur-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-black py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 text-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{isLogin ? 'Let\'s Go!' : 'Start Training'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-white/20"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                  <button
                    type="button"
                    onClick={handleGuestAccess}
                    className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-cyan-300 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-cyan-400/30"
                  >
                    Try as Guest
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Main App Content */}
        {(user || isGuest) && (
          <div className="min-h-screen">
            {/* Enhanced Header */}
            <header className="px-6 py-8 border-b border-white/10 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">FitFlow</h1>
                    <p className="text-gray-400">Your AI Training Partner</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="hidden md:flex items-center space-x-4 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-medium flex items-center space-x-2 backdrop-blur-xl border border-white/20"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isGuest ? 'Exit' : 'Logout'}</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Enhanced Hero Section */}
            <section className="px-6 py-20">
              <div className="max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-300 px-6 py-3 rounded-full font-bold mb-12 backdrop-blur-xl border border-orange-400/30">
                  <Sparkles className="w-5 h-5" />
                  <span>AI-Powered Workout Generator</span>
                  <Star className="w-4 h-4" />
                </div>

                <h2 className="text-7xl md:text-8xl font-black text-white mb-8 leading-tight">
                  Transform Your
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Fitness Journey
                  </span>
                </h2>

                <p className="text-2xl text-gray-300 mb-20 max-w-3xl mx-auto leading-relaxed">
                  Experience the future of fitness with personalized AI workouts designed to maximize your potential and transform your body.
                </p>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">10K+</h3>
                    <p className="text-gray-400">Active Users</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">500+</h3>
                    <p className="text-gray-400">Exercises</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">98%</h3>
                    <p className="text-gray-400">Success Rate</p>
                  </div>
                </div>

                {/* Enhanced Workout Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                  <div
                    onClick={() => handleWorkoutTypeSelection('PushPullLegs')}
                    className="group cursor-pointer bg-white/5 backdrop-blur-2xl hover:bg-white/10 border-2 border-white/20 hover:border-orange-400/50 rounded-3xl p-10 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-500 group-hover:scale-110">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-6">Push Pull Legs</h3>
                    <p className="text-gray-300 leading-relaxed mb-8">The ultimate muscle-building split. Train by movement patterns for maximum growth and optimal recovery.</p>
                    <div className="flex items-center justify-center text-orange-400 font-bold group-hover:text-orange-300 transition-colors">
                      <span className="text-lg">Start Workout</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  <div
                    onClick={() => handleWorkoutTypeSelection('BroSplit')}
                    className="group cursor-pointer bg-white/5 backdrop-blur-2xl hover:bg-white/10 border-2 border-white/20 hover:border-purple-400/50 rounded-3xl p-10 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
                      <Flame className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-6">Bro Split</h3>
                    <p className="text-gray-300 leading-relaxed mb-8">Target specific muscle groups each day. Perfect for intermediate to advanced lifters seeking focused training.</p>
                    <div className="flex items-center justify-center text-purple-400 font-bold group-hover:text-purple-300 transition-colors">
                      <span className="text-lg">Start Workout</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  <div
                    onClick={() => handleWorkoutTypeSelection('UpperBody-LowerBody')}
                    className="group cursor-pointer bg-white/5 backdrop-blur-2xl hover:bg-white/10 border-2 border-white/20 hover:border-blue-400/50 rounded-3xl p-10 transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-6">Upper/Lower Split</h3>
                    <p className="text-gray-300 leading-relaxed mb-8">Simple yet effective. Alternate between upper and lower body for balanced development and recovery.</p>
                    <div className="flex items-center justify-center text-blue-400 font-bold group-hover:text-blue-300 transition-colors">
                      <span className="text-lg">Start Workout</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Workout Selection Modal */}
            {selectedWorkoutType && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-2xl flex items-center justify-center z-40 p-4">
                <div className="bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl p-16 w-full max-w-6xl shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h3 className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Choose Your Session</h3>
                      <p className="text-2xl text-gray-300 leading-relaxed">
                        {selectedWorkoutType === 'PushPullLegs' && 'Select your training focus for today\'s session'}
                        {selectedWorkoutType === 'BroSplit' && 'Which muscle group are you targeting today?'}
                        {selectedWorkoutType === 'UpperBody-LowerBody' && 'Ready for upper or lower body training?'}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedWorkoutType(null)}
                      className="p-4 hover:bg-white/20 rounded-2xl transition-colors duration-300 text-gray-400 hover:text-white backdrop-blur-xl border border-white/20"
                    >
                      <X className="w-8 h-8" />
                    </button>
                  </div>
                  {renderPopupButtons()}
                </div>
              </div>
            )}

            {/* Enhanced Exercise Results */}
            {exerciseList.length > 0 && (
              <section className="px-6 py-20">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-6 py-3 rounded-full font-bold mb-8 backdrop-blur-xl border border-green-400/30">
                      <Sparkles className="w-5 h-5" />
                      <span>Your Personalized Workout</span>
                      <Trophy className="w-4 h-4" />
                    </div>
                    <h3 className="text-6xl font-black text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Today's Training Plan</h3>
                    <p className="text-2xl text-gray-300 leading-relaxed">Complete these exercises for an effective and transformative workout session</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {exerciseList.map((exercise, index) => (
                      <div
                        key={index}
                        className="group bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/40 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 transform hover:scale-105 backdrop-blur-2xl"
                      >
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-black text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                              {exercise.name}
                            </h4>
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                              <span>Exercise #{index + 1}</span>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <span>Ready to perform</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-white/10 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-500 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border border-white/20">
                            <Play className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Exercise progress indicator */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                            <span>Sets</span>
                            <span>3-4</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Reps</span>
                            <span>8-12</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Workout Summary */}
                  <div className="mt-16 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-3xl font-black text-white">Workout Complete!</h4>
                    </div>
                    <p className="text-xl text-gray-300 mb-8">You've got {exerciseList.length} exercises to crush today. Remember to focus on form and progressive overload.</p>
                    <div className="flex items-center justify-center space-x-8 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>Est. 45-60 min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Flame className="w-5 h-5" />
                        <span>High Intensity</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>{exerciseList.length} Exercises</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-white/10 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-black text-white">FitFlow</span>
                </div>
                <p className="text-gray-400 mb-4">Transform your body, elevate your mind, achieve your goals.</p>
                <p className="text-gray-500 text-sm">© 2025 FitFlow. Powered by AI. Built for champions.</p>
              </div>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;