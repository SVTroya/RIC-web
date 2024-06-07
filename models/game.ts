import {Schema, model, models} from 'mongoose'

const gameSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required!'],
    unique: [true, 'User can have only one active game. User ID must be unique']
  },
  expansion: {
    type: String,
    required: [true, 'Expansion is required!']
  },
  blueprint: {
    type: String
  },
  objectives: {
    type: Array<Objective>,
    required: [true, 'List of objective cards is required!']
  },
  lastRound: {
    type: Object
  }
})

const Game = models.Game || model('Game', gameSchema)

export default Game