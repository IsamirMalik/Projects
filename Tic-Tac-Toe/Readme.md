# Tic-Tac-Toe

## Project Overview

The **Tic-Tac-Toe** is a modern, interactive web-based implementation of the classic Tic-Tac-Toe game built with React. This project showcases advanced React concepts including component composition, state management with hooks, and event handling. Two players can compete against each other in a 3×3 grid, with full player name customization, move history tracking, win detection, and draw identification.

---

## Features

### 1. **Two-Player Gameplay**
- Play as Player X and Player O
- Alternating turns between players
- Clear indication of whose turn it is (highlighted player)
- Automatic turn management

### 2. **Customizable Player Names**
- Edit player names before or during the game
- Click "Edit" button next to player name to customize
- Save button to confirm name changes
- Default names: "Player 1" (X) and "Player 2" (O)

### 3. **Interactive Game Board**
- 3×3 grid game board
- Click cells to place your symbol (X or O)
- Cells are disabled once filled to prevent overwriting
- Clear visual feedback for available and filled cells

### 4. **Win Detection**
- Automatic detection of winning combinations
- Checks 8 possible winning combinations:
  - 3 horizontal lines (rows)
  - 3 vertical lines (columns)
  - 2 diagonal lines
- Displays winner name when victory is achieved

### 5. **Draw Detection**
- Automatically detects when the board is full without a winner
- Displays draw message
- Prevents further moves after a draw

### 6. **Move History/Log**
- Displays complete history of all moves made
- Shows move sequence with player symbols
- Useful for reviewing game progression

### 7. **Game Over Screen**
- Professional game-over modal when game ends
- Displays winner or draw result
- Restart button to begin a new game
- Maintains player names between games

### 8. **Game Reset/Restart**
- Restart button to clear the board and start fresh
- Resets all game state while keeping player names
- Quick access to play again

### 9. **Beautiful UI Design**
- Professional gradient background (gold to orange)
- Dark pattern overlay for texture
- Game logo display at the top
- Responsive layout
- Elegant typography with custom fonts
- Smooth transitions and visual effects

### 10. **Component-Based Architecture**
- Modular React components for better code organization
- Reusable and maintainable component structure
- Proper separation of concerns

---

## Technologies Used

### Frontend Framework
- **React 19**: Modern JavaScript library for building user interfaces
- **React Hooks**: useState for state management
- **JSX**: HTML-like syntax for React components

### Styling
- **CSS3**: Modern styling with gradients, animations, and effects
- **Google Fonts**: Caprasimo (title) and Roboto Slab (body) fonts
- **Background Images**: Custom pattern images for visual appeal

### Build Tools
- **React Scripts**: Create React App build tooling
- **TypeScript Support**: Type safety for development

### Development
- **npm**: Package management
- **Node.js**: JavaScript runtime

---

## File Structure

```
Tic-Tac-Toe/
├── public/
│   ├── index.html              # Main HTML entry point
│   ├── game-logo.png           # Game logo image
│   ├── bg-pattern.png          # Light background pattern
│   └── bg-pattern-dark.png     # Dark background pattern
├── src/
│   ├── App.jsx                 # Main application component with game logic
│   ├── index.jsx               # React entry point
│   ├── index.css               # Global styling
│   ├── winning-combinations.js # Array of winning combinations
│   └── Components/
│       ├── Player.jsx          # Player name and display component
│       ├── GameBoard.jsx       # Game board grid component
│       ├── GameOver.jsx        # Game over modal component
│       └── Log.jsx             # Move history log component
├── package.json                # Project dependencies and scripts
└── Readme.md                   # Project documentation
```

---

## How to Use

### Installation & Setup

1. **Navigate to project directory**:
   ```bash
   cd Tic-Tac-Toe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   - Application opens automatically at `http://localhost:3000`
   - If not, manually navigate to that URL

### Playing the Game

#### Before the Game Starts
1. Click "Edit" next to Player 1 or Player 2 to customize player names
2. Enter your preferred player name in the text field
3. Click "Save" to confirm the name change

#### During the Game
1. **Making Moves**:
   - The player with the highlight is the current player
   - Click any empty cell to place your symbol (X or O)
   - Your symbol appears in the clicked cell
   - Turn automatically passes to the other player

2. **Monitoring the Game**:
   - Active player is highlighted in the players section
   - Move history appears on the right side (if available)
   - Board updates in real-time with each move

3. **Winning the Game**:
   - Match three of your symbols horizontally, vertically, or diagonally
   - Game automatically detects your win
   - Game Over modal displays the winner
   - Further moves are blocked

4. **Draw Condition**:
   - If all 9 cells are filled with no winner, it's a draw
   - Game Over modal displays "It's a draw!"
   - Further moves are blocked

#### After the Game Ends
- View the Game Over screen showing the result
- Click "Restart Game" button to play again
- Player names are preserved for the next game
- Board is cleared and ready for new moves

---

## Technical Details

### Component Structure

#### **App.jsx** (Main Component)
- Manages overall game state with `gameTurns` and `playerNames`
- Handles cell selection and move registration
- Detects winning combinations and draws
- Reconstructs game board from move history
- Manages game restart functionality

**Key Functions**:
- `getActivePlayer()`: Determines whose turn it is
- `cellSelectionHandler()`: Processes cell clicks
- `restartHandler()`: Resets the game
- `playerNameChangeHandler()`: Updates player names

