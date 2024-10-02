import app from "./app"

const PORTA = process.env.PORT

app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`))