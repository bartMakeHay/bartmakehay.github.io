# bartmakehay.github.io

Persoonlijke blog. Astro + Tailwind CSS, content rechtstreeks in MDX/Markdown, gedeployed naar GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

Content-workflow (distillatie/anonimisatie vanuit werkmateriaal) leeft in de aparte vault [`bartMakeHay/blog-vault`](https://github.com/bartMakeHay/blog-vault) — deze repo bevat enkel de sitecode.

## Development

```bash
npm install
npm run dev
```

## Comments (Giscus)

`src/components/Comments.astro` bevat het kant-en-klare Giscus-script (repo, repo-id en category-id al ingevuld, GitHub Discussions staat aan met de `Announcements`-categorie). Importeer en plaats het onderaan elke posttemplate zodra die bestaat:

```astro
---
import Comments from '../components/Comments.astro';
---
...
<Comments />
```

Vereist eenmalig: de [giscus GitHub App](https://github.com/apps/giscus) geïnstalleerd op deze repo.
