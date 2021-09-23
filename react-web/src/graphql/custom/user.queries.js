const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      memberships {
        items {
          list {
            id
            name
            users {
              items {
                user {
                  id
                  name
                }
              }
            }
            items {
              items {
                name
                quantity
                id
                updatedAt
              }
            }
          }
        }
      }
    }
  }
`;

export { getUser };
