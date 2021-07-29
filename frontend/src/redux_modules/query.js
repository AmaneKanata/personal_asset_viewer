const SET_QUERY_DATA = 'query/SET_QUERY_DATA'

const initialState = {
  querydata: {
    name: '',
  },
}

export default {
  reduce (state = initialState, action) {
    switch (action.type) {
      case SET_QUERY_DATA:
        return {
          ...state,
          queryData: action.queryData,
        }
      default:
        return state
    }
  },
  setQueryData: queryData => ({
      type: SET_QUERY_DATA,
      queryData
  })
}
