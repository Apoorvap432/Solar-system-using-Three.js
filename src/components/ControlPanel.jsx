import React from 'react'

const ControlPanel = ({ speeds, setSpeeds }) => {
    const handleChange = (planet, value) => {
    setSpeeds((prev) => ({ ...prev, [planet]: parseFloat(value) }));
  };

  return (
    <div className="control-panel">
      <h2>Speed Control</h2>
      {Object.keys(speeds).map((planet) => (
        <div key={planet}>
          <label>{planet.charAt(0).toUpperCase() + planet.slice(1)} Speed:</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={speeds[planet]}
            onChange={(e) => handleChange(planet, e.target.value)}
          />
          <span>{speeds[planet]}</span>
        </div>
      ))}
    </div>
  )
}

export default ControlPanel
