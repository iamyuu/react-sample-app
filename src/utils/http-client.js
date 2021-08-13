const API_URL = import.meta.env.VITE_API_URL

export default function client(endpoint, {data, headers: customHeaders, ...customConfig} = {}) {
  const {signal, abort} = new AbortController()

  const config = {
    signal,
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  const fetcher = window.fetch(`${API_URL}${endpoint}`, config).then(async response => {
    const responseJson = await response.json()
    return response.ok ? responseJson.data : Promise.reject(responseJson)
  })

  return Object.assign(fetcher, {cancel: abort})
}
