import mongoose from "mongoose";
const Schema = mongoose.Schema;
import * as bcrypt from 'bcrypt'

interface User {
  name: string;
  email: string;
  password: string;
    
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

});


//encriptação da senha antes de Salva 

userSchema.pre('save', async function(next){
    //define qual objeto terá o valor encriptado e quantos rounds
    const hash = await bcrypt.hash(this.password,10)

    this.password = hash
    next()
})
const User = mongoose.model("Users", userSchema);
export { User };
