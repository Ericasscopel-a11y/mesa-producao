/* ── Paleta e constantes visuais ───────────────────────────────── */
export const C = {
  bg: "#F5EFE8", card: "#FDFBF7", dark: "#3D2315", accent: "#A56A2E",
  gold: "#C8A43A", text: "#2B160D", muted: "#9B8070",
  border: "rgba(43,22,13,0.10)", sh: "0 2px 12px rgba(43,22,13,0.08)",
  sh2: "0 8px 24px rgba(43,22,13,0.13)",
  serif: '"Fraunces", Georgia, serif',
};

/* Etapas de produção de um conteúdo (checklist).
   Marcar etapas atualiza o status automaticamente. */
export const STAGES = [
  { key: "roteiro",  label: "Roteiro pronto" },
  { key: "gravacao", label: "Gravado" },
  { key: "edicao",   label: "Editado" },
  { key: "agendado", label: "Agendado" },
  { key: "postado",  label: "Postado" },
];

// Converte o checklist de etapas no status do conteúdo
export function statusFromStages(stages) {
  const done = (stages || []).filter(Boolean).length;
  if (done >= 5) return "postado";
  if (done === 4) return "agendado";
  if (done >= 2) return "em-producao";
  if (done === 1) return "roteiro-pronto";
  return "ideia";
}

export const ST = {
  "em-producao":    { bg: "#F5E8D8", tc: "#7A3D10", label: "Em produção" },
  "agendado":       { bg: "#D8EDE0", tc: "#1E5C38", label: "Agendado" },
  "roteiro-pronto": { bg: "#E8DFFE", tc: "#3D2B7A", label: "Roteiro pronto" },
  "ideia":          { bg: "#FFF3D8", tc: "#8B6000", label: "Ideia" },
  "postado":        { bg: "#DCEEFF", tc: "#0A4280", label: "Postado" },
};

export const PL = {
  instagram: { abbr: "IG", color: "#C13584", label: "Instagram" },
  tiktok:    { abbr: "TK", color: "#111111", label: "TikTok" },
  youtube:   { abbr: "YT", color: "#CC0000", label: "YouTube" },
};

export const THUMB = {
  instagram: "#E8D0BC", tiktok: "#C8CCDC", youtube: "#E4C4BC",
};

export const IDEAS = [
  "Vlog: um dia produtivo trabalhando de casa",
  "Por que minha audiência não converte?",
  "Bastidores da criação de conteúdo com IA",
];

export const WEEK = [
  {s:"SEG",n:20},{s:"TER",n:21,today:true},{s:"QUA",n:22},
  {s:"QUI",n:23},{s:"SEX",n:24},{s:"SÁB",n:25},{s:"DOM",n:26},
];

export const TIMES = ["09:00","12:00","15:00","18:00","21:00"];

/* Conteúdos de exemplo — usados só quando a nutri clica em "carregar exemplos" */
export const SEED = [
  { title:"3 dicas para ser mais produtiva todos os dias", platform:"instagram", type:"Reels", status:"em-producao", date:"20 MAI", dayNum:20, timeSlot:0, pilar:"Produtividade", steps:2, total:5 },
  { title:"Minha rotina matinal passo a passo", platform:"tiktok", type:"Vídeo", status:"agendado", date:"21 MAI", dayNum:21, timeSlot:1, pilar:"Rotina", steps:4, total:5 },
  { title:"Como planejo meu conteúdo do mês", platform:"youtube", type:"Vídeo", status:"roteiro-pronto", date:"23 MAI", dayNum:23, timeSlot:2, pilar:"Planejamento", steps:3, total:5 },
];
