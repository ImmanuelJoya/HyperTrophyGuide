import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import armsData from './ExerciseList/Arms.json';
import backData from './ExerciseList/Back.json';
import chestData from './ExerciseList/Chest.json';
import lowerBodyData from './ExerciseList/LowerBody.json';
import shouldersAndAbsData from './ExerciseList/SholdersAndABS.json';

function App() {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [authPopupVisible, setAuthPopupVisible] = useState(!localStorage.getItem('token'));
  const [isGuest, setIsGuest] = useState(false); // New state for guest mode

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
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/token', `username=${username}&password=${password}`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        const { access_token } = response.data;
        setToken(access_token);
        localStorage.setItem('token', access_token);
        setAuthPopupVisible(false);
      } else {
        await axios.post('http://localhost:8000/register', { username, email }, { params: { password } });
        setIsLogin(true);
        alert('Registration successful! Please log in.');
      }
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      console.error('Auth error:', error.response?.data || error.message);
      alert('Authentication failed: ' + (error.response?.data.detail || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setSelectedWorkoutType(null);
    setExerciseList([]);
    setIsGuest(false); // Reset guest mode on logout
    setAuthPopupVisible(true);
  };

  const handleGuestAccess = () => {
    setIsGuest(true);
    setAuthPopupVisible(false);
  };

  const renderPopupButtons = () => {
    switch (selectedWorkoutType) {
      case 'PushPullLegs':
        return (
          <div className="button-group">
            <button onClick={() => setExerciseList(getRandomExercises(chestData.chestExercises, 2).concat(getRandomExercises(shouldersAndAbsData.shoulderExercises, 2), getRandomExercises(armsData.armExercises, 2)))}>
              Push
            </button>
            <button onClick={() => setExerciseList(getRandomExercises(backData.backExercises, 3).concat(getRandomExercises(armsData.armExercises, 2)))}>
              Pull
            </button>
            <button onClick={() => setExerciseList(getRandomExercises(lowerBodyData.legExercises, 3).concat(getRandomExercises(armsData.armExercises, 2)))}>
              Legs
            </button>
          </div>
        );
      case 'BroSplit':
        return (
          <div className="button-group">
            <button onClick={() => setExerciseList(getRandomExercises(chestData.chestExercises, 3))}>Chest</button>
            <button onClick={() => setExerciseList(getRandomExercises(shouldersAndAbsData.shoulderExercises, 3))}>Shoulders</button>
            <button onClick={() => setExerciseList(getRandomExercises(armsData.armExercises, 3))}>Arms</button>
            <button onClick={() => setExerciseList(getRandomExercises(lowerBodyData.legExercises, 3))}>Legs</button>
            <button onClick={() => setExerciseList(getRandomExercises(backData.backExercises, 3))}>Back</button>
          </div>
        );
      case 'UpperBody-LowerBody':
        return (
          <div className="button-group">
            <button onClick={() => setExerciseList(getRandomExercises(chestData.chestExercises, 3).concat(getRandomExercises(shouldersAndAbsData.shoulderExercises, 3)))}>
              UpperBody
            </button>
            <button onClick={() => setExerciseList(getRandomExercises(lowerBodyData.legExercises, 3))}>LowerBody</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {authPopupVisible && (
        <div className="auth-popup">
          <h3>{isLogin ? 'Login' : 'Register'}</h3>
          <form onSubmit={handleAuth}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              Switch to {isLogin ? 'Register' : 'Login'}
            </button>
            <button type="button" className="guest-btn" onClick={handleGuestAccess}>
              Use as Guest
            </button>
          </form>
        </div>
      )}
      {(token || isGuest) && (
        <>
          <h2>Select Your Workout Type</h2>
          <div className="button-group">
            <button onClick={() => handleWorkoutTypeSelection('PushPullLegs')}>PushPullLegs (PPL)</button>
            <button onClick={() => handleWorkoutTypeSelection('BroSplit')}>BroSplit</button>
            <button onClick={() => handleWorkoutTypeSelection('UpperBody-LowerBody')}>UpperBody-LowerBody</button>
            <button onClick={handleLogout}>{isGuest ? 'Exit Guest Mode' : 'Logout'}</button>
          </div>
          {selectedWorkoutType && (
            <div className="popup">
              <h3>{selectedWorkoutType} Options</h3>
              {renderPopupButtons()}
              <button className="close-btn" onClick={() => setSelectedWorkoutType(null)}>Close</button>
            </div>
          )}
          {exerciseList.length > 0 && (
            <div>
              <h3>Selected Exercises:</h3>
              <ul>
                {exerciseList.map((exercise, index) => (
                  <li key={index}>{exercise.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;