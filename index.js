import express from "express";

const app = express()

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))


app.get('/', (req, res) => {
    const date = new Date
    res.send(date.toISOString())
})

const callback = (arr, idx, currDate) => {
    if(idx >= arr.length)
        return
    const scheduledDate = new Date(arr[idx].dateTime)
    setTimeout(()=>{
        let nowDate = new Date
        console.log(arr[idx].text.split('').reverse().join('') + ' ' + nowDate.toLocaleString())
        callback(arr, idx+1, currDate)
    }, (scheduledDate - currDate) + arr[idx].text.length * 1000)
}

app.post('/post', (req, res) => {
    const currDate =  new Date
    callback(req.body.events, 0, currDate)
    res.send("check the console")
})

const PORT = process.env.PORT || 3350
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))