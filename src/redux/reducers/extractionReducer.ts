const initialState = {
  extractedData: null,
};

const extractionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'EXTRACT_FILE':
      return {
        ...state,
        extractedData: action.payload,
      };
    default:
      return state;
  }
};

export default extractionReducer;
