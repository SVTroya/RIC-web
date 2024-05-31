import {model, models, Schema} from 'mongoose'

const blueprintSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    unique: [true, 'Name must be unique!']
  },
  image: {
    type: String,
    required: [true, 'Image is required!'],
    unique: [true, 'Image must be unique!']
  }
})

const Blueprint = models.Blueprint || model('Blueprint', blueprintSchema)

export default Blueprint