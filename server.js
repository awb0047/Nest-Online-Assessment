const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const schema = require('./Schema/index');

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});