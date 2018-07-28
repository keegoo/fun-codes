const BattleMap = require('./BattleMap.js')
const Engine = require('./Engine.js')

e = new Engine()
e.add_player(1, 2, 2)
e.add_player(2)
e.add_player(3)
e.add_player(4)

e.invade(1, 2, 3)
e.invade(1, 2, 4)
e.invade(1, 1, 2)
e.battleMap.render()