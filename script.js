const container = document.querySelector('.container');
const clearButton = document.getElementById('clear-button');

// Function to create the grid
function createGrid(rows, cols) {
    container.innerHTML = ''; // Clear existing grid

    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = '#000';
        });
        container.appendChild(cell);
    }
}

// Initial 16x16 grid
createGrid(16, 16);

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    let gridSize = prompt('Enter the number of squares (up to 100):');
    gridSize = parseInt(gridSize);

    if (isNaN(gridSize) || gridSize <= 0 || gridSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
    } else {
        createGrid(gridSize, gridSize);
    }
});
