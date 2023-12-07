
export const filterActiveNotifications = (notificationArray, currentUrl) => {
  // check whether param is an array or not.
  if (!Array.isArray(notificationArray) || notificationArray?.length < 1)
    return null

  const filteredArr = notificationArray.filter((_n) => _n.status.toLowerCase() === 'active' && _n.socialUrls.length > 0);

  const matchedNotification = filteredArr?.reduce((accumulator, n) => {
    const urls = n.socialUrls
    const res = urls.find((_u) => _u.url === currentUrl);
    if (res) {
      return n
    }
    return accumulator
  }, null)

  return matchedNotification;
}

// export const filterActiveNotifications = (notificationArray, currentUrl) => {
//   // check whether param is an array or not.
//   if (!Array.isArray(notificationArray) || notificationArray?.length < 1)
//     return null

//   const filteredArr = notificationArray.filter((_n) => _n.status.toLowerCase() === 'active' && _n.socialUrls.length > 0);

//   const matchedNotification = filteredArr?.reduce((accumulator, n) => {
//     const urls = n.socialUrls
//     const res = urls.find((_u) => _u.url === 'http://localhost:3001/organizations');
//     if (res) {
//       return n
//     }
//     return accumulator
//   }, null)

//   return matchedNotification;
// }

export const getLatLng = (pos) => {
  if (!!pos) {
    const posArr = pos.split("+");
    let posObj = {
      lat: Number(posArr[0]),
      lng: Number(posArr[1])
    }
    return posObj
  }
  return null
}