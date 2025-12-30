import { loginService } from "@/features/auth/services/authService";

export const login = (e: React.FormEvent<Element>) => {
    loginService(e)
}