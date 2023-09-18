const container = document.querySelector('.container');
const clearButton = document.getElementById('clear-button');
const colorPickerCell = document.getElementById('colorPickerCell');
const colorPickerBg = document.getElementById('colorPickerBg');
const rangeInput = document.getElementById('myRange');
const rangeValue = document.getElementById('rangeValue');
let isMouseDown = false;  // to check whether the mouse is down/clicked
let selectedValue = 16;


// Function to create the grid
function createGrid(rows, cols) {
    // Limit the grid size to a maximum of 64x64
    rows = Math.min(rows, 64);
    cols = Math.min(cols, 64);

    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    container.innerHTML = ''; // Clear existing grid

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mousedown', () => {
            isMouseDown = true;
            cell.style.backgroundColor = `${colorPickerCell.value}`; // Change color on mousedown
        });
        cell.addEventListener('mouseover', () => {
            if (isMouseDown) {
                cell.style.backgroundColor = `${colorPickerCell.value}`; // Change color on mouseover while mousedown
            }
        });
        cell.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        container.appendChild(cell);
    }

    // Dynamically adjust the container height based on the grid size
    container.style.height = `${container.scrollHeight}px`;


    
}


// Initial 16x16 grid
// createGrid(16, 16);

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    let gridSize = prompt('Enter the number of squares (up to 64):');
    gridSize = parseInt(gridSize);

    if (isNaN(gridSize) || gridSize <= 0 || gridSize > 64) {
        alert('Please enter a valid number between 1 and 64.');
    } else {
        createGrid(gridSize, gridSize);
    }
});


// Event listener for the slider

rangeInput.addEventListener('input', () => {
const value = rangeInput.value;
rangeValue.textContent = `${value}x${value}`;
selectedValue = rangeInput.value;
createGrid(selectedValue, selectedValue);
});