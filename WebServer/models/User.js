const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username required'],
        unique: [true, 'username already in use'],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'minimum password length is 6']
    },
    isOnline:{
        type: Boolean,
        required: false
    },
    isInGame:{
        type: Boolean,
        required: false
    }
});

//run before a save to the database, we hash password here
userSchema.pre('save', async function(doc, next){

    console.log('hashing password....');

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    //next();
})

//static model to login user
userSchema.statics.login = async function(username, password){
    //check db for username
    const user =  await this.findOne({username})
    if(user){
        //compare passwords
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }else{
            throw Error('incorrect password')
        }
    }else{
        throw Error('username does not exist')
    }
}

//static model to sign up a user
userSchema.statics.signup = async function(username, password){
    //check db for username

    const user = await this.create({username, password})

    if(user){
        return user;
    }
    else{
        throw Error('username already exists')
    }

}

//static model to find and play a friend/user
userSchema.statics.finduser = async function(username){
    //check db for username
    user =  await this.findOne({username})

    if(user){
        console.log("user being looked for is -->" + user);
        return user;
    }
    else{
        throw Error('username does not exist')
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;