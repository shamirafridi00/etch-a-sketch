const container = document.querySelector('.container');
const clearButton = document.getElementById('clear-button');
const colorPickerCell = document.getElementById('colorPickerCell');
const colorPickerBg = document.getElementById('colorPickerBg');
const rangeInput = document.getElementById('myRange');
const rangeValue = document.getElementById('rangeValue');
let selectedValue = 16;
let isMouseDown = false;  // to check whether the mouse is down/clicked
let eraserEnabled = false;
const eraserButton = document.getElementById('eraser');



// Function to create the grid
function createGrid(rows, cols) {
    // Limit the grid size to a maximum of 64x64
    rows = Math.min(rows, 100);
    cols = Math.min(cols, 100);

    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    container.innerHTML = ''; // Clear existing grid

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mousedown', () => {
            isMouseDown = true;
            if (eraserEnabled) {
              cell.style.backgroundColor = ''; // Reset to default color (e.g., white) when eraser is enabled
            } else {
              cell.style.backgroundColor = `${colorPickerCell.value}`; // Change color on mousedown
            }
          });
        
        cell.addEventListener('mouseover', () => {
            if (isMouseDown) {
                if (eraserEnabled) {
                  cell.style.backgroundColor = ''; // Reset to default color (e.g., white) when eraser is enabled
                } else {
                  cell.style.backgroundColor = `${colorPickerCell.value}`; // Change color on mouseover while mousedown
                }
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


// Event listener for the slider

rangeInput.addEventListener('input', () => {
    const value = rangeInput.value;
    rangeValue.textContent = `${value}x${value}`;
    selectedValue = rangeInput.value;
    createGrid(selectedValue, selectedValue);
});



// Eraser Button functionality
eraserButton.addEventListener('click', () => {
    
    console.log('Eraser button clicked');
    eraserEnabled = !eraserEnabled;
    eraserButton.classList.toggle('active');
  });



// Initial grid creation
const initialValue = rangeInput.value;
rangeValue.textContent = `${initialValue}x${initialValue}`;
createGrid(initialValue, initialValue);