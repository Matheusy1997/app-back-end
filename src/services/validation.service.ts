export const ValidationService = {
  validateEmail: (email: string): void => {
    if (!email || typeof email !== "string") {
      throw new Error("O email é obrigatório.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Formato de email inválido.");
    }
  },
  validatePassword: (password: string): void => {
    if (!password || typeof password !== 'string') {
      throw new Error("A senha é obrigatória.");
    }
    // Exemplo: exigir no mínimo 8 caracteres
    if (password.length < 8) {
      throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }
  }
};
