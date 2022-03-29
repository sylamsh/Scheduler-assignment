const express = require('express')

const app = express()

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))

const callback = (events, idx, currDate) => {
    if(idx >= events.length)
        return
    const scheduledDate = new Date(events[idx].dateTime)
    currDate = new Date(currDate)
    const textLen = events[idx].text.length
    
    if(scheduledDate > currDate) {
        setTimeout(()=>{
            currDate = new Date
            
            setTimeout(()=>{
                console.log(events[idx].text.split('').reverse().join(''))
                console.log((Date.now()-(scheduledDate.getTime()+textLen * 1000))/1000, 's')
            }, textLen * 1000)

            callback(events, idx+1, currDate)
        }, scheduledDate - currDate)
    } else {
        console.log("Scheduled time has passed")
        callback(events, idx+1, currDate)
    }
}

app.get('/', (req, res) => {
    const date = new Date
    console.log('hello')
    res.send(date.toISOString())
})

app.post('/post', (req, res) => {
    const currDate =  new Date
    var events = req.body.events.sort((a, b) => {
        let da = new Date(a.dateTime)
        let db = new Date(b.dateTime)
        return da - db
    })
    callback(events, 0, currDate)
    res.send("check the console")
})

const PORT = process.env.PORT || 3350
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
module.exports = app