export default function(state = '', action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_ENERGY_FULFILLED':
      return payload;
    default:
      return state;
  }
}