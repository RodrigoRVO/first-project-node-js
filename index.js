const express = require('express')
const port = 3000
const uuid = require('uuid')
const app = express()

app.use(express.json())



const orders = []


const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = orders.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({Error: 'User not found!'})
    }

    request.orderIndex = index
    request.orderId = id

    next()
} 






app.get('/order', (request, response) => {
    
    return response.json(orders)
})



app.post('/order', (request, response) => {
    const {order, clientName, price} = request.body

    const status = 'Em preparação...'

    const orderStatus = {id: uuid.v4(), order, clientName, price, status}

    orders.push(orderStatus)

    return response.json(orderStatus)
})



app.put('/order/:id', checkUserId, (request, response) => {
    const index = request.orderIndex
    const id = request.orderId
    const status = 'Em preparação...'

    const {order, clientName, price,} = request.body

    const newOrder = {id, order, clientName, price, status}

    orders[index] = newOrder

    return response.json(newOrder)
})




app.delete('/order/:id', checkUserId, (request, response) => {
    
    const index = request.orderIndex

    orders.splice(index, 1)

    return response.status(204).json()
})




app.get('/order/:id', checkUserId, (request, response) => {
    const index = request.orderIndex

    const clientOrder = orders[index]

    return response.json(clientOrder)

})




app.patch('/order/:id', checkUserId, (request, response) => {
    const id = request.orderId

    const {order, clientName, price} = request.body

    const newStatus = {id, order, clientName, price, status: 'Seu pedido está pronto!'}

    return response.json(newStatus)
})





app.listen(port, () => {
    console.log(`*-* Server started on port ${port}`)
})



