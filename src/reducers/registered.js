export default function(state = 0, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_REGISTERED_FULFILLED':
      return payload;
    default:
      return state;
  }
}
