# Nest Online Assessment Documentation

## Schema Design
Based on the core requirements, I see a few different shemas that will need to be created and their fields:

### Employee Schema
- Employee ID (Primary key)
- Team ID
- Employee's name
- Role (Employee, Manager, HR, Leads)

### Reconition Schema
- Author (Employee ID)
- Recipient (Employee ID)
- Visibility Level (Public, Private, Anonymous)
- Message (Should be able to contain unicode emoji)
- Time (automatically set)

## GraphQL Notes
Graphql allows a single endpoint to be used to return information to the frontend. While a traditional RestAPI would have multiple endpoints that each return different information, Graphql would allow you to access only the information you need without excess, and from a single API call. 

For example, in a RestAPI if you wanted to get all recognitions from each employee, you would have to have an endpoint to return all employees, take those ID's, and then have an additional endpoint for getting all recognitions from a given employee. That endpoint would need to be called for every single employee, not to mention the first endpoint would contain excess information. In GraphQL however, this could be done in a single call without any excess information about the author, resulting in less bandwidth, faster speeds, and easier analysis.

## Design
For simplicity sake, "mockdata.js" contains the test data for employee and recognition examples. "Schema/index.js" is responsible for setting up queries, mutations, and subscriptions. Because leadership team expressed interest in analytics, queries were made to search through recognitions by team and keyword. While engagements such as likes and reactions were not implimented, the server was designed to easily add new queries. the **RecognitionType** type could simply be updated with a counter for interactions, and a new query under RootQuery could be created for this.

Real time updates are handled through subscriptions. While not fully fleshed out, the core system is there where the subscription for new recogintions is triggered and responds through the web socket.

While visibility isn't used, each recognition is stored holding a privacy value that can be used in the front-end to control data display. One issue I see with this is that the client side can still access the authors information if set to anonymous. Logic should be implimented within these queries resolve to protect data on the server side instead.

Future features such as badges, likes, reactions, and comments can simply be expanded onto aditional types that can be linked to recognitions, similar to how the author and recipients can be found from the recognition.

Ideally I would have used MongoDB with Mongoose or Postgres as a database system due to how flexible they are, since there seems to be a lot of future plans from the stakeholders. A relational database would be very useful here given the relationships between employees, teams, managers, and recognitions, so I would most likely go with Postgres.

### Queries
#### employees
- Fetches all employees
- No args

#### recognitions
- Fetches all recognitions
- No args

#### recognitionsByTeam
- Retrieves all recognitions given to a specific team
- teamId: Unique ID of team within organization

#### recognitionsByKeyword
- Retrieves all recognitions that's message includes provided keyword
- keyword: string value

### Mutations
##### createRecognition
- Creates a new recognition object, pushed to the database (mockdata.js), and notifies subscribers of new recognition over websocket
- authorId: unique ID of sender
- recipientId: unique ID of recipient of recognition
- visibility: public, private, or anonymous
- message: ASCII string as body of recognition

### Subscriptions
#### recognitionCreated
- Method handles pubsub logic to send recognition over websocket

## Subscriptions
To handle subscriptions, I chose to use **graphql-subscriptions** as I am not using Apollo in my use case. According to GraphQL documentation (https://graphql.org/learn/subscriptions/), "GraphQL subscriptions are typically backed by a separate pub/sub system so that messages about updated data can be published as needed during runtime". To properly handle real time updates as requested by the shareholder, this library was chosen.

**graphql-ws** was chosen to support websockets for subscriptions. This allows the graphql server to send out notifications using the pubsub system without the client needing to requrest the information through something like a POST request.

## Assumptions
A recognition is a message that is comprised of text and/or emojis that cna be sent by one employee to another. The recognition contains a visibility value, determining who can see the message and if the users name should be hidden. Role based access control gives permission on the client side for what recognitions can be seen based on an employees role.

## Shortcomings on my Implimentation
#### Lack of integration
A fleshed out implimentation of this should utilize slacks API (https://api.slack.com/). This could mean treating recognitions as messages available in public and team channels, while using scopes as protection for visibility. The same goes for Microsoft Teams.

#### Batching Real-Time updates
The current subscription model would send out updates instantly, assuming connection to a socket. However, that connection might not always be existent, and we still want to notify employees when they return online, AKA reestablish a connection. There should be a cache located in the database that stores messages lacking a persistant connection, and should retry in intervals. Storing on database would protect these notifications in case of a server failure.

