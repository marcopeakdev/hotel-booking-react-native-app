/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreatePoint = /* GraphQL */ `
  subscription OnCreatePoint {
    onCreatePoint {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePoint = /* GraphQL */ `
  subscription OnUpdatePoint {
    onUpdatePoint {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePoint = /* GraphQL */ `
  subscription OnDeletePoint {
    onDeletePoint {
      userId
      points
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSelection = /* GraphQL */ `
  subscription OnCreateSelection {
    onCreateSelection {
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
export const onUpdateSelection = /* GraphQL */ `
  subscription OnUpdateSelection {
    onUpdateSelection {
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
export const onDeleteSelection = /* GraphQL */ `
  subscription OnDeleteSelection {
    onDeleteSelection {
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
export const onCreateModifier = /* GraphQL */ `
  subscription OnCreateModifier {
    onCreateModifier {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateModifier = /* GraphQL */ `
  subscription OnUpdateModifier {
    onUpdateModifier {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteModifier = /* GraphQL */ `
  subscription OnDeleteModifier {
    onDeleteModifier {
      id
      selectionId
      modifierGuid
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFoodOrder = /* GraphQL */ `
  subscription OnCreateFoodOrder {
    onCreateFoodOrder {
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
export const onUpdateFoodOrder = /* GraphQL */ `
  subscription OnUpdateFoodOrder {
    onUpdateFoodOrder {
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
export const onDeleteFoodOrder = /* GraphQL */ `
  subscription OnDeleteFoodOrder {
    onDeleteFoodOrder {
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
