import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedWorkoutType, setSelectedWorkoutType] = useState(null);

  const handleWorkoutTypeSelection = (type) => {
    setSelectedWorkoutType(type);
  };

  const renderPopupButtons = () => {
    switch (selectedWorkoutType) {
      case 'PushPullLegs':
        return (
          <>
            <button className="btn-grad" onClick={() => console.log('Push')}>Push</button>
            <button className="btn-grad" onClick={() => console.log('Pull')}>Pull</button>
            <button className="btn-grad" onClick={() => console.log('Legs')}>Legs</button>
          </>
        );
      case 'BroSplit':
        return (
          <>
            <button className="btn-grad" onClick={() => console.log('Chest')}>Chest</button>
            <button className="btn-grad" onClick={() => console.log('Shoulders')}>Shoulders</button>
            <button className="btn-grad" onClick={() => console.log('Arms')}>Arms</button>
            <button className="btn-grad" onClick={() => console.log('Legs')}>Legs</button>
            <button className="btn-grad" onClick={() => console.log('Back')}>Back</button>
          </>
        );
      case 'UpperBody-LowerBody':
        return (
          <>
            <button className="btn-grad" onClick={() => console.log('UpperBody')}>UpperBody</button>
            <button className="btn-grad" onClick={() => console.log('LowerBody')}>LowerBody</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h2>Select Your Workout Type</h2>
      <div>
        <button className="btn-grad" onClick={() => handleWorkoutTypeSelection('PushPullLegs')}>PushPullLegs (PPL)</button>
        <button className="btn-grad" onClick={() => handleWorkoutTypeSelection('BroSplit')}>BroSplit</button>
        <button className="btn-grad" onClick={() => handleWorkoutTypeSelection('UpperBody-LowerBody')}>UpperBody-LowerBody</button>
      </div>
      {selectedWorkoutType && (
        <div className="popup">
          <h3>{selectedWorkoutType} Options</h3>
          {renderPopupButtons()}
          <button className="btn-grad" onClick={() => setSelectedWorkoutType(null)}>Close</button>
        </div>
      )}
    </>
  );
}

export default App;
