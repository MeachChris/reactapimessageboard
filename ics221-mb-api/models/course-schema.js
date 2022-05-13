import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 8,
        match: /^ICS 2\d\d$/
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 75
    },
    instructor:{
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 75
    }
  });
  courseSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
  });
   
  export default mongoose.model('course', courseSchema);






