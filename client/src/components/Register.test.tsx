import { describe, expect, test, vi } from "vitest";
import { server } from "../mocks/setup";
import { http, HttpResponse } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { registerUser } from "./Register";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

describe("register", () => {
  test("registers a user", async () => {
    const response = await registerUser("example@email.com", "password1");

    expect(response).toEqual({ registered: true });
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

    await expect(registerUser("example@email", "p"))
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

    await expect(registerUser("example@email", "password50password50password50password50password50"))
    .rejects.toThrow("Password cannot exceed 50 characters");
  })

  test("throws error if no email or password is provided", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/api/users/register`, () => {
        return HttpResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        )
      })
    )

    await expect(registerUser("", ""))
    .rejects.toThrow("Email and password are required");
  })

  test("throws error if user inputs a duplicate email", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_API_URL}/api/users/register`, () => {
        return HttpResponse.json(
          { message: "An account with this email already exists" },
          { status: 409 }
        )
      })
    )
    
    await expect(registerUser("existing@email.com", "password"))
    .rejects.toThrow("An account with this email already exists");
  })

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    history: createMemoryHistory({
      initialEntries: ["/register"],
    }),
  });

  test("sets error if passwords do not match", async () => {
    const user = userEvent.setup();

    await router.load();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await user.type(screen.getByLabelText("E-mail"), "example@email.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.type(screen.getByLabelText("Confirm Password"), "password2");

    await user.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Passwords do not match");
    })
  })

  test("redirects to login after successful registration", async () => {
    const user = userEvent.setup();

    await router.load();

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await user.type(screen.getByLabelText("E-mail"), "example@email.com");
    await user.type(screen.getByLabelText("Password"), "password1");
    await user.type(screen.getByLabelText("Confirm Password"), "password1");

    await user.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => 
      expect(router.state.location.pathname).toBe("/login"),
      { timeout: 4000 }
    );
  });
})