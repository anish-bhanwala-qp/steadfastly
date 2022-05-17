export const gapiCreateFile = async (
  filename: string,
  folderId: string,
  content: string,
  accessToken: string,
  mimeType: string = 'text/plain',
): Promise<{id: string}> => {
  const file = new Blob([content], {type: mimeType})
  const metadata = {
    name: filename,
    mimeType: 'text/plain',
    parents: [folderId],
  }

  const form = new FormData()
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], {type: 'application/json'}),
  )
  form.append('file', file)

  return await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    },
  ).then(response => response.json())
}

export const gapiUpdateFile = async (
  fileId: string,
  content: string,
  accessToken: string,
  mimeType: string = 'text/plain',
): Promise<{id: string}> => {
  return await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: content,
    },
  ).then(response => response.json())
}

export const gapiCreateFolder = async (
  accessToken: string,
  folderName: string,
): Promise<{
  id: string
  kind: 'drive#file'
  mimeType: 'application/vnd.google-apps.folder'
  name: string
}> => {
  const metadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  }

  return await fetch(
    'https://www.googleapis.com/drive/v3/files?supportsAllDrives=true',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    },
  ).then(response => response.json())
}
