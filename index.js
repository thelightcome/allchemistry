const mongoose = require('mongoose'),
	  express = require('express'),
	  config = require('config'),
	  path = require('path')

const app = express()

app.use(express.json({extended: true}))

app.use('/', require('./routes/main.route.js'))

if (process.env.NODE_ENV == 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = config.get('PORT') || 5000

mongoose.connect(config.get('BD_URL'), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then((result) => {
	console.log('Database connected')
	app.listen(PORT, () => {console.log(`App has been started on port: ${PORT}`)})
}).catch((err) => {
	console.log('Database not connected: ', err)
	process.exit(1)
})