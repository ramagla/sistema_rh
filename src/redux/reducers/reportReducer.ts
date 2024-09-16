const initialState = {
  ok: ['Relatório 1', 'Relatório 2'],
  errors: ['Erro 1', 'Erro 2'],
};

const reportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reportReducer;
