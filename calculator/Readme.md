# Calculator

## Project Overview

The **Calculator** is a fully functional web-based calculator application designed to perform basic arithmetic operations. Built with vanilla HTML, CSS, and JavaScript, this calculator provides a user-friendly interface for performing mathematical calculations with real-time display updates. The calculator supports addition, subtraction, multiplication, division, and decimal operations with a clean, intuitive design.

---

## Features

### 1. **Basic Arithmetic Operations**
- **Addition (+)**: Add two or more numbers
- **Subtraction (-)**: Subtract numbers
- **Multiplication (×)**: Multiply numbers
- **Division (÷)**: Divide numbers
- Supports chained calculations (e.g., 5 + 3 - 2 = 6)

### 2. **Number Input**
- Numeric keypad with digits 0-9
- Easy number input by clicking corresponding buttons
- Support for multi-digit numbers

### 3. **Decimal Point Support**
- Dedicated decimal (.) button for floating-point calculations
- Prevents multiple decimal points in a single number
- Automatically handles decimal number operations

### 4. **Clear Function**
- Clear button (C) to reset all calculations
- Resets the display to "0"
- Clears all stored values and operators
- Ready for new calculations

### 5. **Equals Function**
- Equal sign (=) button to compute the final result
- Displays the result of the calculation
- Allows for immediate continuation with new operations

### 6. **Large Display Screen**
- Large, easy-to-read display at the top
- Shows current input and calculated results
- Black background with white text for high contrast
- Monospace font for professional appearance
- Scrollable display for very long numbers

### 7. **Operator Prevention**
- Prevents multiple consecutive operators
- Automatically replaces the operator if pressed twice
- Ensures valid mathematical expressions

### 8. **Interactive Button Design**
- Hover effect - buttons brighten on mouse over
- Active state - buttons depress when clicked
- Smooth, responsive interactions
- Clear visual feedback for user actions

### 9. **Responsive Grid Layout**
- 4-column button grid layout
- Clean button arrangement
- Optimized spacing between buttons
- Professional appearance

---

## Technologies Used

### Frontend
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, layout, and responsive design
- **JavaScript (Vanilla)**: Core calculator logic and event handling

### Design Elements
- **Google Fonts**: Poppins font for the title
- **Monospace Font**: Lucida Console for the display
- **Background Image**: Custom "Maths.png" image for visual appeal
- **Gradient Overlay**: Linear gradient overlay on background image
- **CSS Grid**: Button layout organization
- **Box Shadow**: Depth and visual hierarchy

---

## File Structure

```
calculator/
├── index.html       # Main HTML structure with calculator buttons
├── script.js        # JavaScript logic for calculator operations
├── styles.css       # CSS styling and layout
└── Readme.md        # Project documentation
```

---

## How to Use

### Getting Started
1. Open the `index.html` file in any modern web browser
2. The calculator display will show "0" initially

### Performing Calculations

#### Basic Operation (Single Calculation)
1. Click a number button (e.g., "5")
2. Click an operator button (e.g., "+")
3. Click another number (e.g., "3")
4. Click "=" to see the result (8)

#### Chained Calculations
1. Enter first number: 10
2. Click operator: +
3. Enter second number: 5
4. Click operator: × (this calculates 10 + 5 = 15)
5. Enter next number: 2
6. Click "=" to get final result (15 × 2 = 30)

#### Using Decimals
1. Enter a number: 3
2. Click the decimal button: .
3. Enter more digits: 5 (display shows "3.5")
4. Proceed with operations as normal

### Clearing the Calculator
- Click the "C" button to reset the calculator
- All values are cleared and display returns to "0"
- Ready to start a new calculation

---

## Technical Details

### JavaScript Functions

#### `sendNumberValue(number)`
- Handles number button clicks
- If awaiting next value after operator, replaces display with new number
- Otherwise, appends the number to the current display
- Prevents replacing "0" with new digits (concatenates instead)

#### `addDecimal()`
- Adds a decimal point to the current display
- Prevents adding decimal if an operator was just pressed
- Prevents multiple decimal points in one number
- Ensures valid decimal number format

#### `useOperator(operator)`
- Handles operator button clicks (+, -, ×, ÷, =)
- Stores the current display value as `firstValue`
- Prevents multiple consecutive operators
- If two operands and an operator exist, performs the calculation
- Sets `awaitingNextValue` flag to prepare for the next number
- Stores the operator for later use

#### `resetAll()`
- Resets all calculator state
- Clears `firstValue`, `operatorValue`, and `awaitingNextValue`
- Sets display back to "0"
- Called when the Clear (C) button is clicked

### JavaScript Variables

#### `calculatorDisplay`
- Reference to the `<h1>` element that shows the calculated values

#### `inputBtns`
- NodeList of all calculator buttons

#### `clearBtn`
- Reference to the clear button

#### `firstValue`
- Stores the first operand in the calculation
- Initially set to 0

#### `operatorValue`
- Stores the current operator (+, -, ×, ÷)
- Empty string when no operator is active

#### `awaitingNextValue`
- Boolean flag indicating whether the calculator is ready for a new number
- Prevents the operator from being ignored

### Calculate Object
```javascript
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
}
```
- Maps operators to their corresponding mathematical functions
- Used to perform calculations based on the operator selected

### Event Listeners

1. **Number Buttons**: Click triggers `sendNumberValue()`
2. **Operator Buttons**: Click triggers `useOperator()`
3. **Decimal Button**: Click triggers `addDecimal()`
4. **Clear Button**: Click triggers `resetAll()`

---

## Design Features

### Display
- **Size**: 400px width, responsive height
- **Border Radius**: 12px for smooth corners
- **Display Text**: 45px font size, right-aligned
- **Scrollable**: Long numbers can be scrolled horizontally

### Buttons
- **Grid Layout**: 4 columns with 10px gap
- **Minimum Height**: 50px for easy clicking
- **Font**: Monospace, 20px size
- **Hover Effect**: 10% brightness increase on hover
- **Active Effect**: 1px downward translation on click
- **Border Radius**: 5px for rounded corners

### Background & Colors
- **Body Background Image**: Custom "Maths.png" image for mathematical theme
- **Background Size**: Cover (full viewport)
- **Background Position**: Center
- **Background Repeat**: No repeat
- **Fallback Color**: `#cad8fe` (light blue)
- **Overlay Gradient**: Linear gradient from `#d7dde8` to `#757f9a` with 95% opacity for text visibility

### Responsive Design
- Optimized for desktop viewing
- Fixed calculator width of 400px for consistency
- Flexbox layout ensures centered display
- Scalable text and buttons
- Background image covers full viewport with centered positioning
- Gradient overlay enhances visibility of content over background

---

## Browser Compatibility

- **Chrome**: Fully supported
- **Firefox**: Fully supported
- **Safari**: Fully supported
- **Edge**: Fully supported
- **Mobile Browsers**: Fully supported

*Requires browser support for ES6 JavaScript, CSS Grid, and CSS Flexbox*

---

## Calculation Examples

### Example 1: Simple Addition
```
Input: 7 + 5 =
Display: 12
```

### Example 2: Decimal Calculation
```
Input: 3.5 × 2 =
Display: 7
```

### Example 3: Chained Calculation
```
Input: 10 + 5 - 3 =
Display: 12
(First calculates 10 + 5 = 15, then 15 - 3 = 12)
```

### Example 4: Division
```
Input: 20 ÷ 4 =
Display: 5
```

---

