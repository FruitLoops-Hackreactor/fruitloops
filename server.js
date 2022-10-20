import path from 'path'
import express from 'express'

const app = express()

app.use(express.static(path.join(process.cwd(), 'dist')))

app.get('/', (_, res) => {
  res.sendFile(path.join(path.join(process.cwd(), 'dist'), 'index.html'))
})

app.listen(3000, () => console.log('Server started'))
