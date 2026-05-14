'use strict';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'my', 'this', 'that', 'of', 'for', 'to', 'with', 'is',
  'are', 'i', 'we', 'you', 'on', 'in', 'at', 'by', 'as', 'be',
  'what', 'whats', 'who', 'when', 'where', 'which', 'how', 'whose',
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'je', 'tu',
  'il', 'elle', 'ce', 'cette', 'ces', 'mes', 'tes', 'ses', 'sur', 'dans',
  'moi', 'toi', 'nous', 'vous', 'que', 'qui', 'quoi', 'quand', 'comment',
]);

const NEGATION_TOKENS = new Set([
  'dont', 'not', 'never', 'no',
  'ne', 'pas', 'jamais', 'non', 'sans',
]);

const SUFFIXES = [
  'ations', 'ation', 'ements', 'ement', 'ments', 'ment',
  'tions', 'tion', 'ings', 'ing',
  'iez', 'ions', 'ais', 'ait', 'ant', 'aient',
  'ies', 'ied', 'iest', 'est', 'ers', 'er', 'ed', 'es', 's',
];

function accentFold(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function stem(token) {
  if (token.length <= 3) return token;
  for (const suf of SUFFIXES) {
    if (token.length > suf.length + 2 && token.endsWith(suf)) {
      return token.slice(0, -suf.length);
    }
  }
  return token;
}

function tokenize(text) {
  if (!text || typeof text !== 'string') return { tokens: [], negated: false };
  let s = text.replace(/([a-z])([A-Z])/g, '$1 $2');
  s = s.toLowerCase();
  s = accentFold(s);
  s = s.replace(/['’]/g, '');
  s = s.replace(/[^a-z0-9\s/]/g, ' ');
  const raw = s.split(/[\s_\-]+/).filter(Boolean);
  let negated = false;
  const tokens = [];
  for (const r of raw) {
    if (NEGATION_TOKENS.has(r)) { negated = true; continue; }
    if (STOP_WORDS.has(r)) continue;
    if (r.startsWith('/')) {
      tokens.push(r);
      const inner = r.slice(1);
      if (inner) tokens.push(stem(inner));
      continue;
    }
    if (r.length === 0) continue;
    tokens.push(stem(r));
  }
  return { tokens, negated };
}

module.exports = { tokenize, stem, accentFold };
