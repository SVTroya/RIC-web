import {Schema, model, models} from 'mongoose'

const expansionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Expansion name is required!'],
    unique: [true, 'Expansion name mast be unique!']
  },
  color: {
    type: String,
    required: [true, 'Expansion color is required!'],
    unique: [true, 'Expansion color mast be unique!']
  }
})

const Expansion = models.Expansion || model('Expansion', expansionSchema)

export default Expansion