const request = require('supertest')
const app = require('./App')
const consoleSpy = jest.spyOn(console, 'log');

const events = [
    {
        text: "textOne",
        dateTime: new Date
    },
    {
        text: "textTwo",
        dateTime: new Date + 2000
    },
    {
        text: "textFinal",
        dateTime: new Date + 4000
    },
]

describe('Scheduler', () => {
    it('GET / --> api is running', () => {
        // console.log('hello')
        expect(consoleSpy).toHaveBeenCalledWith('hello');
        return request(app).get('/').expect(200)
    })
    it('POST /post --> reversed text', () => {
        return request(app).post('/post')
                .send({events})
                .expect(200)
    })
    it('POST /post --> output at the right time', () => {})
})