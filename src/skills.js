import { Users, BookOpen, Wand2 } from "lucide-react";

// Importa o conteúdo bruto dos arquivos .md (Vite: ?raw vira string)
import personaRaw from "./skills/persona-nutri-builder.md?raw";
import linhaRaw from "./skills/linha-editorial-nutri.md?raw";
import modelaRaw from "./skills/modela-conteudo-nutri.md?raw";

// Separa o frontmatter (--- ... ---) do corpo do markdown
function parse(raw) {
  const m = String(raw).match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { body: String(raw).trim() };
  return { body: m[2].trim() };
}

// As orientações ("Quando usar") são escritas para a nutri — diretas e práticas.
export const SKILLS = [
  {
    id: "persona",
    icon: Users,
    step: 1,
    title: "Persona Nutri Builder",
    subtitle: "Descubra com quem você fala",
    when: "Comece por aqui. Responde 2 perguntas (seu nicho + os problemas que você resolve) e a skill monta sua cliente ideal completa: medos, dores, desejos, sonhos e os 5 níveis de consciência. Tudo o que você criar depois nasce desta base.",
    body: parse(personaRaw).body,
    raw: personaRaw,
  },
  {
    id: "linha-editorial",
    icon: BookOpen,
    step: 2,
    title: "Linha Editorial Nutri",
    subtitle: "Defina sobre o que postar",
    when: "Use depois da persona. Junta a persona + seus temas (profissionais e pessoais) e cria seus pilares de conteúdo equilibrados e um calendário mensal. É o seu mapa de 'sobre o que falar' no Instagram — pra nunca mais travar.",
    body: parse(linhaRaw).body,
    raw: linhaRaw,
  },
  {
    id: "modela-conteudo",
    icon: Wand2,
    step: 3,
    title: "Modela Conteúdo Nutri",
    subtitle: "Transforme referências em conteúdo seu",
    when: "Use no dia a dia. Viu um post, reels ou carrossel que gostou? Manda o print ou o texto e a skill recria a MESMA estrutura com a sua voz e o seu nicho — sem copiar palavras. Funciona melhor com a persona e a linha editorial já prontas.",
    body: parse(modelaRaw).body,
    raw: modelaRaw,
  },
];
