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

  const handleWorkoutTypeSelection = (type) => {
    setSelectedWorkoutType(type);
  };

  const getRandomExercises = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
      <h2>Select Your Workout Type</h2>
      <div className="button-group">
        <button onClick={() => handleWorkoutTypeSelection('PushPullLegs')}>PushPullLegs (PPL)</button>
        <button onClick={() => handleWorkoutTypeSelection('BroSplit')}>BroSplit</button>
        <button onClick={() => handleWorkoutTypeSelection('UpperBody-LowerBody')}>UpperBody-LowerBody</button>
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
    </div>
  );
}

export default App;