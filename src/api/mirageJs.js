import { createServer, Model } from 'miragejs';

export default function () {

    createServer({
        models: {
            loan: Model,
            book: Model,
            publisher: Model,
        },

        seeds(server) {
            server.create('loan', {
                id: 1,
                idBook: 20,
                bookName: 'Iliada',
                rm: 20104,
                studentName: 'Thiago',
                deliveryDate: new Date(2022, 11, 17).toString(),
                situation: false,
                dateAdt: new Date().toString()
            })
            
            server.create('book', {
                id: 1,
                bookName: 'Iliada',
                author: 'Homero',
                publisher: 'Putz',
            })

            server.create('publisher', {
                id: 1,
                name: 'Kalunga',
                address: 'Rua tal',
                district: 'Tal',
                city: 'tal',
                UF: 'SP'
            })
        },

        routes() {
            //Emprestimos
            this.get('/loans', (schema, request) => {
                return schema.loans.all()
            })
            this.post('/loans/concluded/:id', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                const id = request.params.id

                await schema.loans.find(id).update(attrs)

                return schema.loans.all()

            })
            this.post('/loans/add', (schema, request) => {
                const attrs = JSON.parse(request.requestBody)

                return schema.loans.create(attrs)
            })
            this.delete('/loans/:id', async (schema, request) => {
                const id = request.params.id

                await schema.loans.find(id).destroy()

                return schema.loans.all()
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
            this.post('/books/add', (schema, request) => {
                const attrs = JSON.parse(request.requestBody)

                console.log(attrs)

                return schema.books.create(attrs)
            })
            this.delete('/books/:id', async (schema, request) => {
                const id = request.params.id

                await schema.books.find(id).destroy()

                return schema.books.all()
            })
            this.patch('/books/:id', async (schema, request) => {
                const attrs = JSON.parse(request.requestBody)
                const id = request.params.id

                await schema.books.find(id).update(attrs)

                return schema.books.all()
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