import express from 'express'
const app = express()

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.status(200).json({text: "Server is running..."})
})

app.post('/event', (req, res) => {
    const event = req.body
    const scheduledDate = new Date(new Date(event.dateTime) + event.text.length * 1000)
    const currDate = new Date
    if(scheduledDate > currDate) {
        setTimeout(()=>{
            var nowDate = new Date
            res.status(200).json({
                text : event.text.split('').reverse().join(''),
                currentDate : nowDate.toLocaleString(),
                scheduledDate : scheduledDate.toLocaleString(),
                timeDiff: ((nowDate-scheduledDate)/1000) + 's' 
            })
        }, scheduledDate - currDate)
    } else {
        res.status(400).json({text: "Scheduled time has passed"})
    }
})

const PORT = process.env.PORT || 3350
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))