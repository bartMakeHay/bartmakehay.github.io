/* One source of truth for the strings that describe the site itself:
   the visible subtitle on the home page and the link preview that
   WhatsApp, Slack, LinkedIn and search engines read. */
export const SITE_TITLE = 'bartmakehay';
export const SITE_DESCRIPTION = "Bart's blog on software architecture, tinkering, and making hay.";

/* Link-preview image: 1200x630 JPEG in public/images, referenced as an absolute
   URL because WhatsApp, Slack and LinkedIn will not resolve a relative one. */
export const SITE_OG_IMAGE = '/images/og-bartmakehay.jpg';
export const SITE_OG_IMAGE_ALT =
	'An open notebook with a pencil, a set square and a pair of compasses on the left page, and a line-drawn architecture diagram on the right.';
