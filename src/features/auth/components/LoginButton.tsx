import {login} from "@/features/auth/hooks/authHooks"

export function LoginButton() {
    return <button type='submit' onClick={login}>ログイン</button>;
}