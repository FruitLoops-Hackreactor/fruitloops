import path from 'path'
import express from 'express'
import commpression from 'compression'

const app = express()

app.use(commpression())

app.use(
  express.static(path.join(process.cwd(), 'dist'), {
    // Cache assets for 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
)

app.get('*', (_, res) => {
  res.sendFile(path.join(path.join(process.cwd(), 'dist'), 'index.html'))
})

app.listen(3000, () => console.log('Server started'))
