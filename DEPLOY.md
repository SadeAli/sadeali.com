# Deploying the hub (apex domain on GitHub Pages)

One-time setup; after this, deploy = `git push`.

## 1. Create the repo & push

Create a **public** repo at github.com/new — suggested name: `sadeali.com`
(under the `SadeAli` account), then:

```sh
git remote add origin https://github.com/SadeAli/sadeali.com.git
git push -u origin main
```

## 2. Enable Pages

GitHub → repo → **Settings → Pages** → Source: *Deploy from a branch* →
Branch: `main`, folder `/ (root)` → Save.

## 3. Point the apex domain at Pages

In **Settings → Pages → Custom domain**, enter `sadeali.com` (the `CNAME`
file in this repo already matches). Then at your DNS provider add:

| Type  | Name | Value             |
|-------|------|-------------------|
| A     | @    | 185.199.108.153   |
| A     | @    | 185.199.109.153   |
| A     | @    | 185.199.110.153   |
| A     | @    | 185.199.111.153   |
| CNAME | www  | sadeali.github.io |

Optional but nice (IPv6):

| Type | Name | Value                |
|------|------|----------------------|
| AAAA | @    | 2606:50c0:8000::153  |
| AAAA | @    | 2606:50c0:8001::153  |
| AAAA | @    | 2606:50c0:8002::153  |
| AAAA | @    | 2606:50c0:8003::153  |

Wait for the DNS check to pass, then tick **Enforce HTTPS**.

## 4. Tell search engines

Submit **`https://sadeali.com/sitemap-index.xml`** in
[Google Search Console](https://search.google.com/search-console)
(verify via the DNS TXT method — you're already in the DNS panel anyway).

That one URL covers the network. It is a sitemap *index*: it names this
host's `sitemap.xml` and every subdomain's, and Search Console follows it
into each. Submitting it needs the **`sc-domain:sadeali.com`** property —
the domain property, which verifies the apex and every subdomain together —
because a sitemap may only list URLs on hosts it is verified for. Add a new
subdomain by adding one `<sitemap>` line to the index; nothing to re-submit.

## Subdomains (each project repo does this once)

| Type  | Name       | Value             |
|-------|------------|-------------------|
| CNAME | \<project\> | sadeali.github.io |

…plus a `CNAME` file containing `<project>.sadeali.com` in that repo and the
custom domain set in its Pages settings. `waytoc.sadeali.com` already follows
this pattern.

## Notes

- All paths in the site are relative **except** in `404.html`, which must use
  absolute paths because GitHub Pages serves it at any URL depth.
- No build step. No CI needed. Deploy = push.
