const db = require('../../mockdata').default;

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'An employee in the company',
    fields: () => {
        const {  RecognitionType } = require('./RecognitionType');
        return {
            id: { type: GraphQLNonNull(GraphQLInt) },
            teamid: { type: GraphQLInt },
            name: { type: GraphQLString },
            role: { type: GraphQLString },
            recognitionsGiven: {
                type: new GraphQLList(RecognitionType),
                resolve: (employee) => {
                    return db.recognitions.filter(recognition => recognition.authorId === employee.id);
                }
            },
            recognitionsReceived: {
                type: new GraphQLList(RecognitionType),
                resolve: (employee) => {
                    return db.recognitions.filter(recognition => recognition.recipientId === employee.id);
                }
            }
        }
    }
})

module.exports = { EmployeeType };