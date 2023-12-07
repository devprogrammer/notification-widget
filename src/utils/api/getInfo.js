import http from "../http";

export const getNotification = (pixelId) => {
  return http.get(`/social-proof-campaign/get-notification/${pixelId}`)
}

export const sendWebsiteData = (data) => {
  return http.post(`/social-pixel-setup/set-pixel-data`, data)
}