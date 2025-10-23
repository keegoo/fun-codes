const PLAYER_INDEX = 0
const STRENGTH_INDEX = 1

const EMPTY_BLOCK = 0

class BattleMap {

  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns

    // setting
    this._init_strength = 9

    this.battleMap = this._create_map(rows, columns)
  }

  player_take_position(player, row, column) {
    this.battleMap = this._update_map(this.battleMap, row, column, player, this._init_strength)
  }

  get_an_untaken_position() {
    const positions = this._calculate_untaken_positions(this.battleMap)
    return positions[Math.floor(Math.random()*positions.length)]
  }

  decline_all_strength() {
    this._decline_strength(this.battleMap)
  }

  get_position_player(row, column) {
    return this.battleMap[row][column].player
  }

  get_position_strength(row, column) {
    return this.battleMap[row][column].strength
  }

  is_valid_position(row, column) {
    return (row >= 0 && row < this.rows) && (column >= 0 && column < this.columns) ? true : false
  }

  render() {
    console.log("")
    console.log("HERE's THE BATTLE FIELD")
    console.log("-----------------------")
    this.battleMap.map( (row, index) => this._render_row(row, index) )
  }

  debug() {
    this.battleMap.map( (row, index) => {
      console.log(`ROW ${index}`)
      console.log(JSON.stringify(row))
    })
  }

  _update_map(battleMap, row, column, player, strength) {
    const dot = {player: player, strength: strength}
    const new_row = Object.assign(battleMap[row], {[column]: dot})
    return Object.assign(battleMap, {row: new_row})
  }

  _create_map(rows, columns) {
    return Array.from(Array(this.rows), (x, i) => {
      return Array.from(Array(this.columns), (x, i) => {
        return {player: 0, strength: 0}
      })
    })
  }

  _calculate_untaken_positions(battleMap) {
    const rows = battleMap.length
    const columns = battleMap[0].length
    let empty_blocks = []
    for (let row = 0; row < rows; row ++) {
      for(let column = 0; column < columns; column ++) {
        if(battleMap[row][column].player == EMPTY_BLOCK) {
          empty_blocks.push([row, column])
        }
      }
    }
    return empty_blocks
  }

  _decline_strength(battleMap) {
    const rows = battleMap.length
    const columns = battleMap[0].length
    for (let row = 0; row < rows; row ++) {
      for(let column = 0; column < columns; column ++) {
        if(battleMap[row][column].strength >= 0) {
          battleMap[row][column].strength --
        }
      }
    }
  }

  _render_row(row, index) {
    const x = row.map( dot => dot.player == EMPTY_BLOCK ? ' * ' : `${dot.player}|${dot.strength}`).join(' ')
    console.log(`[${index}]: ${x}`)
  }
}

module.exports = BattleMap