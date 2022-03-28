import express from "express";

const app = express()

app.use(express.json({ extended : true }))
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.send('Insta Minutes Assignment')
})

const PORT = process.env.PORT || 3350
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
