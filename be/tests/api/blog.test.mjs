import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../index';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('API Test: /add, /, /update/:id, /delete/:id', () => {
    let createdId;

    it('POST /add - should create a blog', async () => {
        const res = await request(app)
            .post('/add')
            .send({ title: 'API Blog', blog: 'This is a valid blog post content' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('data added');
        createdId = res.body.blogResponse._id;
    });

    it('GET / - should return array of blogs', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('PATCH /update/:id - should update a blog', async () => {
        const res = await request(app)
            .patch(`/update/${createdId}`)
            .send({ title: 'Updated API Blog' });

        expect(res.statusCode).toBe(200);
        expect(res.body.blog.title).toBe('Updated API Blog');
    });

    it('DELETE /delete/:id - should delete the blog', async () => {
        const res = await request(app).delete(`/delete/${createdId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Blog deleted successfully');
    });
});
