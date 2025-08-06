const employees = [
    { id: 1, teamId: 1, name: 'Addison Barrow', role: 'employee' },
    { id: 2, teamId: 2, name: 'John Smith', role: 'employee' },
    { id: 3, teamId: 1, name: 'Jane Doe', role: 'manager' },
    { id: 4, teamId: 3, name: 'Emily Davis', role: 'hr' },
    { id: 5, teamId: 2, name: 'Michael Brown', role: 'lead' },
    { id: 6, teamId: 4, name: 'Sarah Li', role: 'employee' },
    { id: 7, teamId: 3, name: 'David Wilson', role: 'employee' },
    { id: 8, teamId: 4, name: 'Laura Garcia', role: 'manager' },
    { id: 9, teamId: 1, name: 'James Martinez', role: 'hr' },
    { id: 10, teamId: 2, name: 'Linda Rodriguez', role: 'lead' }
]

const recognitions = [
    { authorId: 1, recipientId: 2, visibility: 'public', message: 'Great job on the project!', time: '2023-10-01T10:00:00Z' },
    { authorId: 3, recipientId: 1, visibility: 'private', message: 'Excellent teamwork!', time: '2023-10-02T11:00:00Z' },
    { authorId: 4, recipientId: 5, visibility: 'public', message: 'Outstanding leadership!', time: '2023-10-03T12:00:00Z' },
    { authorId: 2, recipientId: 6, visibility: 'anomynous', message: 'Well done on the presentation!', time: '2023-10-04T13:00:00Z' },
    { authorId: 5, recipientId: 7, visibility: 'private', message: 'Great effort in the last sprint!', time: '2023-10-05T14:00:00Z' },
    { authorId: 6, recipientId: 8, visibility: 'public', message: 'Impressive results!', time: '2023-10-06T15:00:00Z' }
]

export default { employees, recognitions };