const syncItems = /* GraphQL */ `
  subscription syncItems($listID: ID!) {
    syncItems(listID: $listID) {
      id
      name
      quantity
      listID
    }
  }
`;

export { syncItems };
