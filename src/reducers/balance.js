export default function(state = '', action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_BALANCE_FULFILLED':
      return payload;
    default:
      return state;
  }
}
