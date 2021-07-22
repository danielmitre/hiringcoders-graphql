import { gql } from 'apollo-server-express'

export const graphqlSchema = gql`
type Dog {
  name: String!
  breed: String!
  weight: Float!
  owner: String!
}

input DogFilters {
  owner: String
}

type Query {
  dogs(filters: DogFilters): [Dog!]!
}
`