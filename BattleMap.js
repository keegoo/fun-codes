const PLAYER_INDEX = 0
const STRENGTH_INDEX = 1

const EMPTY_BLOCK = 0

class BattleMap {

  constructor(height, width) {
    this.height = height
    this.width = width

    // setting
    this._init_strength = 10

    this._init_map(height, width)
  }

  _init_map(height, width) {
    const dot = { player: 0, strength: 0 }
    const row = Array.from(Array(this.width), (x, i) => dot)
    this.battleMap = Array.from(Array(this.height), (x, i) => row)
  }

  // render the whole map
  render() {
    this.battleMap.map( row => this._render_row(row))
  }

  _render_row(row) {
    const x = row.map( dot => dot.player == EMPTY_BLOCK ? '*' : dot.player).join(' ')
    console.log(x)
  }
}

module.exports = BattleMap