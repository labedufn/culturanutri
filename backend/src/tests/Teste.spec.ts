import { User } from "@models/Usuario";

test("Teste", () => {
  const user = new User();

  user.name = "Teste";

  expect(user.name).toBe("Teste");
});
