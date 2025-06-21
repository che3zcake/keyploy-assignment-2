import mongoose, {Schema} from 'mongoose'

(async ()=> {
    try{
        await mongoose.connect()
        console.log("connected to the database")
    }catch(e){
        console.log("error connecting to the database: ",e)
    }
})()

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    blogOwned: [{type: Schema.Types.ObjectId, ref: 'Blog'}]
})

const  blogSchema = new mongoose.Schema({
    title: String,
    blog: String
})

const User = mongoose.model('User', userSchema)
const Blog = mongoose.model('Blog', blogSchema)

export {User, Blog}