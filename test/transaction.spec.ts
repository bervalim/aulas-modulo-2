import { afterAll, beforeAll, it, describe, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Transaction Routes',() => {
    beforeAll(async () =>{
        await app.ready()
     })
     
     
     afterAll(async()=> {
         await app.close()
     })
     
     describe('POST /transactions',()=> {
        it("should be able user to create a new transaction", async () => {
           await request(app.server)
            .post("/transactions")
            .send({
              title: "New Transaction",
              amount: 5000,
              type: "credit",
            })
            .expect(201);
        });
     })

     describe('GET /transactions',()=> {
        it("should be able to list all transactions", async () => {
            const createTransactionResponse = await request(app.server)
            .post("/transactions")
            .send({
              title: "New Transaction",
              amount: 5000,
              type: "credit",
            })

            const cookies = createTransactionResponse.get('Set-Cookie')
            console.log(cookies)

            // Método set -> usado para setar uma info de um cabeçalho da requisição
            const listTransactionsResponse = await request(app.server)
            .get("/transactions")
            .set('Cookie',cookies!)
            .expect(200)

            expect(listTransactionsResponse.body.transactions).toEqual([
                // Espera que exista um Objeto que contenha certas informações
                expect.objectContaining({
                    title: "New Transaction",
                    amount: 5000,
                })

            ])
        });
     })
    
})



