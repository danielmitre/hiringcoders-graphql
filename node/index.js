import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { mockedDogs } from './mock.js'
import { graphqlSchema } from './schema.js' 


function listDogs(ownerFilter) {
  return mockedDogs.filter((dog) => {
    if (ownerFilter) {
      return dog.owner == ownerFilter
    }
    return true
  })
}

const app = express()

app.get('/dogs', (request, response) => {
  response.json(listDogs(request.query.owner))
  response.status(200)
})

const resolvers = {
  Query: {
    dogs: (_, args) => listDogs(args.filters.owner)
  }
}

const graphqlServer = new ApolloServer({
  typeDefs: graphqlSchema,
  resolvers
})

await graphqlServer.start()
graphqlServer.applyMiddleware({ app })

//  sistema operacional           programa
// /-------î---------|---------------î---------------\
// PROTOCOL://IP:PORT/path/to/url?name=popoto&type=dog
app.listen(80, () => {
  console.log('Who let the dogs out?')
})
