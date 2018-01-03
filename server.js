const app = require('express')();
const graphqlHTTP = require('express-graphql')
const schema = require('./schema');
const context = require('./graphqlContext');

app.use('/graphql',
  graphqlHTTP(req => ({
    schema,
    context: context(),
    graphiql: true
})))

app.listen(4000)

console.log("GraphiQL is listening at http://localhost:4000/graphql");
