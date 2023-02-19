const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () =>{

        },
        user: async () =>{

        },
        savedBooks: async () =>{

        },
        book: async () =>{

        },
        me: async () =>{

        },
    },

    Mutation: {
        login: async () =>{

        },
        addUser: async () =>{

        },
        saveBook: async () =>{

        },
        removeBook: async () =>{

        },
    }
};

module.exports = resolvers;