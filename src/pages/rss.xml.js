import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('posts');

	const response = await rss({
		title: 'bartmakehay',
		description: "Bart Du Bois' blog on software architecture, tinkering, and making hay.",
		site: context.site,
		items: posts
			.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.date,
				link: `/posts/${post.id}/`
			}))
	});

	// fast-xml-parser (used internally by @astrojs/rss) drops comments passed via
	// `customData`, so the note for human visitors is spliced into the raw XML here instead.
	const xml = await response.text();
	const withComment = xml.replace(
		/(<\?xml[^>]*\?>)/,
		'$1\n<!-- This is an RSS feed. Subscribe to it using a feed reader such as Feedly or NetNewsWire. -->'
	);

	return new Response(withComment, { headers: response.headers });
}
