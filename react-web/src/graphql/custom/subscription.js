const syncItems = /* GraphQL */ `
  subscription syncItems($listID: ID!) {
    syncItems(listID: $listID) {
      id
      name
      quantity
      status
      listID
    }
  }
`;

export { syncItems };
