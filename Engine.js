const BattleMap = require('./BattleMap.js')

class Engine {
  constructor() {
    this.battleMap = new BattleMap(10, 10)
  }

  invade(player, row, column) {
    if(this._is_valid_invade(player, row, column)) {
      this.battleMap.player_take_position(player, row, column)
    } else {
      console.log(`player ${player} cannot invade position ${[row, column]}. It's too far!`)
    }
  }

  // if position was provided, player will born there
  // if position was not provides, player will born at a random untaken place
  add_player(player, row, column) {
    if(arguments.length === 1) {
      const [row, column] = this.battleMap.get_an_untaken_position()
      this.battleMap.player_take_position(player, row, column)
    } else {
      this.battleMap.player_take_position(player, row, column)
    }
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
  //
  // if the place player wants to invade already belongs to him,
  // it's still valid.
  _is_valid_invade(player, row, column) {
    if (this.battleMap.is_valid_position(row, column) 
      && this.battleMap.get_position_player(row, column) == player) {
      // player's own land
      return true
    } else if (this.battleMap.is_valid_position(row + 1, column) 
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