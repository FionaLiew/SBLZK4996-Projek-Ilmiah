/*
Created By Catherine Rodriquez
*/

"use strict";

function WordSearchAILogic(updateGameState, listId, wordFound, wordLoc) {

    //keeps count of how many words the AI found
    let AIcount = 0;

    //object to hold oft-used class/id/attribute names
    var names = {
        cell: "cell",
        pivot: "pivot",
        selectable: "selectable",
        selected: "selected",
        path: "path"
    };

    //object to hold oft-used class/id selectors
    var select = {
        cells: "." + names.cell,
        pivot: "#" + names.pivot,
        selectable: "." + names.selectable,
        selected: "." + names.selected
    };

    this.logic = function() {
        console.log('Words found so far:' + wordFound);
        // initiate random word selection
        getRandomWord();
    };

    // Preprocess the list to remove spaces from all words
    function preprocessList(listId) {
        // Flatten the nested listId array
        const flattenedList = listId.flat();

        // Remove spaces from all words in the list
        const processedList = flattenedList.map(word => word.replace(/\s+/g, ""));

        return processedList;
    }

    // Selects a random word from the available words to be found
    function getRandomWord() {
        // Preprocess the listId to remove spaces from all words
        let processedList = preprocessList(listId);

        // Filter out words that are already found
        let availableWords = processedList.filter(word => !wordFound.includes(word));

        if (availableWords.length === 0) {
            console.log('No more words available.');
            return;
        }

        // Get a random index from the available words
        let randomWordIndex = Math.floor(Math.random() * availableWords.length);
        let randomWord = availableWords[randomWordIndex];
        console.log('Selected Word:', randomWord);

        // Set the word inside the list div as found (changes color, strikethroughs text)
        $(".listWord[text = " + randomWord + "]").addClass("crossAI");

        // Add the selected word to wordFound
        wordFound.push(randomWord);
        AIcount++;

        checkPuzzleSolved(availableWords, processedList, AIcount);
        gridSolve(randomWord, wordLoc);

        // Return the selected word
        return randomWord;
    }

    // Checks if all the words in the puzzle have been found, who won, and updates the h2 instructions heading accordingly
    function checkPuzzleSolved(availableWords, processedList, AIcount) {
        // Filter out words that are already found
        availableWords = processedList.filter(word => !wordFound.includes(word));

        // If all the words in the list to find have been found (no. of words to find == no. of found words)
        if (availableWords.length === 0) {
            // If the AI won
            if (AIcount > 10) {
                document.getElementById('gameInfo').textContent = 'Oh no! Time called the shots and the AI left you in the dust!';
            }
            // If it is a draw
            else if (AIcount == 10) {
                document.getElementById('gameInfo').textContent = 'DRAW! You and the AI shook hands and called it even!';
            }
            // If the user won
            else if (AIcount < 10) {
                document.getElementById('gameInfo').textContent = 'VICTORY! You beat the AI! The AI did not stand a chance!';
            }

            updateGameState(false);

            return true;
        }

        return false;
    }

    // Highlights the word on the grid that the AI found
    function gridSolve(word, wordLoc) {
        // Check if the word exists in the wordLoc object
        if (!wordLoc[word]) {
            console.log('Word not found in the puzzle.');
            return;
        }

        // Get the path, startX, and startY for the word
        var p = wordLoc[word].p;
        var startX = wordLoc[word].x;
        var startY = wordLoc[word].y;

        // Loop through each character in the word, and highlight the corresponding cell in the grid
        for (var k = 0, x = startX, y = startY; k < word.length; k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {
            // Find the cell with the respective x and y values and add a class to it
            $(select.cells + "[row = " + x + "][column = " + y + "]").addClass("AI");
        }
    }
}
