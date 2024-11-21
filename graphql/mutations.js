/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteSelectionsById = /* GraphQL */ `
  mutation DeleteSelectionsById($ids: [ID]) {
    deleteSelectionsById(ids: $ids) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createPoint = /* GraphQL */ `
  mutation CreatePoint(
    $input: CreatePointInput!
    $condition: ModelPointConditionInput
  ) {
    createPoint(input: $input, condition: $condition) {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const updatePoint = /* GraphQL */ `
  mutation UpdatePoint(
    $input: UpdatePointInput!
    $condition: ModelPointConditionInput
  ) {
    updatePoint(input: $input, condition: $condition) {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const deletePoint = /* GraphQL */ `
  mutation DeletePoint(
    $input: DeletePointInput!
    $condition: ModelPointConditionInput
  ) {
    deletePoint(input: $input, condition: $condition) {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const createSelection = /* GraphQL */ `
  mutation CreateSelection(
    $input: CreateSelectionInput!
    $condition: ModelSelectionConditionInput
  ) {
    createSelection(input: $input, condition: $condition) {
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
export const updateSelection = /* GraphQL */ `
  mutation UpdateSelection(
    $input: UpdateSelectionInput!
    $condition: ModelSelectionConditionInput
  ) {
    updateSelection(input: $input, condition: $condition) {
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
export const deleteSelection = /* GraphQL */ `
  mutation DeleteSelection(
    $input: DeleteSelectionInput!
    $condition: ModelSelectionConditionInput
  ) {
    deleteSelection(input: $input, condition: $condition) {
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
export const createModifier = /* GraphQL */ `
  mutation CreateModifier(
    $input: CreateModifierInput!
    $condition: ModelModifierConditionInput
  ) {
    createModifier(input: $input, condition: $condition) {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const updateModifier = /* GraphQL */ `
  mutation UpdateModifier(
    $input: UpdateModifierInput!
    $condition: ModelModifierConditionInput
  ) {
    updateModifier(input: $input, condition: $condition) {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const deleteModifier = /* GraphQL */ `
  mutation DeleteModifier(
    $input: DeleteModifierInput!
    $condition: ModelModifierConditionInput
  ) {
    deleteModifier(input: $input, condition: $condition) {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const createFoodOrder = /* GraphQL */ `
  mutation CreateFoodOrder(
    $input: CreateFoodOrderInput!
    $condition: ModelFoodOrderConditionInput
  ) {
    createFoodOrder(input: $input, condition: $condition) {
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
export const updateFoodOrder = /* GraphQL */ `
  mutation UpdateFoodOrder(
    $input: UpdateFoodOrderInput!
    $condition: ModelFoodOrderConditionInput
  ) {
    updateFoodOrder(input: $input, condition: $condition) {
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
export const deleteFoodOrder = /* GraphQL */ `
  mutation DeleteFoodOrder(
    $input: DeleteFoodOrderInput!
    $condition: ModelFoodOrderConditionInput
  ) {
    deleteFoodOrder(input: $input, condition: $condition) {
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
