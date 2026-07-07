/* Central de novidades do app.
   Para anunciar uma atualização: adicione um novo objeto NO TOPO da lista,
   com um id único (use a data). O aviso aparece 1x para cada usuária. */

export const UPDATES = [
  {
    id: "2026-07-03",
    date: "3 de julho de 2026",
    title: "O app ficou muito mais completo ✨",
    items: [
      { emoji: "📝", text: "Página do conteúdo estilo Notion: escreva o roteiro, formate (negrito, grifo, listas) e insira imagens — com salvamento automático." },
      { emoji: "✅", text: "Etapas de produção clicáveis (Roteiro → Gravado → Editado → Agendado → Postado) que atualizam o status sozinhas." },
      { emoji: "📅", text: "Calendário novo: seus conteúdos aparecem nos dias, com agenda do dia e criação direto na data." },
      { emoji: "📌", text: "Pipeline Kanban em Conteúdos: arraste os cards entre os status." },
      { emoji: "💡", text: "Banco de ideias na Início: anote, favorite e transforme ideia em conteúdo com 1 toque." },
      { emoji: "📊", text: "Análises repaginadas: views, saves, follows, DMs com gráficos e o Top 5 Heaters." },
    ],
  },
];

export const LATEST_UPDATE = UPDATES[0];
