import { z } from "zod";
import { Blog } from "../../db.js";

// same as app.js
const blogSchema = z.object({
    title: z.string(),
    blog: z.string().min(10),
});

const blogUpdateSchema = z.object({
    title: z.string().optional(),
    blog: z.string().min(10).optional(),
});

describe("Unit Test: Zod Blog Schemas", () => {
    it("should pass with valid blog post", () => {
        const result = blogSchema.safeParse({
            title: "Valid Title",
            blog: "This is a long enough blog",
        });
        expect(result.success).toBe(true);
    });

    it("should fail with short blog content", () => {
        const result = blogSchema.safeParse({
            title: "Title",
            blog: "short",
        });
        expect(result.success).toBe(false);
    });

    it("should validate partial update data", () => {
        const result = blogUpdateSchema.safeParse({
            blog: "Updated blog content here",
        });
        expect(result.success).toBe(true);
    });

    it("should fail update if blog is too short", () => {
        const result = blogUpdateSchema.safeParse({
            blog: "short",
        });
        expect(result.success).toBe(false);
    });
});

describe("Unit Test: Blog Mongoose Schema", () => {
    it("should create a new Blog instance", () => {
        const blog = new Blog({ title: "Test", blog: "Some long blog content" });
        expect(blog.title).toBe("Test");
        expect(blog.blog.length).toBeGreaterThan(10);
    });

    it("should fail validation if blog is too short", async () => {
        const blog = new Blog({ title: "Test", blog: "short" });
        let error;
        try {
            await blog.validate();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(error.errors.blog).toBeDefined();
    });
});
