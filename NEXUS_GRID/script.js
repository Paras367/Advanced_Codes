const API_URL = 'https://nexus-grid-api.dhimanparas605.workers.dev';
let authToken = localStorage.getItem('nexus_token');


async function login(username) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });
  const data = await res.json();
  if (data.token) {
    authToken = data.token;
    localStorage.setItem('nexus_token', authToken);
    return data.profile;
  }
  throw new Error(data.error || 'Login failed');
}

async function saveProfile(updates) {
  if (!authToken) return;
  await fetch(`${API_URL}/api/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Nexus-Token': authToken
    },
    body: JSON.stringify(updates)
  });
}
function generateMazeGrid() {
  const grid = Array(4).fill().map(() => Array(4).fill(null));
  addRandomTile(grid);
  addRandomTile(grid);
  for (let i = 0; i < 2; i++) {
    let r, c;
    do { r = Math.floor(Math.random()*4); c = Math.floor(Math.random()*4); }
    while (grid[r][c] !== null);
    grid[r][c] = 'OBSTACLE';
  }
  let pr, pc;
  do { pr = Math.floor(Math.random()*4); pc = Math.floor(Math.random()*4); }
  while (grid[pr][pc] !== null);
  grid[pr][pc] = 'POWER';
  return grid;
}

function addRandomTile(grid) {
  const empty = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === null) empty.push([r, c]);
    }
  }
  if (empty.length > 0) {
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
}

function moveLeft(grid) {
  let moved = false;
  for (let r = 0; r < 4; r++) {
    const row = grid[r].filter(cell => typeof cell === 'number');
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i+1]) {
        row[i] *= 2;
        row[i+1] = null;
        i++; // skip next
      }
    }
    const newRow = row.filter(x => x !== null);
    while (newRow.length < 4) newRow.push(null);
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] !== newRow[c]) moved = true;
      grid[r][c] = newRow[c];
    }
  }
  return moved;
}

function rotateGrid(grid) {
  return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim().length < 3) return;
    setLoading(true);
    try {
      const profile = await login(username.trim());
      onLogin(profile);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="text-center p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold neon-text mb-6">NEXUS GRID</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username (min 3 chars)"
          className="w-full p-3 rounded bg-gray-800 border border-cyan-500 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || username.length < 3}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded font-bold transition"
        >
          {loading ? 'Connecting...' : 'Enter Grid'}
        </button>
      </form>
    </div>
  );
}

function GameBoard({ profile, onGameOver }) {
  const [grid, setGrid] = React.useState(generateMazeGrid());
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const handleMove = (direction) => {
    if (gameOver) return;
    let newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;
    let rotations = 0;
    switch(direction) {
      case 'ArrowUp': rotations = 1; break;
      case 'ArrowRight': rotations = 2; break;
      case 'ArrowDown': rotations = 3; break;
      default: rotations = 0; // left
    }

    for (let i = 0; i < rotations; i++) {
      newGrid = rotateGrid(newGrid);
    }

    moved = moveLeft(newGrid);

    for (let i = 0; i < (4 - rotations) % 4; i++) {
      newGrid = rotateGrid(newGrid);
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);

      let hasMoves = false;
      for (let dir of ['ArrowLeft','ArrowUp','ArrowRight','ArrowDown']) {
        let testGrid = JSON.parse(JSON.stringify(newGrid));
        let r = dir === 'ArrowUp' ? 1 : dir === 'ArrowRight' ? 2 : dir === 'ArrowDown' ? 3 : 0;
        for (let i = 0; i < r; i++) testGrid = rotateGrid(testGrid);
        if (moveLeft(testGrid)) { hasMoves = true; break; }
      }
      if (!hasMoves) {
        setGameOver(true);
        onGameOver({ score, highestTile: Math.max(...newGrid.flat().filter(x => typeof x === 'number')) });
      }
    }
  };

  React.useEffect(() => {
    const keyHandler = (e) => {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
        e.preventDefault();
        handleMove(e.key);
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [grid, gameOver]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-md mb-4">
        <div className="text-cyan-400 font-mono">
          <i className="fas fa-user me-2"></i> {profile.username}
        </div>
        <div className="text-yellow-400 font-bold">
          <i className="fas fa-crown me-1"></i> {score}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 bg-gray-800 rounded-xl border border-cyan-900/50">
        {grid.flat().map((cell, idx) => {
          const r = Math.floor(idx / 4), c = idx % 4;
          let content = '';
          let className = 'grid-cell ';

          if (cell === 'OBSTACLE') {
            content = <i className="fas fa-ban text-gray-600"></i>;
            className += 'obstacle';
          } else if (cell === 'POWER') {
            content = <i className="fas fa-bolt text-yellow-300"></i>;
            className += 'power-tile bg-gray-900';
          } else if (typeof cell === 'number') {
            content = cell;
            className += `tile-${cell}`;
          } else {
            className += 'bg-gray-900';
          }

          return (
            <div key={`${r}-${c}`} className={className}>
              {content}
            </div>
          );
        })}
      </div>

      {gameOver && (
        <div className="mt-6 p-4 bg-red-900/30 border border-red-500 rounded text-center">
          <i className="fas fa-skull text-red-400 me-2"></i>
          GAME OVER
        </div>
      )}
    </div>
  );
}

function App() {
  const [profile, setProfile] = React.useState(null);
  const [gameState, setGameState] = React.useState('login'); 

  const handleLogin = (prof) => {
    setProfile(prof);
    setGameState('playing');
  };

  const handleGameOver = async (stats) => {
    const updates = {
      totalGames: 1,
      highestTile: stats.highestTile,
      ...(stats.fastestTime && { fastestTime: stats.fastestTime })
    };
    await saveProfile(updates);
    setGameState('gameover');
  };

  if (gameState === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="p-4 w-full max-w-md">
      <GameBoard profile={profile} onGameOver={handleGameOver} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// --- By - Pars Dhiman ---
// --- SoftwareLabs ---
