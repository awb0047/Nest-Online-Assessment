const db = require('../../mockdata').default;

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} = require('graphql');

const RecognitionType = new GraphQLObjectType({
    name: 'Recognition',
    description: 'An recognition given by an employee to another',
    fields: () => {
        const { EmployeeType } = require('./EmployeeType');
        return {
            authorId: { type: GraphQLInt },
            recipientId: { type: GraphQLInt },
            visibility: { type: GraphQLString },
            message: { type: GraphQLString },
            time: { type: GraphQLString },
            author: {
                type: EmployeeType,
                resolve: (recognition) => {
                    return db.employees.find(employee => employee.id === recognition.authorId);
                }
            },
            recipient: {
                type: EmployeeType,
                resolve: (recognition) => {
                    return db.employees.find(employee => employee.id === recognition.recipientId);
                }
            }
        }
    }
})

module.exports = { RecognitionType };