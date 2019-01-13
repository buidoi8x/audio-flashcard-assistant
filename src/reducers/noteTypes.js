// @flow

const initialState: NoteTypesState = {
  byId: {},
  allIds: [],
}

const noteTypes: Reducer<NoteTypesState> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE_TYPE':
      return {
        byId: {
          ...state.byId,
          [action.noteType.id]: action.noteType,
        },
        allIds: [...state.allIds, action.noteType.id],
      }

    case 'EDIT_NOTE_TYPE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...action.override,
          },
        },
      }

    case 'DELETE_NOTE_TYPE': {
      const byId = { ...state.byId }
      delete byId[action.id]
      return {
        byId,
        allIds: state.allIds.filter(id => id !== action.id),
      }
    }

    default:
      return state
  }
}

export default noteTypes