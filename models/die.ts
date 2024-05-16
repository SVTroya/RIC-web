import {Schema, model, models} from 'mongoose'

const dieSchema = new Schema({
  die_type: {
    type: String,
    required: [true, 'Expansion type is required!']
  },
  faces: {
    type: Array,
    required: [true, "Set of die's faces is required!"]
  }
})

const Die = models.Die || model('Die', dieSchema, 'dice')

export default Die