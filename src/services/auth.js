const SESSION_KEY = "sweetair.demo.session";

export function createDemoAuthService(storage = window.localStorage) {
  return {
    getSession() {
      const session = storage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    },
    async signIn({ email, role }) {
      const user = {
        id: `demo-${email.trim().toLowerCase()}`,
        name: email.trim().split("@")[0].replace(/[._-]/g, " "),
        email: email.trim().toLowerCase(),
        role,
      };
      storage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    },
    async signUp({ name, email, role }) {
      const user = {
        id: `demo-${email.trim().toLowerCase()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
      };
      storage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    },
    async signOut() {
      storage.removeItem(SESSION_KEY);
    },
  };
}
