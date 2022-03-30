import fetch from 'node-fetch';
const baseURL = "https://sylamsh-scheduler.herokuapp.com"
// const baseURL = "http://localhost:3350"

const texts = ["textOne", "textTwo", "textThree", "textFour", "textFive", "textSix", "textSeven", "textEight", "textNine", "textFinal"]
const dateTimes = []
for(var i=0; i<10; i++) {
    var nowDate = new Date(Date.now() + (Math.random() * 21000))
    dateTimes.push(nowDate.toISOString().replace('Z', '').split('T').join(' '))
}

const getServer = async () => {
    await fetch(baseURL)
    .then(res => res.json())
    .then(data => console.log(data.text))
    .catch(err => console.log(err))
}

const postScheduler = async (i) => { 
    await fetch(baseURL + '/scheduler', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: texts[i],
            dateTime: dateTimes[i]
        })
    })
    .then(res => res.json())
    .then(data => console.log(data.text))
    .catch(err => console.log(err))
}


// DRIVER CODE
dateTimes.sort()
// console.log(dateTimes)

getServer()

for(let i=0; i<10; i++) {
    postScheduler(i)
}
