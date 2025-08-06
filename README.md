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