**State Variables**:
- `gameTurns`: Array of all moves made in order
- `playerNames`: Object storing names for X and O players

#### **Player.jsx** (Player Display & Editing)
- Displays player name and symbol
- Shows which player is active (highlighted)
- Allows inline name editing
- Emits name changes to parent component

**Props**:
- `initialName`: Starting player name
- `symbol`: Player symbol (X or O)
- `isActive`: Boolean indicating if this player's turn
- `onNameChange`: Callback function for name updates

#### **GameBoard.jsx** (Game Board Grid)
- Renders the 3×3 game board
- Maps board state to clickable buttons
- Disables cells that are already filled
- Displays player symbols in each cell
- Handles cell click events

**Props**:
- `board`: 3×3 array representing board state
- `onCellSelection`: Callback for cell clicks with (rowIndex, colIndex)

#### **GameOver.jsx** (Game End Modal)
- Displays when game ends (win or draw)
- Shows winner name or draw message
- Provides restart button
- Modal overlay for focus

**Props**:
- `winner`: Name of winning player or null
- `onRestart`: Callback function to restart game

#### **Log.jsx** (Move History)
- Displays all moves in chronological order
- Shows player symbol for each move
- Shows cell position for each move
- Helps track game progression

**Props**:
- `turns`: Array of all moves made
- `playerNames`: Object with player names for display

### Winning Combinations Logic

The `winning-combinations.js` file defines all 8 possible winning patterns:

```javascript
// 3 Horizontal rows
[{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}],
[{row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2}],
[{row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2}],

// 3 Vertical columns
[{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}],
[{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}],
[{row: 0, col: 2}, {row: 1, col: 2}, {row: 2, col: 2}],

// 2 Diagonals
[{row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2}],
[{row: 0, col: 2}, {row: 1, col: 1}, {row: 2, col: 0}]
```

The app checks each combination after every move to determine if there's a winner.

### State Management Flow

1. **Initial State**: Empty board, default player names
2. **User Clicks Cell**: `cellSelectionHandler` is triggered
3. **Move is Recorded**: New move is added to `gameTurns` array
4. **Board Reconstructs**: Board state is rebuilt from `gameTurns`
5. **Winner Check**: Each winning combination is evaluated
6. **Draw Check**: If no winner and 9 turns, it's a draw
7. **Player Switch**: Active player indicator updates automatically

### React Hooks Used

#### `useState`
- `gameTurns`: Tracks all moves made in the game
- `playerNames`: Stores names for both players
- In Player component: `name`, `isEditing` for inline editing

---

## Color Scheme

- **Primary Background**: Radial gradient from `rgba(241, 210, 70, 0.98)` (gold) to `rgba(250, 176, 103, 0.87)` (orange)
- **Background Pattern**: Dark pattern image overlay
- **Title Color**: `#3f3b00` (Dark brown/gold)
- **Text Color**: `#ebe7ef` (Light cream)
- **Active Highlight**: Visual highlight for active player
- **Button Hover**: Brightness and shadow effects

---

## Styling Details

### Typography
- **Title Font**: Caprasimo (cursive, 72px)
- **Body Font**: Roboto Slab (serif, regular weight)
- **Logo Width**: 8rem with drop shadow effect

### Board Layout
- **Grid**: 3×3 clickable cells
- **Cell Styling**: Clear borders and visual feedback
- **Responsive**: Adapts to different screen sizes

### Interactive Elements
- **Button Effects**: Hover, active, and disabled states
- **Player Highlight**: Active player gets visual emphasis
- **Modal Overlay**: Semi-transparent background behind game-over modal

---

## Available Scripts

### `npm start`
- Runs the app in development mode
- Opens browser to `http://localhost:3000`
- Page reloads when changes are made
- Shows build errors and warnings

### `npm build`
- Builds the app for production
- Optimizes and minifies code
- Output in `build` folder

### `npm test`
- Launches test runner in interactive watch mode

### `npm eject`
- **Warning**: This is a one-way operation
- Exposes all configuration files and dependencies

---

## Browser Compatibility

- **Chrome**: Fully supported
- **Firefox**: Fully supported
- **Safari**: Fully supported
- **Edge**: Fully supported
- **Mobile Browsers**: Fully supported

*Requires modern browser with ES6+ JavaScript and CSS Grid support*

---

## Gameplay Examples

### Example 1: Player X Wins Horizontally
```
Turn 1: X plays (0,0)
Turn 2: O plays (1,0)
Turn 3: X plays (0,1)
Turn 4: O plays (1,1)
Turn 5: X plays (0,2) - X WINS (top row)
```

### Example 2: Player O Wins Diagonally
```
Turn 1: X plays (0,0)
Turn 2: O plays (0,2)
Turn 3: X plays (0,1)
Turn 4: O plays (1,1)
Turn 5: X plays (2,0)
Turn 6: O plays (2,2) - O WINS (diagonal)
```

### Example 3: Draw Game
```
All 9 cells filled with no three-in-a-row - Game is a DRAW
```

---

## Author

Created as a React learning project to demonstrate:
- Component composition and reusability
- React hooks (useState) for state management
- Event handling in React
- Conditional rendering
- Array and object manipulation
- Game logic implementation
- Modern CSS styling

---

Enjoy playing Tic-Tac-Toe!
