import React, { useState, useEffect } from 'react';

function App() {
  const [enemies, setEnemies] = useState([]);
  const [towers, setTowers] = useState([]);

  const addTower = (position) => {
    const newTower = { id: towers.length + 1, position };
    setTowers([...towers, newTower]);
  };

  const addEnemy = () => {
    const newEnemy = { id: enemies.length + 1, health: 100, position: 0 };
    setEnemies([...enemies, newEnemy]);
  };

  useEffect(() => {
    const moveEnemies = () => {
      setEnemies(prevEnemies =>
        prevEnemies.map(enemy => ({
          ...enemy,
          position: enemy.position + 1,
        }))
      );
    };

    const gameLoop = setInterval(() => {
      moveEnemies();
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [enemies]);

  return (
    <div>
      <div className="game-container">
        {towers.map(tower => (
          <div key={tower.id} className="tower" style={{ left: `${tower.position}px` }}>
            Tower
          </div>
        ))}
        {enemies.map(enemy => (
          <div key={enemy.id} className="enemy" style={{ left: `${enemy.position * 20}px` }}>
            Enemy - Health: {enemy.health}
          </div>
        ))}
      </div>

      <button onClick={() => addTower(50)}>Add Tower</button>
      <button onClick={addEnemy}>Add Enemy</button>
    </div>
  );
}

export default App;
