import { test, expect } from "@playwright/test";

test("deve autenticar um usuário com credenciais válidas", async ({ request }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  expect(email, "Configure TEST_USER_EMAIL").toBeTruthy();
  expect(password, "Configure TEST_USER_PASSWORD").toBeTruthy();

  const response = await request.post("/api/auth/login", {
    data: { email, password },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("token");
  expect(typeof body.token).toBe("string");
  expect(body.token.length).toBeGreaterThan(0);
});

test("deve rejeitar credenciais inválidas", async ({ request }) => {
  const response = await request.post("/api/auth/login", {
    data: {
      email: "usuario-inexistente@example.com",
      password: "senha-incorreta",
    },
  });

  expect([400, 401, 403]).toContain(response.status());
});