import fetch from 'node-fetch';
const baseURL = "http://localhost:3350"

const events = [
    {
        text: "textOne",
        dateTime: new Date(Date.now() - 1000)
    },
    {
        text: "textTwo",
        dateTime: new Date(Date.now() + 5000)
    },
    {
        text: "textThree",
        dateTime: new Date(Date.now() + 15000)
    },
    {
        text: "textFour",
        dateTime: new Date(Date.now() + 30000)
    },
    {
        text: "textFive",
        dateTime: new Date(Date.now() + 30000)
    },
    {
        text: "textSix",
        dateTime: new Date(Date.now() + 31000)
    },
    {
        text: "textSeven",
        dateTime: new Date(Date.now() + 35000)
    },
    {
        text: "textEight",
        dateTime: new Date(Date.now() + 50000)
    },
    {
        text: "textNine",
        dateTime: new Date(Date.now() + 57000)
    },
    {
        text: "textFinal",
        dateTime: new Date(Date.now() + 60000)
    },
]

for(let i=0; i<10; i++) {
    fetch(baseURL + '/event', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(events[i])
    })
    .then(res => res.json())
    .then(data => console.log(data.text))
    .catch(err => console.log(err))
}
