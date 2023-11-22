import http from "../http";

export const getNotification = (name) => {
  return http.get(`/social-proof-campaign/get-notification/${name}`)
}