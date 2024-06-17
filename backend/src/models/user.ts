import mongoose from 'mongoose';
import validator from 'validator';

interface IUser extends mongoose.Document {
    _id: string;
    name: string;
    email:string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;

    // virtual attribute
    age: number;

}

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, 'ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email:{
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter email"],
        isValidate: validator.default.isEmail,
    },
    photo:{
        type: String,
        required: [true, 'Photo is required'],
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    gender:{
        type: String,
        enum:["male", "female"],
        required: [true, "Please enter gender"]
    },
    dob:{
        type: Date,
        required: [true, "Please enter date of birth"]
    },

}, { timestamps: true });

schema.virtual("age").get(function(){
    const today:Date = new Date();
    const dob:Date = new Date(this.dob);
    const age:number = today.getFullYear() - dob.getFullYear();

    if(today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())){
        return age - 1;
    }

    return age;
})

export const User = mongoose.model<IUser>('User', schema);