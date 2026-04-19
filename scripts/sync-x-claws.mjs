import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const token = process.env.X_BEARER_TOKEN;

if (!token) {
    console.error('Missing X_BEARER_TOKEN. Set it before running npm run sync:x');
    process.exit(1);
}

const query = '(openclaw OR winclaw OR nanoclaw OR miniclaw OR picoclaw OR clawsquire OR clawpal) -is:retweet';
const endpoint = new URL('https://api.x.com/2/tweets/search/recent');
endpoint.searchParams.set('query', query);
endpoint.searchParams.set('max_results', '100');
endpoint.searchParams.set('tweet.fields', 'created_at,text,entities');
endpoint.searchParams.set('expansions', 'author_id');
endpoint.searchParams.set('user.fields', 'username,name,profile_image_url');

const response = await fetch(endpoint, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

if (!response.ok) {
    const details = await response.text();
    console.error(`X API request failed (${response.status})`);
    console.error(details);
    process.exit(1);
}

const payload = await response.json();
const users = new Map((payload.includes?.users ?? []).map(user => [user.id, user]));
const buckets = new Map();
const clawRegex = /\b([a-z0-9-]{2,}claw)\b/gi;

for (const tweet of payload.data ?? []) {
    const hits = [...tweet.text.matchAll(clawRegex)].map(match => match[1].toLowerCase());
    const uniqueHits = [...new Set(hits)];

    for (const name of uniqueHits) {
        const user = users.get(tweet.author_id);
        const username = user?.username ?? 'i';
        const link = `https://x.com/${username}/status/${tweet.id}`;
        const urls = (tweet.entities?.urls ?? []).map(item => item.expanded_url || item.url).filter(Boolean);
        const current = buckets.get(name) ?? {
            slug: name,
            name: name.replace(/(^|-)([a-z])/g, (_, prefix, char) => `${prefix}${char.toUpperCase()}`),
            mentions: 0,
            xPosts: [],
            discoveredUrls: [],
            sampleText: tweet.text.slice(0, 220)
        };

        current.mentions += 1;
        current.xPosts.push(link);
        current.discoveredUrls.push(...urls);
        buckets.set(name, current);
    }
}

const candidates = [...buckets.values()]
    .map(item => ({
        ...item,
        xPosts: [...new Set(item.xPosts)].slice(0, 5),
        discoveredUrls: [...new Set(item.discoveredUrls)].slice(0, 5)
    }))
    .sort((a, b) => b.mentions - a.mentions);

const output = {
    generatedAt: new Date().toISOString(),
    query,
    totalTweets: payload.meta?.result_count ?? 0,
    candidates
};

const outputPath = path.join(process.cwd(), 'src', 'data', 'x-claw-candidates.json');
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(output, null, 2));

console.log(`Saved ${candidates.length} claw candidates to ${outputPath}`);
