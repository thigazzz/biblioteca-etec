import { belongsTo, createServer, hasMany, Model } from 'miragejs';

export default function () {

    createServer({
        models: {
            loan: Model,
            book: Model,
        },

        seeds(server) {
            server.create('loan', {
                id: 1,
                tombo_book: 1,
                id_student: 20104,
                id_employee: 1,
                deliveryDate: new Date(2022, 11, 17).toString(),
                situation: false,
                description: 'Aaaaa',
                dateAdt: new Date().toString()
            })

            server.create('book', {
                tombo: 1,
                title: 'Iliada',
                CDD: 2,
                author: 'Homero',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
            server.create('book', {
                tombo: 2,
                title: 'Porpeta',
                CDD: 2,
                author: 'Sla Mn',
                status: 1,
                publisher: 'Klaunga',
            })
        },

        routes() {
            //Emprestimos
            this.get('/loans', async (schema, request) => {
                return await schema.loans.all()
            })
            this.post('/loans/concluded/:id', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                const id = request.params.id

                await schema.loans.find(id).update(attrs)

                return schema.loans.all()

            })
            this.post('/loans/add', (schema, request) => {
                const attrs = JSON.parse(request.requestBody)

                console.log(attrs)

                return schema.loans.create({
                    ...attrs, 
                    id_employee: 1,
                    dateAdt: new Date,
                    situation: false,
                })
            })
            this.delete('/loans/:id', async (schema, request) => {
                const id = request.params.id

                await schema.loans.find(id).destroy()
            })
            this.patch('loans/:id', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                const id = request.params.id

                await schema.loans.find(id).update(attrs)

                return schema.loans.all()

            })

            //Livros
            this.get('/books', (schema, request) => {
                return schema.books.all()
            })
            this.post('/books/add', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)

                await schema.books.create(attrs)
            })
            this.delete('/books/:id', async (schema, request) => {
                const id = request.params.id

                await schema.books.find(id).destroy()
            })
            this.patch('/books/:id', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                const id = request.params.id

                await schema.books.find(id).update(attrs)
            })

            //Editora
            this.get('/publishers', async (schema, request) => {
                return schema.publishers.all()
            })
            this.post('publishers/add', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)

                attrs.id = Math.random()

                return schema.publishers.create(attrs)
            })
            this.delete('/publishers/:id', async (schema, request) => {
                const id = request.params.id

                await schema.publishers.find(id).destroy()
            })
            this.patch('/publishers/:id', async (schema, request) => {
                const id = request.params.id
                const attrs = JSON.parse(request.requestBody)

                await schema.publishers.find(id).update(attrs)
            })
        }
    })
} 