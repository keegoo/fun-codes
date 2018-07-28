const BattleMap = require('./BattleMap.js')

class Engine {
  constructor() {
    this.battleMap = new BattleMap(6, 6)
  }

  invade(player, row, column) {
    if(this._is_valid_invade(player, row, column)) {
      this.battleMap.player_take_position(player, row, column)
    } else {
      console.log(`player ${player} cannot invade position ${[row, column]}. It's too far!`)
    }
  }

  add_player(player) {
    const [row, column] = this.battleMap.get_an_untaken_position()
    this.battleMap.player_take_position(player, row, column)
  }

  // check ?(invade) at least adjacent to himself
  // 
  // valid example: 
  //
  // * * * *
  // * ? * *
  // * 1 * *
  // 
  // invalid example:
  // 
  // * ? * *
  // * * * *
  // * 1 * *
  _is_valid_invade(player, row, column) {
    if (this.battleMap.is_valid_position(row + 1, column) 
      && this.battleMap.get_position_player(row + 1, column) == player) {
      return true
    } else if (this.battleMap.is_valid_position(row - 1, column)
      && this.battleMap.get_position_player(row - 1, column) == player) {
      return true
    } else if (this.battleMap.is_valid_position(row, column + 1) 
      && this.battleMap.get_position_player(row, column + 1) == player) {
      return true
    } else if (this.battleMap.is_valid_position(row, column - 1)
      && this.battleMap.get_position_player(row, column - 1) == player) {
      return true
    } else {
      return false
    }
  }
}

module.exports = Engine