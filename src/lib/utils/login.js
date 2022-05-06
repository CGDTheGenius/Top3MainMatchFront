export default () => {
  const username = new URL(document.location).searchParams.get('username')
  const password = new URL(document.location).searchParams.get('password')

  if (!username || !password) {
    alert('Invalid User')
    return
  }

  const credentials = 'Basic ' + btoa(username + ':' + password)
  sessionStorage['credentials'] = credentials
}
