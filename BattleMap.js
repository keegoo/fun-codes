const PLAYER_INDEX = 0
const STRENGTH_INDEX = 1

const EMPTY_BLOCK = 0

class BattleMap {

  constructor(height, width) {
    this.height = height
    this.width = width

    // setting
    this._init_strength = 10

    this.battleMap = this._create_map(height, width)
  }

  player_take_position(player, row, column) {
    this.battleMap = this._update_map(this.battleMap, row, column, player, this._init_strength)
  }

  _update_map(battleMap, row, column, player, strength) {
    const dot = {player: player, strength: strength}
    const new_row = Object.assign(battleMap[row], {[column]: dot})
    return Object.assign(battleMap, {row: new_row})
  }

  _create_map(height, width) {
    return Array.from(Array(this.height), (x, i) => {
      return Array.from(Array(this.width), (x, i) => { 
        return {player: 0, strength: 0} 
      })
    })
  }

  // render the whole map
  render() {
    this.battleMap.map( row => this._render_row(row) )
  }

  debug() {
    // this.battleMap[row][column]
    this.battleMap.map( row => {
      console.log(row)
    })
  }

  _render_row(row) {
    const x = row.map( dot => dot.player == EMPTY_BLOCK ? '*' : dot.player).join(' ')
    console.log(x)
  }
}

module.exports = BattleMap