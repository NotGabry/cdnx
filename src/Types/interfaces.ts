import { Document } from 'mongoose';

export interface cdnInterface extends Document {
    ID: string,
    Data: string,
    Time: string
}
