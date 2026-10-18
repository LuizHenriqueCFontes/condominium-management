import { test, expect } from "@playwright/test";

test("deve consultar condomínios com autenticação", async ({ request }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  expect(email, "Configure TEST_USER_EMAIL").toBeTruthy();
  expect(password, "Configure TEST_USER_PASSWORD").toBeTruthy();

  // 1. Autenticar o usuário
  const loginResponse = await request.post("/api/auth/login", {
    data: { email, password },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  expect(loginBody.token).toBeTruthy();

  // 2. Consultar os condomínios com o token
  const response = await request.get("/api/condominiums", {
    headers: {
      Authorization: `Bearer ${loginBody.token}`,
    },
  });

  // 3. Validar o status HTTP
  expect(response.status()).toBe(200);

  // 4. Validar o formato do retorno
  const body = await response.json();

  expect(Array.isArray(body)).toBe(true);

  // 5. Validar os campos dos condomínios retornados
  for (const condominium of body) {
    expect(condominium).toHaveProperty("id");
    expect(condominium).toHaveProperty("name");
    expect(condominium).toHaveProperty("cnpj");
    expect(condominium).toHaveProperty("email");
    expect(condominium).toHaveProperty("phone");
    expect(condominium).toHaveProperty("address");
    expect(condominium).toHaveProperty("status");
  }
});

test("não deve permitir consultar condomínios sem autenticação", async ({ request }) => {
  const response = await request.get("/api/condominiums");

  expect([401, 403]).toContain(response.status());
});

test("deve consultar blocos com autenticação", async ({ request }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  expect(email, "Configure TEST_USER_EMAIL").toBeTruthy();
  expect(password, "Configure TEST_USER_PASSWORD").toBeTruthy();

  const loginResponse = await request.post("/api/auth/login", {
    data: { email, password },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  expect(loginBody.token).toBeTruthy();

  const response = await request.get("/api/blocks", {
    headers: {
      Authorization: `Bearer ${loginBody.token}`,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBe(true);
});