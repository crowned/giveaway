const initialState = {
  isLoading: true,
  accounts: [],
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
        accounts: payload,
        isLoading: false,
      }
    case 'GET_ACCOUNTS_REJECTED':
      return {
        ...state,
        withErrors: true,
        errors: payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
