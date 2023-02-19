const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Query {
        users: [User]
        user(username: String!): User
        savedBooks(username: String): [Book]
        book(bookId: ID!): Book
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook( BookSearchInput ): User
        removeBook(bookId: ID!): User
    }

    type User {
        _id: ID!
        username: String
        email: String
        bookCount: INT
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID!
        authors:[authors]
        desription: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookSearchInput {
        authors: String,
        description: String,
        title: String,
        bookId: ID!
    }
`;
    module.exports = typeDefs;