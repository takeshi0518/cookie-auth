export type Role = "USER" | "ADMIN";

export type DemoUser = {
  id: string;
  email: string;
  password: string;
  role: Role;
};

const demoUsers: DemoUser[] = [
  {
    id: "user-001",
    email: "user@example.com",
    password: "password",
    role: "USER",
  },
  {
    id: "user-002",
    email: "admin@example.com",
    password: "password",
    role: "ADMIN",
  },
];

export function findUserByCredentials(email: string, password: string) {
  return (
    demoUsers.find((u) => u.email === email && u.password === password) ?? null
  );
}

export function findByUserById(id: string) {
  return demoUsers.find((u) => u.id === id) ?? null;
}
