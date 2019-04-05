import { map, flatMap, takeUntil, takeLast } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { fromEvent, from, of, merge, empty } from 'rxjs'
import * as r from '../redux'
import { toWaveformX } from '../utils/waveformCoordinates'

const stretchClipEpic = (action$, state$) => {
  const clipMousedowns = action$.pipe(
    ofType('WAVEFORM_MOUSEDOWN'),
    flatMap(({ x }) => {
      const edge = r.getClipEdgeAt(state$.value, x)
      return edge ? of({ x, edge }) : empty()
    }),
    flatMap(mousedownData => {
      const {
        edge: { key, id },
      } = mousedownData
      const pendingStretches = fromEvent(window, 'mousemove').pipe(
        takeUntil(fromEvent(window, 'mouseup')),
        map(mousemove =>
          r.setPendingStretch({
            id,
            // start: mousedownData.x,
            originKey: key,
            end: toWaveformX(
              mousemove,
              document.getElementById('waveform-svg'),
              r.getWaveformViewBoxXMin(state$.value)
            ),
          })
        )
      )

      return merge(
        pendingStretches,
        pendingStretches.pipe(
          takeLast(1),
          flatMap(lastPendingStretch => {
            const {
              stretch: { id, originKey, end },
            } = lastPendingStretch
            const stretchedClip = r.getClip(state$.value, id)

            // if pendingStretch.end is inside a clip separate from stretchedClip,
            // take the start from the earlier and the end from the later,
            // use those as the new start/end of stretchedClip,
            // and delete the separate clip.

            const previousClipId = r.getPreviousClipId(state$.value, id)
            const previousClip = r.getClip(state$.value, previousClipId)
            if (previousClip && end <= previousClip.end) {
              return from([
                r.mergeClips([id, previousClipId]),
                r.setPendingStretch(null),
              ])
            }

            const nextClipId = r.getNextClipId(state$.value, id)
            const nextClip = r.getClip(state$.value, nextClipId)
            if (nextClip && end >= nextClip.start) {
              return from([
                r.mergeClips([id, nextClipId]),
                r.setPendingStretch(null),
              ])
            }

            if (originKey === 'start' && stretchedClip.end > end) {
              return from([
                r.editClip(id, {
                  start: Math.min(end, stretchedClip.end - r.CLIP_THRESHOLD),
                }),
                r.setPendingStretch(null),
              ])
            }

            if (originKey === 'end' && end > stretchedClip.start) {
              return from([
                r.editClip(id, {
                  end: Math.max(end, stretchedClip.start + r.CLIP_THRESHOLD),
                }),
                r.setPendingStretch(null),
              ])
            }

            return of(r.setPendingStretch(null))
          })
        )
      )
    })
  )
  return clipMousedowns
}

export default stretchClipEpic