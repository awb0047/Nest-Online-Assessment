const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
} = require('graphql');
const { PubSub } = require('graphql-subscriptions');

const { EmployeeType } = require('./TypeDefs/EmployeeType.js');
const { RecognitionType } = require('./TypeDefs/RecognitionType');
const db = require('../mockdata').default;

const pubsub = new PubSub();

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query for Schema',
    fields: () => ({
        employees: {
            type: new GraphQLList(EmployeeType),
            description: 'List of employees',
            resolve: () => db.employees
        },
        recognitions: { 
            type: new GraphQLList(RecognitionType),
            description: 'List of recognitions',
            resolve: () => db.recognitions
        },
        recognitionsByTeam: {
            type: new GraphQLList(RecognitionType),
            description: 'List of recognitions given to members on a team, queried by team ID',
            args: {
                teamId: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const member = db.employees.filter((employee => employee.teamId === args.teamId));
                const memberIds = member.map(mem => mem.id);
                return db.recognitions.filter(recognition => memberIds.includes(recognition.recipientId));
            }
        },
        recognitionsByKeyword: {
            type: new GraphQLList(RecognitionType),
            description: 'List of recognitions that contain a specific keyword in the message',
            args: {
                keyword: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return db.recognitions.filter(recognition => 
                    recognition.message.toLowerCase().includes(args.keyword.toLowerCase())
                );
            }
        }
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Root Mutation for Schema',
    fields: () => ({
        createRecognition: {
            type: RecognitionType,
            description: 'Create a new recognition',
            args: {
                authorId: { type: new GraphQLNonNull(GraphQLInt) },
                recipientId: { type: new GraphQLNonNull(GraphQLInt) },
                visibility: { type: new GraphQLNonNull(GraphQLString) },
                message: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                let curTime = new Date();
                const recognition = {
                    authorId: args.authorId,
                    recipientId: args.recipientId,
                    visibility: args.visibility,
                    message: args.message,
                    time: curTime.toUTCString()
                }
                db.recognitions.push(recognition);
                pubsub.publish('recognitionCreated', recognition)
                return recognition;
            }
        }
    })
});

const RootSubscription = new GraphQLObjectType({
    name: 'SubscriptionType',
    description: 'Root Subscription for Schema',
    fields: () => ({
        recognitionCreated: {
            type: RecognitionType,
            description: 'Subscription for new recognitions added',
            resolve: (recognition) => recognition,
            subscribe: () => pubsub.asyncIterator(['recognitionCreated'])
        }
    })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
});