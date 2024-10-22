const prefixList = document.getElementById('prefixList');
const rootWordList = document.getElementById('rootWordList');
const endMessage = document.getElementById('endMessage');
const resultTable = document.getElementById('resultTable');

// Store the sets of questions (Latihan) and their corresponding correct matches
const latihanSets = {
    latihan1: [
        { prefix: 'peng', root: 'guna', idPrefix: 'i1', idRoot: 'd1' },
        { prefix: 'pem', root: 'padam', idPrefix: 'i2', idRoot: 'd2' },
        { prefix: 'pe', root: 'niaga', idPrefix: 'i3', idRoot: 'd3' },
        { prefix: 'pen', root: 'terbit', idPrefix: 'i4', idRoot: 'd4' },
        { prefix: 'penge', root: 'lap', idPrefix: 'i5', idRoot: 'd5' },
        { prefix: 'peny', root: 'sakit', idPrefix: 'i6', idRoot: 'd6' },
    ],
    latihan2: [
        { prefix: 'me', root: 'makan', idPrefix: 'i7', idRoot: 'd7' },
        { prefix: 'mem', root: 'baca', idPrefix: 'i8', idRoot: 'd8' },
        { prefix: 'men', root: 'tulis', idPrefix: 'i9', idRoot: 'd9' },
        { prefix: 'meng', root: 'ajar', idPrefix: 'i10', idRoot: 'd10' },
        { prefix: 'meny', root: 'sapu', idPrefix: 'i11', idRoot: 'd11' },
        { prefix: 'menge', root: 'cat', idPrefix: 'i12', idRoot: 'd12' },
    ]
};

// Select which Latihan set to use
let currentLatihan = [];

// Current prefix being dragged
let selectedId;

// Counter for current matches
let matchingCounter = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateExercise() {
    // Clear existing lists and counters
    prefixList.innerHTML = '';
    rootWordList.innerHTML = '';
    matchingCounter = 0;

    // Shuffle prefixes and root words separately
    const shuffledPrefixes = shuffleArray([...currentLatihan]); // Shuffle prefixes
    const shuffledRoots = shuffleArray([...currentLatihan]); // Shuffle roots

    // Populate prefix list
    shuffledPrefixes.forEach((pair) => {
        const prefixItem = document.createElement('li');
        prefixItem.textContent = pair.prefix;
        prefixItem.id = pair.idPrefix;
        prefixItem.draggable = true;
        prefixList.appendChild(prefixItem);
    });

    // Populate root word list
    shuffledRoots.forEach((pair) => {
        const rootItem = document.createElement('li');
        rootItem.textContent = pair.root;
        rootItem.id = pair.idRoot;
        rootItem.draggable = true;
        rootWordList.appendChild(rootItem);
    });

    addDragAndDropListeners();
}

function dragStart() {
    selectedId = this.id;
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(event) {
    event.preventDefault(); // Allow dropping
}

function dragDrop(event) {
    event.preventDefault();
    const dropTargetId = this.id;

    if (checkForMatch(selectedId, dropTargetId)) {
        document.getElementById(selectedId).style.display = 'none';
        document.getElementById(dropTargetId).style.display = 'none';
        matchingCounter++;

        // Display correct pairs in the result table
        const matchedPair = currentLatihan.find(
            pair => pair.idPrefix === selectedId && pair.idRoot === dropTargetId
        );

        if (matchedPair) {
            const row = resultTable.insertRow();
            row.insertCell(0).textContent = matchedPair.prefix;
            row.insertCell(1).textContent = `${matchedPair.root} → ${matchedPair.prefix}${matchedPair.root}`;
        }
    }

    // Check if all matches for the current Latihan are found
    if (matchingCounter === currentLatihan.length) {
        // Sorting logic to order the rows according to the desired prefix order
        const rows = Array.from(resultTable.rows).slice(1); // Skip the header row
        rows.sort((a, b) => {
            const prefixA = a.cells[0].textContent;
            const prefixB = b.cells[0].textContent;
            return prefixOrder.indexOf(prefixA) - prefixOrder.indexOf(prefixB);
        });

        // Clear the table and add sorted rows
        resultTable.innerHTML = `<tr><th>Imbuhan Awalan</th><th>Kata Dasar</th></tr>`;
        rows.forEach(row => resultTable.appendChild(row));

        endMessage.style.display = 'block';
    }

    this.classList.remove('over');
}

function checkForMatch(selected, dropTarget) {
    // Check if the selected and drop target match any pair in the current Latihan set
    return currentLatihan.some(pair => pair.idPrefix === selected && pair.idRoot === dropTarget);
}

function addDragAndDropListeners() {
    const draggablePrefixes = document.querySelectorAll('#prefixList li');
    const dropTargets = document.querySelectorAll('#rootWordList li');

    draggablePrefixes.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragenter', dragEnter);
        target.addEventListener('dragover', dragOver);
        target.addEventListener('drop', dragDrop);
        target.addEventListener('dragleave', dragLeave);
    });
}

// Function to switch between latihan sets
function switchLatihan(latihanName) {
    if (latihanSets[latihanName]) {
        currentLatihan = latihanSets[latihanName];
        endMessage.style.display = 'none';
        resultTable.innerHTML = `<tr><th>Imbuhan Awalan</th><th>Kata Dasar</th></tr>`; // Reset result table
        populateExercise(); // Populate the exercise with the selected Latihan set
    } else {
        console.error('Latihan not found:', latihanName);
    }
}

// Initialize the first exercise set as default
switchLatihan('latihan1');