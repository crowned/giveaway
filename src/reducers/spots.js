export default function(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case 'RESERVE_SPOT_FULFILLED':
      return {
        ...state,
        payload,
        spotReserved: true,
      }
    default:
      return state;
  }
}
