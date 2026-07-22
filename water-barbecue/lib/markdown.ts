/**
 * Renderise du markdown basique en HTML stylé pour le thème Water-Barbecue
 * Utilisé par les pages /reglement et /comptage
 */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inTable = false;
  let tableHtml = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Titres
    if (line.startsWith("# ")) {
      html.push(`<h1 class="text-2xl font-bold text-white mt-6 mb-3">${line.slice(2)}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      html.push(`<h2 class="text-xl font-bold text-blue-200 mt-5 mb-2 border-b border-blue-500/20 pb-1">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      html.push(`<h3 class="text-lg font-bold text-cyan-200 mt-4 mb-2">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith("#### ")) {
      html.push(`<h4 class="text-base font-bold text-orange-200 mt-3 mb-1">${line.slice(5)}</h4>`);
      continue;
    }

    // Tableaux
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line.split("|").filter(Boolean);
      if (cells.length > 0) {
        // Ligne de séparation (|---|)
        if (cells[0].includes("-")) {
          inTable = true;
          continue;
        }
        if (!inTable) {
          tableHtml = '<table class="w-full text-sm my-3 border-collapse">';
          tableHtml += "<thead><tr>";
          cells.forEach((c) => {
            tableHtml += `<th class="border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-left text-blue-200 font-semibold">${c.trim()}</th>`;
          });
          tableHtml += "</tr></thead><tbody>";
          inTable = true;
        } else {
          tableHtml += "<tr>";
          cells.forEach((c, idx) => {
            const isFirst = idx === 0;
            const isCoeff = c.trim().startsWith("×");
            const isGreen = c.trim().startsWith("✅");
            let extraClass = "text-white/80";
            if (isFirst) extraClass = "text-blue-200 font-medium";
            else if (isCoeff) extraClass = "text-orange-300 font-bold";
            else if (isGreen) extraClass = "text-green-300";
            tableHtml += `<td class="border border-white/10 px-3 py-2 ${extraClass}">${c.trim()}</td>`;
          });
          tableHtml += "</tr>";
        }
        continue;
      }
    }

    // Fermer un tableau si la ligne suivante n'est pas un pipe
    if (inTable) {
      tableHtml += "</tbody></table>";
      html.push(tableHtml);
      tableHtml = "";
      inTable = false;
    }

    // Citations (blockquote)
    if (line.startsWith("> ")) {
      html.push(`<blockquote class="border-l-4 border-orange-400/50 bg-orange-500/5 pl-4 py-2 my-3 text-gray-300 italic">${line.slice(2)}</blockquote>`);
      continue;
    }

    // Listes non-ordonnées
    if (line.startsWith("- ")) {
      html.push(`<li class="text-gray-300 ml-4 list-disc">${formatInline(line.slice(2))}</li>`);
      continue;
    }

    // Listes ordonnées
    if (line.match(/^\d+\.\s/)) {
      html.push(`<li class="text-gray-300 ml-4 list-decimal">${formatInline(line.replace(/^\d+\.\s/, ""))}</li>`);
      continue;
    }

    // Ligne vide
    if (line.trim() === "") {
      html.push('<div class="h-2"></div>');
      continue;
    }

    // Texte normal
    if (!line.startsWith("|")) {
      html.push(`<p class="text-gray-300 leading-relaxed">${formatInline(line)}</p>`);
    }
  }

  // Fermer table si encore ouvert
  if (inTable) {
    tableHtml += "</tbody></table>";
    html.push(tableHtml);
  }

  return html.join("\n");
}

/**
 * Formate les éléments inline : gras, italique, code, sauts de ligne
 */
function formatInline(text: string): string {
  let result = text
    // Échapper les HTML dangereux
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code inline : `code`
    .replace(/`([^`]+)`/g, '<code class="bg-blue-500/15 text-blue-200 px-1.5 py-0.5 rounded text-[0.9em] font-mono">$1</code>')
    // Gras : **texte**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
    // Italique : *texte*
    .replace(/\*(.*?)\*/g, '<em class="text-blue-300">$1</em>');
  return result;
}
