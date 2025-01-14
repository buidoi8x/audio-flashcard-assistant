export const enqueueDialog = (
  dialog: DialogData,
  skipQueue: boolean = false
): EnqueueDialog => ({
  type: A.ENQUEUE_DIALOG,
  dialog,
  skipQueue,
})

export const confirmationDialog = (message: string, action: Action) =>
  enqueueDialog({
    type: 'Confirmation',
    props: { message, action },
  })

export const editNoteTypeDialog = (noteTypeId: NoteTypeId): DialogAction =>
  enqueueDialog({
    type: 'NoteTypeForm',
    props: { noteTypeId },
  })

export const newNoteTypeDialog = (): DialogAction =>
  enqueueDialog({
    type: 'NoteTypeForm',
    props: { noteTypeId: null },
  })

export const mediaFolderLocationFormDialog = (
  action: Action | null,
  skipQueue: boolean
): DialogAction =>
  enqueueDialog(
    {
      type: 'MediaFolderLocationForm',
      props: { action },
    },
    skipQueue
  )

export const reviewAndExportDialog = () =>
  enqueueDialog({
    type: 'ReviewAndExport',
  })

export const newProjectFormDialog = () =>
  enqueueDialog({ type: 'NewProjectForm' })

export const openMediaFileFailureDialog = (message: string): DialogAction =>
  enqueueDialog({ type: 'OpenMediaFileFailure', props: { message } })

export const closeDialog = (): DialogAction => ({
  type: A.CLOSE_DIALOG,
})

export const csvAndMp3ExportDialog = (clipIds: Array<ClipId>): DialogAction =>
  enqueueDialog({ type: 'CsvAndMp3Export', props: { clipIds } }, true)

export const subtitlesClipDialog = (): DialogAction =>
  enqueueDialog({ type: 'SubtitlesClips' })
