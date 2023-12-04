import http from "../http";

export const getNotification = (name) => {
  return http.get(`/social-proof-campaign/get-notification/${name}`)
}

export const sendWebsiteData = (data) => {
  return http.post(`/social-pixel-setup/set-pixel-data`, data)
}