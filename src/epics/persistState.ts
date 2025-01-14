import { ignoreElements, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { AppEpic } from '../types/AppEpic'

const persistStateEpic: AppEpic = (action$, state$, { setLocalStorage }) =>
  action$.pipe(
    ofType(
      A.OPEN_PROJECT,
      A.ADD_MEDIA_TO_PROJECT,
      A.DELETE_MEDIA_FROM_PROJECT,
      A.OPEN_MEDIA_FILE_SUCCESS,
      A.LOCATE_MEDIA_FILE_SUCCESS,
      A.SET_MEDIA_FOLDER_LOCATION
    ),
    tap(() => {
      setLocalStorage('projects', JSON.stringify(state$.value.projects))
      setLocalStorage('audio', JSON.stringify(state$.value.audio))
    }),
    ignoreElements()
  )

export default persistStateEpic
