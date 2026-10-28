import { describe, expect, test } from "vitest";
import { loginUser } from "./Login";
import { server } from "../mocks/setup";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("login", () => {
  test("logs a user in", async () => {
    const response = await loginUser("example@email.com", "password1");

    expect(response).toEqual({ 
      success: true,
      login: true,
      message: "Login Successful!",
      email: "example@email.com",
      userId: 1 
    });
  })

  test("throws error if password is less than 8 characters", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/api/users/register`, () => {
        return HttpResponse.json(
          { message: "Password must be at least 8 characters" },
          { status: 400 }
        )
      })
    )

    await expect(loginUser("example@email", "p"))
    .rejects.toThrow("Password must be at least 8 characters");
  })

  test("throws error if password is more than 50 characters", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/api/users/register`, () => {
        return HttpResponse.json(
          { message: "Password cannot exceed 50 characters" },
          { status: 400 }
        )
      })
    )

    await expect(loginUser("example@email", "password50password50password50password50password50"))
    .rejects.toThrow("Password cannot exceed 50 characters");
  })

  test("throws error if no email or password is provided", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/api/users/login`, () => {
        return HttpResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        )
      })
    )   

    await expect(loginUser("", ""))
    .rejects.toThrow("Email and password are required")
  })

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    history: createMemoryHistory({
      initialEntries: ["/login"],
    }),
  });

  test("shows error if password is less than 8 characters", async () => {
    const user = userEvent.setup();

    await router.load();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await user.type(screen.getByLabelText("Password"), "p");
    expect(screen.getByText("Password must be at least 8 characters"));
  })
})