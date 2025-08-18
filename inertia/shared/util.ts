export const getUserAgentInfo = (userAgent: string) => {
  if (!userAgent) return 'Unknown'

  let device = 'Unknown Device'
  let browser = 'Unknown Browser'

  // Device detection
  if (userAgent.includes('iPhone')) device = 'iPhone'
  else if (userAgent.includes('iPad')) device = 'iPad'
  else if (userAgent.includes('iPod')) device = 'iPod'
  else if (userAgent.includes('Android') && userAgent.includes('Mobile')) device = 'Android Phone'
  else if (userAgent.includes('Android')) device = 'Android Tablet'
  else if (userAgent.includes('Windows Phone')) device = 'Windows Phone'
  else if (userAgent.includes('Windows NT')) device = 'Windows PC'
  else if (userAgent.includes('Macintosh')) device = 'Mac'
  else if (userAgent.includes('Linux')) device = 'Linux'

  // Browser detection
  if (userAgent.includes('FBAN') || userAgent.includes('FB_IAB')) browser = 'Facebook'
  else if (userAgent.includes('Instagram')) browser = 'Instagram'
  else if (userAgent.includes('Edge') || userAgent.includes('Edg/')) browser = 'Edge'
  else if (userAgent.includes('Chrome') && !userAgent.includes('Chromium')) browser = 'Chrome'
  else if (userAgent.includes('Firefox') && !userAgent.includes('Seamonkey')) browser = 'Firefox'
  else if (
    userAgent.includes('Safari') &&
    !userAgent.includes('Chrome') &&
    !userAgent.includes('Chromium')
  )
    browser = 'Safari'
  else if (userAgent.includes('Opera') || userAgent.includes('OPR')) browser = 'Opera'
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident/'))
    browser = 'Internet Explorer'
  else if (userAgent.includes('UCBrowser')) browser = 'UC Browser'
  else if (userAgent.includes('Samsung')) browser = 'Samsung Browser'

  return `${browser} on ${device}`
}

export const getUrlAction = (action: string) => {
  if (action === '/') return 'Home'
  if (action === '/rsvp') return 'RSVP'
  if (action === '/rsvp/view-invitation') return 'Fetched Invitation Data'
  if (action === '/rsvp/update-invitation') return 'Updated Invitation'
  return action
  //   if (action === '/login') return 'Visited Login'
  //   if (action === '/seat-inquiry') return 'Visited Seat Inquiry'
  //   if (action === '/seat-inquiry/fetch-guests') return 'Fetched Guests for Seat Inquiry'
}
