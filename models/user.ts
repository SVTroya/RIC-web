import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'E-mail already exists!'],
    required: [true, 'E-mail is required!']
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 5-20 alphanumeric letters and be unique!']
  },
  image: {
    type: String
  },
  expList: [{
    type: Schema.Types.ObjectId,
    ref: 'Expansion'
  }]
})

const User = models.User || model('User', userSchema)

export default User