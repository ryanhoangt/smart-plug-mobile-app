export const isActionPending = (action) => action.type.endsWith('/pending')
export const isActionRejected = (action) => action.type.endsWith('/rejected')
