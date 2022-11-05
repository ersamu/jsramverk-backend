const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const UserType = require("./user");

const users = require("../models/users");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                const allUsers = await users.getAllUsers();

                return allUsers;
            }
        }
    })
});

module.exports = RootQueryType;
