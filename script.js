const gridContainer = document.getElementById('grid-container');
const gridSize = 16;

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

createGrid();

gridContainer.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('grid-cell')) {
        e.target.style.backgroundColor = 'black'; // Change the color as per your preference
    }
});


const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
    const newSize = prompt('Enter a new grid size (up to 100):');
    if (newSize) {
        const newSizeInt = parseInt(newSize);
        if (!isNaN(newSizeInt) && newSizeInt <= 100) {
            clearGrid();
            createGrid(newSizeInt);
        } else {
            alert('Please enter a valid number up to 100.');
        }
    }
});

function clearGrid() {
    while (gridContainer.firstChild) {
        gridContainer.firstChild.remove();
    }
}

