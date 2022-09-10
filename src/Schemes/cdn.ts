import { Schema, model } from 'mongoose';

const cdn = new Schema({
    ID: String,
    Data: String,
    Time: String,
    Cached: Boolean
})

const model_ = model('files', cdn)

export default model_