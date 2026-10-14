import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_API_URL}/api/users/register`, () => {
    return HttpResponse.json({
      registered: true
    })
  }),

  http.post(`${import.meta.env.VITE_API_URL}/api/users/login`, () => {
    return HttpResponse.json({
      success: true,
      login: true,
      message: "Login Successful!",
      email: "example@email.com",
      userId: 1
    })
  })
]