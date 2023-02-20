const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (_, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('no user with this email found');
            }

            const correctPw = await User.findOne({password});

            if (!correctPw) {
                throw new AuthenticationError('Password is incorrect.')
            }

            const token = signToken(user);

            return {token, user};
        },
        addUser: async (_, {username, email, password}) => {
            const user = User.create({username, email, password});
            const token = signToken(user);
            
            return {token, user};
        },

        saveBook: async (_, {book}, context) => {
            if(context.user) {
            const updatedUser = User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: book}},
                {
                    new: true,
                    runValidators: true,
                },
            );

            return updatedUser;
        }
        throw new AuthenticationError('you need to be logged in.');
    },
        
        removeBook: async (_, {bookId}, context) => {
            if(context.user) {
                const updatedUser = User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId}}},
                    {
                        new: true,
                        runValidators: true,
                    },
                );
    
                return updatedUser;
            }
            throw new AuthenticationError('you need to be logged in.');
        },
    }
};

module.exports = resolvers;