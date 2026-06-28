import { useState } from "react";
import { Sparkles, Mail, Lock, User } from "lucide-react";
import { C } from "../theme";
import { useAuth } from "../lib/useAuth";
import { isConfigured } from "../lib/supabase";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // { type: "error" | "success", text }

  const isSignup = mode === "signup";

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setMsg(null);

    if (!email.trim() || !password) {
      setMsg({ type: "error", text: "Preencha e-mail e senha." });
      return;
    }
    if (isSignup && password.length < 6) {
      setMsg({ type: "error", text: "A senha precisa ter pelo menos 6 caracteres." });
      return;
    }

    setBusy(true);
    const error = isSignup
      ? await signUp(email.trim(), password, name.trim())
      : await signIn(email.trim(), password);
    setBusy(false);

    if (error) {
      setMsg({ type: "error", text: traduzErro(error.message) });
    } else if (isSignup) {
      setMsg({ type: "success", text: "Conta criada! Se pedirem confirmação, verifique seu e-mail. Depois é só entrar." });
      setMode("login");
      setPassword("");
    }
  };

  const inputWrap = { display: "flex", alignItems: "center", gap: 10, background: "rgba(43,22,13,0.05)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" };
  const input = { flex: 1, border: "none", background: "none", outline: "none", fontSize: 15, color: C.text, fontFamily: "inherit" };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Marca */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: C.dark, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14, boxShadow: C.sh2 }}>
            <Sparkles size={28} color={C.gold} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>Mesa de Produção</div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>
            {isSignup ? "Crie sua conta para começar" : "Bem-vinda de volta 👋"}
          </div>
        </div>

        {!isConfigured && (
          <div style={{ background: "#FFF3D8", color: "#8B6000", borderRadius: 12, padding: "12px 14px", fontSize: 13, marginBottom: 16, lineHeight: 1.4 }}>
            ⚠️ As chaves do Supabase ainda não foram configuradas. Preencha o arquivo <b>.env</b> (local) ou as variáveis de ambiente no Netlify.
          </div>
        )}

        {/* Card do formulário */}
        <form onSubmit={submit} style={{ background: C.card, borderRadius: 20, padding: 24, boxShadow: C.sh2, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 14 }}>
          {isSignup && (
            <div style={inputWrap}>
              <User size={18} color={C.muted} />
              <input style={input} placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div style={inputWrap}>
            <Mail size={18} color={C.muted} />
            <input style={input} type="email" placeholder="E-mail" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={inputWrap}>
            <Lock size={18} color={C.muted} />
            <input style={input} type="password" placeholder="Senha" autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {msg && (
            <div style={{
              fontSize: 13, lineHeight: 1.4, borderRadius: 10, padding: "10px 12px",
              background: msg.type === "error" ? "#FBE3DA" : "#D8EDE0",
              color: msg.type === "error" ? "#9A2B0E" : "#1E5C38",
            }}>{msg.text}</div>
          )}

          <button type="submit" disabled={busy} style={{ background: C.dark, border: "none", borderRadius: 14, padding: "14px", cursor: "pointer", color: "#FBF6EC", fontWeight: 700, fontSize: 15, marginTop: 4, opacity: busy ? 0.6 : 1 }}>
            {busy ? "Aguarde…" : isSignup ? "Criar conta" : "Entrar"}
          </button>
        </form>

        {/* Alternar login/cadastro */}
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 14, color: C.muted }}>
          {isSignup ? "Já tem conta? " : "Ainda não tem conta? "}
          <button onClick={() => { setMode(isSignup ? "login" : "signup"); setMsg(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.accent, fontWeight: 600, fontSize: 14 }}>
            {isSignup ? "Entrar" : "Cadastre-se"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Traduz as mensagens de erro mais comuns do Supabase para português
function traduzErro(m = "") {
  if (/Invalid login credentials/i.test(m)) return "E-mail ou senha incorretos.";
  if (/already registered|already exists/i.test(m)) return "Esse e-mail já está cadastrado. Faça login.";
  if (/Email not confirmed/i.test(m)) return "Confirme seu e-mail antes de entrar (verifique a caixa de entrada).";
  if (/rate limit|too many/i.test(m)) return "Muitas tentativas. Espere um pouco e tente de novo.";
  return m || "Algo deu errado. Tente novamente.";
}
