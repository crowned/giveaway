const initialState = {
  participants: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_PARTICIPANTS_FULFILLED':
      return {
        ...state,
        participants: [
          ...payload
        ],
        isLoading: false,
      }
    default:
      return state;
  }
}
