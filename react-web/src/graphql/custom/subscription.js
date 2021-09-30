const syncItems = /* GraphQL */ `
  subscription syncItems($listID: ID!) {
    syncItems(listID: $listID) {
      id
      name
      status
      quantity
      listID
    }
  }
`;

export { syncItems };
