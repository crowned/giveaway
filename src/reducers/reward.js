export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_REWARD_PENDING':
      return state;
    case 'FETCH_REWARD_FULFILLED':
      return {
        ...state,
        energy: payload,
      }
    default:
      return state;
  }
}