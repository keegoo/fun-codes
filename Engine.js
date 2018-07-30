const BattleMap = require('./BattleMap.js')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})


class Engine {
  constructor() {
    this.battleMap = new BattleMap(10, 10)
  }

  main_loop() {
    let stop = false
    this.welcome_screen()
    // keep reading from stdin until 'stop'
    rl.on('line', line => {
      if(line.toLowerCase() === 'stop') {
        stop = true
        process.stdin.pause()
      } else {
        const cmds = this.parse_commands(line.trim())
        // console.log(cmds)
        this.exec_commands(cmds)
      }
      this.battleMap.decline_all_strength()
      this.battleMap.render()
    })
  }

  welcome_screen() {
    console.log("")
    console.log("Welcome to BlahBlah !!!")
    console.log("=======================")
    console.log("")
    this.battleMap.render()
    console.log("YOUR MOVE:")
  }

  // inputStr = 'PLAYER 1 ATTACK (2, 3) | PLAYER 2 ATTACK (1, 2) | ...'
  // return =
  // [
  //   ['attack', 1, 2, 3],
  //   ['attack', 2, 1, 2],
  //   ...
  // ]
  parse_commands(inputStr) {
    const cmds = inputStr.split('|').map(x => x.trim())
    return cmds.map(cmd => {
      if(cmd.startsWith('ADD')) {
        return this._parse_add_player(cmd)
      } else {
        return this._parse_attack(cmd)
      }
    })
  }

  _parse_add_player(cmd) {
    const regex = /ADD PLAYER (\d)/
    const [ _, player ] = regex.exec(cmd)
    return ['add', parseInt(player)]
  }

  _parse_attack(cmd) {
    const regex = /PLAYER (\d) ATTACK \((\d, \d)\)/
    const [ _, player, position ] = regex.exec(cmd)
    const [row, column] = position.split(', ')
    return ['attack', parseInt(player), parseInt(row), parseInt(column)]
  }

  exec_commands(cmds) {
    cmds.forEach(cmd => {
      if(cmd[0] === 'add') {
        this.add_player(cmd[1])
      } else if(cmd[0] === 'attack') {
        this.invade(cmd[1], cmd[2], cmd[3])
      } else {
        console.log("wrong move!")
      }
    })
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