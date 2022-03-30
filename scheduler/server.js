import fetch from 'node-fetch';
import express from 'express'
const app = express()
const baseURL = "https://sylamsh-scheduler.herokuapp.com"
// const baseURL = "http://localhost:3350"
const PORT = process.env.PORT || 3350

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.status(200).json({text: "Server is running..."})
})

app.post('/scheduler', (req, res) => {
    const event = req.body
    const scheduledDate = new Date(event.dateTime)
    const currDate = new Date
    if(scheduledDate > currDate) {
        setTimeout(()=>{
            fetch(baseURL + '/triggerFunction', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: event.text
                })
            })
            .then(response => response.json())
            .then(data => res.status(200).json({
                text : data.text,
                currentDate : new Date(data.nowDate).toLocaleString(),
                scheduledDate : scheduledDate.toLocaleString(),
                timeDiff: ((data.nowDate-scheduledDate-(data.text.length * 1000))/1000) + 's' 
            }))
            .catch(err => console.log(err))
        }, scheduledDate - currDate)
    } else {
        res.status(400).json({text: "Scheduled time has passed"})
    }
})

app.post('/triggerFunction', (req, res) => {
    const sleepTime = req.body.text.length * 1000
    setTimeout(()=>{
        res.status(200).json({
            text: req.body.text.split('').reverse().join(''),
            nowDate : Date.now()
        })
    }, sleepTime)
})

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))