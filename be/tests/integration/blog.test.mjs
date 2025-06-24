import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Blog } from '../../db';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Integration Test: Blog Model', () => {
    it('should create and fetch a blog', async () => {
        const blog = await Blog.create({ title: 'Hello', blog: 'This is a detailed blog post' });
        const found = await Blog.findById(blog._id);
        expect(found.title).toBe('Hello');
    });

    it('should update a blog', async () => {
        const blog = await Blog.create({ title: 'Old', blog: 'Old content that is long enough' });
        blog.title = 'Updated';
        await blog.save();
        const updated = await Blog.findById(blog._id);
        expect(updated.title).toBe('Updated');
    });
});
