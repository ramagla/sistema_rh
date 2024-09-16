const initialState = {
  sent: false,
};

const sendReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SEND_EMAILS':
      return {
        ...state,
        sent: true,
      };
    default:
      return state;
  }
};

export default sendReducer;
