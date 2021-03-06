export const ADD = 'snackbars/ADD'
export const REMOVE = 'snackbars/REMOVE'

export const createActionAdd = (message) => ({
  type: ADD,
  payload: { message }
})
export const createActionRemove = (snackbarId) => ({
  type: REMOVE,
  payload: { snackbarId }
})

export const createAsyncActionAdd = (message) => async (dispatch, getState) => {
  const state = getState()
  const snackbarsState = state.snackbars
  const { newSnackbarId } = snackbarsState
  dispatch(createActionAdd(message))
  setTimeout(() => {
    dispatch(createActionRemove(newSnackbarId))
  }, 3000)
}

const initialState = {
  newSnackbarId: 0,
  openSnacbars: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        newSnackbarId: state.newSnackbarId + 1,
        openSnacbars: state.openSnacbars.concat({
          id: state.newSnackbarId,
          message: action.payload.message
        })
      }
    case REMOVE:
      return {
        ...state,
        openSnacbars: state.openSnacbars.filter((snackbar) => {
          return snackbar.id !== action.payload.snackbarId
        })
      }
    default:
      return state
  }
}

export default reducer
