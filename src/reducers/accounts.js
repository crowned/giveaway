const initialState = {
  isLoading: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_ACCOUNTS_PENDING':
      return {
        ...state,
      }
    case 'GET_ACCOUNTS_FULFILLED':
      return {
        ...state,
        accountChanged: true,
        accounts: payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
