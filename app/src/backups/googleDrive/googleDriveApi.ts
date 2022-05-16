export const gapiCreateFile = async (
  filename: string,
  content: string,
  accessToken: string,
): Promise<void> => {
  const file = new Blob([content], {type: 'text/plain'})
  const metadata = {
    name: filename,
    mimeType: 'text/plain',
    // parents: ["folder id or 'root'"], // Google Drive folder id
  }

  const form = new FormData()
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], {type: 'application/json'}),
  )
  form.append('file', file)

  await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    },
  )
    .then(response => response.json())
    .then(console.log)
}
