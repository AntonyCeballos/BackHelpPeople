import app from './app.js'

app.listen(app.get('port'))
console.log("Servidor iniciado en puerto", app.get('port'))