'use strict'

const GHOST = '👻'
var gGhosts = []
var gRemovedGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}


function removeGhost(ghostLoc) {
    const currGhostIdx = getGhostIdxByLoc(ghostLoc)
    var deletedGhost = gGhosts.splice(currGhostIdx,1)[0]
    console.log(deletedGhost,'test');
    if(deletedGhost.currCellContent === FOOD){
        updateScore(1) 
        gFoodOnTheBoard--
        deletedGhost.currCellContent = EMPTY
    }
    gRemovedGhosts.push(deletedGhost)
    
}

function getGhostIdxByLoc(location){
    for(var i = 0; i < gGhosts.length; i++){
        const currGhost = gGhosts[i]
        if(location.i === currGhost.location.i &&
            location.j === currGhost.location.j){
               return i
            }
    }
    return -1
}

function resetGhosts() {
    gGhosts.push(...gRemovedGhosts)
    gRemovedGhosts = []
}


// function removeGhost(location) {
//     var ghostIdx = -1
//     for(var i = 0; i < gGhosts.length; i++){
//         const currGhost = gGhosts[i]
//         if(location.i === currGhost.location.i &&
//             location.j === currGhost.location.j){
//                 ghostIdx = i
//                 break
//             }
//     }
//     if(ghostIdx === -1) return 
//     var removedGhosts = gGhosts.splice(ghostIdx,1)[0]
//     gRemovedGhosts.push(removedGhosts)
//     if(removedGhosts[0].currCellContent === FOOD){
//         updateScore(1) 
//         // if (!gFoodCount--) {
//         //     // gameOver()
//         // }
//     } 
// }

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6 ,
        },
        currCellContent: FOOD,
        color: generateRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(gPacman.isSuper)return
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const ghostColor = gPacman.isSuper ? 'blue' : ghost.color 
   
    return `<span style="background-color: ${ghostColor};">${GHOST}</span>`
}


function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.floor(Math.random() * maxVal);
    let randColor = randomNumber.toString(16).padStart(6, '0');
    return `#${randColor.toUpperCase()}`;
}
