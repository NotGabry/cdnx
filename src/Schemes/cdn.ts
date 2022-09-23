import { Schema, model } from 'mongoose';

const cdn = new Schema({
    ID: String,
    Data: String,
    Time: String,
    Cached: Boolean,
    RequestedTimes: Number
})

const model_ = model('files', cdn)

export default model_