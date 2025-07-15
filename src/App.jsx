function App() {
  const [speeds, setSpeeds] = useState({
    mercury: 1,
    venus: 0.8,
    earth: 0.6,
    mars: 0.5,
    jupiter: 0.3,
    saturn: 0.2,
    uranus: 0.1,
    neptune: 0.05,
  });

  return (
    <div className="app">
      <ControlPanel speeds={speeds} setSpeeds={setSpeeds} />
      <SolarSystem speeds={speeds} />
    </div>
  )
}

export default App
