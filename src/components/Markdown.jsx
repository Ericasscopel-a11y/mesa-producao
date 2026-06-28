import { C } from "../theme";

/* Renderizador de Markdown leve e sem dependências.
   Cobre o que as skills usam: títulos, listas, checklists, tabelas,
   blocos de código, citações, linhas e negrito/código inline. */

// Inline: **negrito** e `código`
function inline(text, kb) {
  const nodes = [];
  let rest = String(text);
  let k = 0;
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`)/;
  let m;
  while ((m = rest.match(re))) {
    if (m.index > 0) nodes.push(rest.slice(0, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={`${kb}-b${k++}`} style={{ color: C.text }}>{m[2]}</strong>);
    } else {
      nodes.push(<code key={`${kb}-c${k++}`} style={{ background: "rgba(43,22,13,0.08)", borderRadius: 5, padding: "1px 5px", fontSize: "0.88em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{m[3]}</code>);
    }
    rest = rest.slice(m.index + m[0].length);
  }
  if (rest) nodes.push(rest);
  return nodes;
}

const isUl = (l) => /^\s*[-*]\s+/.test(l);
const isOl = (l) => /^\s*\d+\.\s+/.test(l);
const isQuote = (l) => /^\s*>\s?/.test(l);
const isHr = (l) => /^\s*(-{3,}|\*{3,})\s*$/.test(l);
const isHeading = (l) => /^\s*#{1,6}\s+/.test(l);
const isTableSep = (l) => /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(l) && l.includes("-");

export default function Markdown({ text }) {
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let key = 0;

  const para = { fontSize: 14, lineHeight: 1.65, color: C.text, margin: "0 0 12px" };

  while (i < lines.length) {
    let line = lines[i];

    // linha em branco
    if (!line.trim()) { i++; continue; }

    // bloco de código ```
    if (line.trim().startsWith("```")) {
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { buf.push(lines[i]); i++; }
      i++; // pula o fechamento
      out.push(
        <pre key={key++} style={{ background: "rgba(43,22,13,0.05)", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", overflowX: "auto", fontSize: 12.5, lineHeight: 1.55, color: C.text, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", margin: "0 0 14px" }}>
          {buf.join("\n")}
        </pre>
      );
      continue;
    }

    // título
    if (isHeading(line)) {
      const m = line.match(/^\s*(#{1,6})\s+(.*)$/);
      const lvl = m[1].length;
      const sizes = { 1: 21, 2: 18, 3: 15.5, 4: 14, 5: 13.5, 6: 13 };
      out.push(
        <div key={key++} style={{ fontSize: sizes[lvl] || 14, fontWeight: 700, color: C.text, lineHeight: 1.3, margin: lvl <= 2 ? "18px 0 10px" : "14px 0 7px" }}>
          {inline(m[2], `h${key}`)}
        </div>
      );
      i++; continue;
    }

    // linha horizontal
    if (isHr(line)) {
      out.push(<hr key={key++} style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "16px 0" }} />);
      i++; continue;
    }

    // tabela (linha com | seguida de separador |---|)
    if (line.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const splitRow = (l) => l.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
      const header = splitRow(line);
      i += 2; // pula cabeçalho + separador
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) { rows.push(splitRow(lines[i])); i++; }
      out.push(
        <div key={key++} style={{ overflowX: "auto", margin: "0 0 14px" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
            <thead>
              <tr>{header.map((c, j) => <th key={j} style={{ textAlign: "left", padding: "8px 10px", borderBottom: `2px solid ${C.border}`, color: C.muted, fontWeight: 600 }}>{inline(c, `th${key}-${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, j) => <td key={j} style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}`, color: C.text, verticalAlign: "top" }}>{inline(c, `td${key}-${ri}-${j}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // citação
    if (isQuote(line)) {
      const buf = [];
      while (i < lines.length && isQuote(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
      out.push(
        <blockquote key={key++} style={{ borderLeft: `3px solid ${C.gold}`, margin: "0 0 14px", padding: "4px 0 4px 14px", color: C.muted, fontSize: 13.5, lineHeight: 1.6, fontStyle: "italic" }}>
          {inline(buf.join(" "), `q${key}`)}
        </blockquote>
      );
      continue;
    }

    // lista não ordenada / checklist
    if (isUl(line)) {
      const items = [];
      while (i < lines.length && isUl(lines[i])) {
        const raw = lines[i].replace(/^\s*[-*]\s+/, "");
        const chk = raw.match(/^\[([ xX])\]\s+(.*)$/);
        items.push(chk ? { check: chk[1].toLowerCase() === "x", text: chk[2] } : { text: raw });
        i++;
      }
      out.push(
        <ul key={key++} style={{ margin: "0 0 14px", paddingLeft: 0, listStyle: "none" }}>
          {items.map((it, j) => (
            <li key={j} style={{ display: "flex", gap: 8, fontSize: 14, lineHeight: 1.6, color: C.text, marginBottom: 5 }}>
              <span style={{ color: it.check !== undefined ? C.accent : C.gold, flexShrink: 0 }}>{it.check !== undefined ? (it.check ? "☑" : "☐") : "•"}</span>
              <span>{inline(it.text, `li${key}-${j}`)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // lista ordenada
    if (isOl(line)) {
      const items = [];
      while (i < lines.length && isOl(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++; }
      out.push(
        <ol key={key++} style={{ margin: "0 0 14px", paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: C.text }}>
          {items.map((it, j) => <li key={j} style={{ marginBottom: 5 }}>{inline(it, `ol${key}-${j}`)}</li>)}
        </ol>
      );
      continue;
    }

    // parágrafo (acumula linhas até uma em branco ou início de outro bloco)
    const buf = [];
    while (
      i < lines.length && lines[i].trim() &&
      !isHeading(lines[i]) && !isHr(lines[i]) && !isUl(lines[i]) && !isOl(lines[i]) &&
      !isQuote(lines[i]) && !lines[i].trim().startsWith("```")
    ) { buf.push(lines[i]); i++; }
    out.push(<p key={key++} style={para}>{inline(buf.join(" "), `p${key}`)}</p>);
  }

  return <div>{out}</div>;
}
