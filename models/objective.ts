import {Schema, model, models} from 'mongoose'

const objectiveSchema = new Schema({
  exp: {
    type: String,
    required: [true, 'Expansion name is required!']
  },
  image: {
    type: String,
    required: [true, 'Name of objective\'s image is required!'],
    unique: [true, 'Image file for objective must be unique!']
  },
  description: {
    type: String,
    required: [true, 'Description of objective\'s image is required!']
  }
})

const Objective = models.Objective || model('Objective', objectiveSchema)

export default Objective