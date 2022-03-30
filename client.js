import fetch from 'node-fetch';
const baseURL = "https://sylamsh-scheduler.herokuapp.com"

const texts = ["textOne", "textTwo", "textThree", "textFour", "textFive", "textSix", "textSeven", "textEight", "textNine", "textFinal"]
const dateTimes = []
for(var i=0; i<10; i++) {
    var nowDate = new Date(Date.now() + (Math.random() * 30000))
    dateTimes.push(nowDate.toISOString().replace('Z', '').split('T').join(' '))
}

dateTimes.sort()
// console.log(dateTimes)

for(let i=0; i<10; i++) {
    fetch(baseURL + '/event', {
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
