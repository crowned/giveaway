const initialState = {
  winners: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_WINNERS_FULFILLED':
      let winners = []

      if (payload) {
        winners = payload.reverse();
      }

      return {
        ...state,
        winners: [
          ...winners
        ],
        isLoading: false,
      }
    default:
      return state;
  }
}
