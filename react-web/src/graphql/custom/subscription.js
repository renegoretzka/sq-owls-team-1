const syncItems = /* GraphQL */ `
  subscription syncItems($listID: ID!) {
    syncItems(listID: $listID) {
      id
      name
      status
      quantity
      status
      listID
    }
  }
`;

export { syncItems };
