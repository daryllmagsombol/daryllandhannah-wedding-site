const token = localStorage.getItem('token')

export const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
}
