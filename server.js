const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {createServer } = require('http')
const app = express();
const httpServer = createServer(app)
const schema = require('./Schema/index');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const port = 3000

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
})
useServer({schema}, wsServer)

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
    console.log(`Subscription endpoint is running at ws://localhost:${port}/graphql`);
});