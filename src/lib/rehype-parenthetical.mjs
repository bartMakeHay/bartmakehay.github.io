/**
 * Renders parenthetical asides — "(...)" — in a muted tone, per
 * Conventies.md §Haakjestekst in the blog-vault: the parenthetical is a
 * deliberate step down from the main sentence, not filler to delete.
 *
 * Paren matching runs across sibling inline nodes (e.g. a link sitting
 * inside the parenthetical, as in "(thanks to [Carl Seghers](...))"),
 * not just within a single text node — a naive per-text-node regex would
 * miss any parenthetical that a link or emphasis splits in two.
 */

function transformInline(children) {
	const result = [];
	let depth = 0;
	let group = null;
	let buf = '';

	const flushBufTo = (target) => {
		if (buf) {
			target.push({ type: 'text', value: buf });
			buf = '';
		}
	};

	for (const child of children) {
		if (child.type === 'text') {
			for (const ch of child.value) {
				if (ch === '(') {
					if (depth === 0) {
						flushBufTo(result);
						group = [];
					}
					buf += ch;
					depth++;
				} else if (ch === ')') {
					buf += ch;
					depth = Math.max(depth - 1, 0);
					if (depth === 0 && group) {
						flushBufTo(group);
						result.push({
							type: 'element',
							tagName: 'span',
							properties: { className: ['text-aside'], 'data-paren': 'true' },
							children: group
						});
						group = null;
					}
				} else {
					buf += ch;
				}
			}
			flushBufTo(depth > 0 && group ? group : result);
		} else if (depth > 0 && group) {
			flushBufTo(group);
			group.push(child);
		} else {
			flushBufTo(result);
			result.push(child);
		}
	}

	// Unbalanced parens (shouldn't happen in prose, but don't eat content if it does).
	flushBufTo(depth > 0 && group ? group : result);
	if (group) result.push(...group);

	return result;
}

const CONTAINER_TYPES = new Set(['element', 'mdxJsxFlowElement', 'mdxJsxTextElement']);

function walk(node) {
	if (!node || !CONTAINER_TYPES.has(node.type)) return;
	// Plain HTML elements carry `tagName`; MDX JSX elements (e.g. a hand-authored
	// <details>/<summary> in the .mdx source) carry `name` instead.
	const tag = node.tagName || node.name;
	if (tag === 'code' || tag === 'pre') return;
	if (node.properties && node.properties['data-paren']) return;
	if (!node.children) return;
	node.children = transformInline(node.children);
	for (const child of node.children) walk(child);
}

export default function rehypeParenthetical() {
	return (tree) => {
		tree.children = transformInline(tree.children);
		for (const child of tree.children) walk(child);
	};
}
