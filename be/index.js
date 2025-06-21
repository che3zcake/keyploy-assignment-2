import express from "express"
import {Blog} from './db.js'
import {z} from 'zod'

const app = express()

app.use(express.json())

app.get("/", async (req, res)=>{
    try{
        const blogArray = await Blog.find().limit(5)
        res.json(blogArray)
    }catch(e){
        res.status(404).json({
            message: "error fetching data: "+e
        })
    }
})

const blogSchema = z.object({
    title: z.string(),
    blog: z.string().min(10),
})

app.post("/add", async (req, res)=>{
    try {
        const body = req.body
        const {success} = blogSchema.safeParse(body)
        if (!success){
            return res.status(400).json({
                message: "invalid input"
            })
        }

        const blogResponse = await Blog.create({
            title: body.title,
            blog: body.blog
        })
        res.json({
            message: "data added",
            blogResponse
        })
    }catch(e){
        res.status(404).json({
            message: "error adding data: "+e
        })
    }
})

const blogUpdateSchema = z.object({
    title: z.string().optional(),
    blog: z.string().min(10).optional(),
});

app.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const { success, error } = blogUpdateSchema.safeParse(body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input", error: error.errors });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (e) {
        res.status(500).json({ message: "Error updating blog: " + e.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({
            message: "Blog deleted successfully",
            blog: deletedBlog,
        });
    } catch (e) {
        res.status(500).json({ message: "Error deleting blog: " + e.message });
    }
});


app.listen(3000, ()=>{
    console.log('listening at port 3000')
})