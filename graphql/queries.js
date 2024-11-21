/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listFoodOrderByGroupId = /* GraphQL */ `
  query ListFoodOrderByGroupId($groupId: String!) {
    listFoodOrderByGroupId(groupId: $groupId) {
      id
      userName
      userEmail
      userPhone
      tableGuid
      tableName
      diningOptionGuid
      diningOptionName
      orderTime
      orderSubmitted
      orderGuid
      checkGuid
      groupId
      inviteAccepted
      singlePayee
      readyToSubmit
      selections {
        id
        foodOrderId
        itemGuid
        itemGroupGuid
        name
        price
        quantity
        modifiers
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      name
      phone
      email
      points
      createdAt
      updatedAt
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        email
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      orderId
      userId
      source
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        orderId
        userId
        source
        points
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPoint = /* GraphQL */ `
  query GetPoint($id: ID!) {
    getPoint(id: $id) {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const listPoints = /* GraphQL */ `
  query ListPoints(
    $filter: ModelPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        points
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSelection = /* GraphQL */ `
  query GetSelection($id: ID!) {
    getSelection(id: $id) {
      id
      foodOrderId
      itemGuid
      itemGroupGuid
      name
      price
      quantity
      modifiers
      createdAt
      updatedAt
    }
  }
`;
export const listSelections = /* GraphQL */ `
  query ListSelections(
    $filter: ModelSelectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSelections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        foodOrderId
        itemGuid
        itemGroupGuid
        name
        price
        quantity
        modifiers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getModifier = /* GraphQL */ `
  query GetModifier($id: ID!) {
    getModifier(id: $id) {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const listModifiers = /* GraphQL */ `
  query ListModifiers(
    $filter: ModelModifierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModifiers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        selectionId
        modifierGuid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodOrder = /* GraphQL */ `
  query GetFoodOrder($id: ID!) {
    getFoodOrder(id: $id) {
      id
      userName
      userEmail
      userPhone
      tableGuid
      tableName
      diningOptionGuid
      diningOptionName
      orderTime
      orderSubmitted
      orderGuid
      checkGuid
      groupId
      inviteAccepted
      singlePayee
      readyToSubmit
      selections {
        id
        foodOrderId
        itemGuid
        itemGroupGuid
        name
        price
        quantity
        modifiers
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFoodOrders = /* GraphQL */ `
  query ListFoodOrders(
    $filter: ModelFoodOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        userEmail
        userPhone
        tableGuid
        tableName
        diningOptionGuid
        diningOptionName
        orderTime
        orderSubmitted
        orderGuid
        checkGuid
        groupId
        inviteAccepted
        singlePayee
        readyToSubmit
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
