import express from "express";

const app = express()

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))


app.get('/', (req, res) => {
    const date = new Date
    res.send(date.toISOString())
})

const callback = (arr, idx) => {
    if(idx >= arr.length)
        return
    setTimeout(()=>{
        console.log(arr[idx].text.split('').reverse().join('') + ' ' + arr[idx].text.length + 's')
        callback(arr, idx+1)
    }, arr[idx].text.length * 1000)
}

app.post('/post', (req, res) => {
    callback(req.body.events, 0)
    res.send("check the console")
})

const PORT = process.env.PORT || 3350
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))