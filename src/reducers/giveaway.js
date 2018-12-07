const initialState = {
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_CONTRACTS':
      return {
        ...state,
        Contract: payload,
        isLoading: false,
      }
    default:
      return state;
  }
}
