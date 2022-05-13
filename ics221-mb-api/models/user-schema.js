import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        lowercase:true,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    username:{
        type: String,
        required:true,
        match:/[A-Za-z0-9-_]/,
        minLength: 2,
        maxLength: 30
    },
    password:{
        type: String,
        required:true,
        minLength: 8,
        maxLength: 64
    }
});
userSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});

userSchema.pre('save', async function() {
    // hash and salt password
    try {
        const hash = await argon2.hash(this.password, {
            type: argon2.argon2id
        });
        this.password = hash;
    } catch (err) {
        console.log('Error in hashing password' + err);
    }
});

userSchema.methods.verifyPassword = async function(plainTextPassword) {
    const dbHashedPassword = this.password;
    try {
        return await argon2.verify(dbHashedPassword,
        plainTextPassword);
    } catch (err) {
        console.log('Error verifying password' + err);
    }
}

export default mongoose.model('user', userSchema);
