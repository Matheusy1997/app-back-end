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
    if (!password || typeof password !== "string") {
      throw new Error("A senha é obrigatória.");
    }
    // Regex para validar a força da senha
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
    }
  },
};
