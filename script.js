/*
I am sorry for the load of commments in this file. I have added these comments to make the code understandable for
my future self. Initial grid creation happens on the last line of the file. 
*/




const container = document.getElementById('container');   
const clearButton = document.getElementById('clear-button');
const colorPickerCell = document.getElementById('colorPickerCell');
const rangeInput = document.getElementById('myRange');
const rangeValue = document.getElementById('rangeValue');
const eraserButton = document.getElementById('eraser');
let selectedValue = 16;  // initial grid size
let isMouseDown = false;  // to check whether the mouse is down/clicked
let eraserEnabled = false;



/* createGrid function in JavaScript. The function takes two parameters: rows and cols, which represent the number of rows and columns for the grid, respectively.

The function first limits the grid size to a maximum of 64x64 by using the Math.min function. This ensures that the grid will not exceed the specified maximum size.

Next, the function sets the CSS gridTemplateColumns and gridTemplateRows properties of the container element to create a grid layout with the specified number of rows and columns.

The existing grid inside the container element is cleared by setting its innerHTML property to an empty string.

Then, a loop is executed to create rows * cols number of cells for the grid. Each cell is created as a <div> element and appended to the container.

Event listeners are added to each cell to handle mouse events. When the mouse is pressed down on a cell, the isMouseDown flag is set to true and the cell's background color is 

changed based on the current color selected in the colorPickerCell element. If the eraser is enabled, the cell's background color is reset to the default color (e.g., white).

When the mouse is moved over a cell, if the isMouseDown flag is true, the cell's background color is updated similarly to when the mouse is pressed down.

When the mouse is released (mouseup event), the isMouseDown flag is set to false.

Finally, the height of the container element is dynamically adjusted based on the size of the grid to ensure that all cells are visible.
 */

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


// Eraser Button functionality and rest of the eraser functionality is added in createGrid function with the help of event listeners
eraserButton.addEventListener('click', () => {
  eraserEnabled = !eraserEnabled;
  eraserButton.classList.toggle('active');
});





// Event listener for the slider
rangeInput.addEventListener('input', () => {
    const value = rangeInput.value;
    rangeValue.textContent = `${value}x${value}`;
    selectedValue = rangeInput.value;
    createGrid(selectedValue, selectedValue);
});




// clear button functionality

clearButton.addEventListener('click', () => {
    container.innerHTML = '';
    createGrid(selectedValue, selectedValue);

})


// Initial grid creation
const initialValue = rangeInput.value;
rangeValue.textContent = `${initialValue}x${initialValue}`;
createGrid(initialValue, initialValue);

