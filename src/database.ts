// Arquivo onde faremos a conexão com o banco
import { knex as setupKnex } from "knex"

export const knex = setupKnex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db'
    }
})