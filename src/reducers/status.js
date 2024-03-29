const initialState = {
  numSpots: 0,
  availSpots: 0,
  spotCost: 0,
  status: false,
  giveawayStatus: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_STATUS_FULFILLED':
      return {
        ...state,
        numSpots: payload[0] || 0,
        availSpots: payload[1] || 0,
        spotCost: payload[2] || 0,
        canReserve: payload[3] || false,
        giveawayStatus: payload[4] || false,
      }
    default:
      return state;
  }
}
