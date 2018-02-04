const Direction = Object.freeze({
  UP: Symbol('UP'),
  DOWN: Symbol('DOWN'),
  LEFT: Symbol('LEFT'),
  RIGHT: Symbol('RIGHT'),
})

const state = {
  grid: null,
  size: null,
  number: null,
  index: null,
  moves: null,
}
const next = {
  size: null,
  moves: null,
}

const resetStates = () => {
  state.grid = { '0,0': 1 }
  state.size = 1
  state.number = 2
  state.index = { i: 0, j: 0 }
  state.moves = [Direction.RIGHT]

  next.size = 3
  next.moves = { ups: -1, downs: 0, lefts: 0, rights: 1 }
}

const nextMove = () => {
  const ups = state.moves.filter(e => e === Direction.UP).length
  const downs = state.moves.filter(e => e === Direction.DOWN).length
  const lefts = state.moves.filter(e => e === Direction.LEFT).length
  const rights = state.moves.filter(e => e === Direction.RIGHT).length
  let move = null
  const condition = rights === 1
  if (condition && ups < next.moves.ups) {
    move = Direction.UP
  } else if (condition && ups === next.moves.ups && lefts < next.moves.lefts) {
    move = Direction.LEFT
  } else if (condition && lefts === next.moves.lefts && downs < next.moves.downs) {
    move = Direction.DOWN
  } else if (downs === next.moves.downs && rights < next.moves.rights) {
    move = Direction.RIGHT
  } else {
    move = Direction.RIGHT
    // update state
    state.size = next.size
    state.moves = []
    // update next
    next.size += 2
    for (const key in next.moves) {
      next.moves[key] += 2
    }
  }
  return move
}

const applyMove = (move) => {
  state.moves.push(move)
  switch (move) {
    case Direction.UP:
      state.index.j += 1
      break
    case Direction.DOWN:
      state.index.j -= 1
      break
    case Direction.LEFT:
      state.index.i -= 1
      break
    case Direction.RIGHT:
      state.index.i += 1
      break
  }
  const { i, j } = state.index
  state.grid[`${i},${j}`] = state.number
}

const gridToArrar = ({ grid, size }) => {
  const bound = Math.floor(size/2)
  let arr = [[]]
  for (let i = -bound, ix = size; ix > 0; i += 1, ix -= 1) {
    if (!arr[ix]) {
      arr[ix] = []
    }
    for (let j = -bound, jx = 0; jx < size; j += 1, jx += 1) {
      arr[ix][jx] = grid[`${j},${i}`]
    }
  }
  return arr
}

export default (input) => {
  resetStates()
  while (state.number <= input) {
    const move = nextMove()
    applyMove(move)
    state.number += 1
  }
  return gridToArrar(state)
}
