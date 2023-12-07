
// export const filterActiveNotifications = (notificationArray, currentUrl) => {
//   // check whether param is an array or not.
//   if (!Array.isArray(notificationArray) || notificationArray?.length < 1)
//     return new Array()

//   const filteredArr = notificationArray.filter((_n) => _n.status.toLowerCase() === 'active' && _n.socialUrls.length > 0);
//   return filteredArr;
// }

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