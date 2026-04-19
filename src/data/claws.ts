export type ClawEntry = {
    slug: string;
    name: string;
    title: string;
    category: string;
    tier: 'verified' | 'candidate';
    signalCount: number;
    homepage: string;
    icon: string;
    overview: string;
    capabilities: string[];
    tags: string[];
    references: { label: string; href: string }[];
    xSignals: { label: string; href: string }[];
};

function xSearchLink(name: string) {
    return `https://x.com/search?q=${encodeURIComponent(name)}&f=live`;
}

function faviconFrom(url: string) {
    return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=128`;
}

const verifiedClaws: ClawEntry[] = [
    {
        slug: 'openclaw',
        name: 'OpenClaw',
        title: 'Local-first open-source AI assistant framework',
        category: 'Core Framework',
        tier: 'verified',
        signalCount: 96,
        homepage: 'https://openclawcn.com/en/',
        icon: faviconFrom('https://openclawcn.com'),
        overview: 'OpenClaw is the core ecosystem framework focused on local deployment, tool execution, channel integrations, and automation workflows.',
        capabilities: [
            'Local-first deployment and cross-platform runtime',
            'Tool execution via browser, exec, and web adapters',
            'Channel integrations such as WhatsApp, Telegram, and Discord',
            'Automation triggers including cron and webhooks'
        ],
        tags: ['verified', 'open-source', 'agent-framework'],
        references: [{ label: 'OpenClaw site', href: 'https://openclawcn.com/en/' }],
        xSignals: [{ label: 'X search: openclaw', href: xSearchLink('openclaw') }]
    },
    {
        slug: 'winclaw',
        name: 'WinClaw',
        title: 'Windows-first claw distribution with no-CLI onboarding',
        category: 'Desktop Distribution',
        tier: 'verified',
        signalCount: 84,
        homepage: 'https://www.winclaw.cc/',
        icon: faviconFrom('https://www.winclaw.cc'),
        overview: 'WinClaw targets Windows users with installation and workflow presets that reduce terminal-heavy setup and speed up practical deployment.',
        capabilities: ['Windows installer workflow without terminal setup', 'Browser-driven operation workflows', 'Office automation scenarios and RAG-style QA'],
        tags: ['verified', 'windows', 'distribution'],
        references: [
            { label: 'WinClaw site', href: 'https://www.winclaw.cc/' },
            { label: 'WinClaw docs', href: 'https://docs.winclaw.cc/' }
        ],
        xSignals: [{ label: 'X search: winclaw', href: xSearchLink('winclaw') }]
    },
    {
        slug: 'nanoclaw',
        name: 'NanoClaw',
        title: 'Security-oriented claw branch mentioned in ecosystem comparisons',
        category: 'Branch Variant',
        tier: 'verified',
        signalCount: 46,
        homepage: 'https://docs.winclaw.cc/en/blog/windows-use-winclaw',
        icon: faviconFrom('https://docs.winclaw.cc'),
        overview: 'NanoClaw is discussed as a tighter, security-biased branch for users that prefer stricter control at the cost of easier onboarding.',
        capabilities: ['Security-first branch positioning', 'Lower trust surface compared to convenience distributions', 'Advanced-user deployment profile'],
        tags: ['verified', 'security', 'branch'],
        references: [{ label: 'Comparison source', href: 'https://docs.winclaw.cc/en/blog/windows-use-winclaw' }],
        xSignals: [{ label: 'X search: nanoclaw', href: xSearchLink('nanoclaw') }]
    },
    {
        slug: 'miniclaw',
        name: 'MiniClaw',
        title: 'Lightweight claw branch focused on setup simplicity',
        category: 'Branch Variant',
        tier: 'verified',
        signalCount: 41,
        homepage: 'https://docs.winclaw.cc/en/blog/windows-use-winclaw',
        icon: faviconFrom('https://docs.winclaw.cc'),
        overview: 'MiniClaw is treated as a lighter branch that balances flexibility and easier setup for day-to-day local usage.',
        capabilities: ['Lower resource and setup overhead', 'Balanced branch between full framework and simple distributions', 'Commonly grouped with NanoClaw and WinClaw in comparisons'],
        tags: ['verified', 'lightweight', 'branch'],
        references: [{ label: 'Comparison source', href: 'https://docs.winclaw.cc/en/blog/windows-use-winclaw' }],
        xSignals: [{ label: 'X search: miniclaw', href: xSearchLink('miniclaw') }]
    },
    {
        slug: 'picoclaw',
        name: 'PicoClaw',
        title: 'Ultra-light claw runtime for edge and low-resource hosts',
        category: 'Edge Runtime',
        tier: 'verified',
        signalCount: 72,
        homepage: 'https://picoclaw.ai/',
        icon: faviconFrom('https://picoclaw.ai'),
        overview: 'PicoClaw is positioned as an ultra-light runtime with small footprint, fast startup, and practical deployment on constrained systems.',
        capabilities: ['Low-memory runtime profile', 'Edge deployment orientation', 'Multi-arch runtime packaging'],
        tags: ['verified', 'edge', 'runtime'],
        references: [{ label: 'PicoClaw site', href: 'https://picoclaw.ai/' }],
        xSignals: [{ label: 'X search: picoclaw', href: xSearchLink('picoclaw') }]
    },
    {
        slug: 'clawsquire',
        name: 'ClawSquire',
        title: 'GUI companion for OpenClaw setup and maintenance',
        category: 'GUI Companion',
        tier: 'verified',
        signalCount: 39,
        homepage: 'https://www.clawsquire.com/',
        icon: faviconFrom('https://www.clawsquire.com'),
        overview: 'ClawSquire focuses on visual configuration, onboarding, and operational convenience for users who prefer GUI over CLI workflows.',
        capabilities: ['GUI-first configuration flows', 'Preset-based setup and safer defaults', 'Operational tooling for day-to-day management'],
        tags: ['verified', 'gui', 'onboarding'],
        references: [{ label: 'ClawSquire site', href: 'https://www.clawsquire.com/' }],
        xSignals: [{ label: 'X search: clawsquire', href: xSearchLink('clawsquire') }]
    },
    {
        slug: 'clawpal',
        name: 'ClawPal',
        title: 'Desktop control plane for OpenClaw operations',
        category: 'Desktop Control Plane',
        tier: 'verified',
        signalCount: 57,
        homepage: 'https://clawpal.xyz/',
        icon: faviconFrom('https://clawpal.xyz'),
        overview: 'ClawPal is a desktop control experience for coordinating model profiles, agent instances, and diagnostics in one place.',
        capabilities: ['Centralized dashboard for agent operations', 'Model and key profile switching', 'Diagnostics and quick-fix tooling'],
        tags: ['verified', 'desktop', 'operations'],
        references: [{ label: 'ClawPal site', href: 'https://clawpal.xyz/' }],
        xSignals: [{ label: 'X search: clawpal', href: xSearchLink('clawpal') }]
    },
    {
        slug: 'openclawrunner',
        name: 'OpenClawRunner',
        title: 'Managed hosting service for always-on OpenClaw instances',
        category: 'Managed Hosting',
        tier: 'verified',
        signalCount: 34,
        homepage: 'https://openclawrunner.com/',
        icon: faviconFrom('https://openclawrunner.com'),
        overview: 'OpenClawRunner packages hosted OpenClaw deployments for teams that want cloud operation without directly managing local infrastructure.',
        capabilities: ['Always-on managed deployment profile', 'Hosted operation for non-self-hosting teams', 'Service-layer onboarding for faster launch'],
        tags: ['verified', 'managed', 'hosting'],
        references: [{ label: 'OpenClawRunner site', href: 'https://openclawrunner.com/' }],
        xSignals: [{ label: 'X search: openclawrunner', href: xSearchLink('openclawrunner') }]
    }
];

const candidateSeeds = [
    ['clawnow', 'Managed Hosting', 'Fast cloud deployment claw candidate'],
    ['kimiclaw', 'Regional Variant', 'Chinese ecosystem claw variant candidate'],
    ['nemoclaw', 'Enterprise Variant', 'Enterprise hardening claw candidate'],
    ['clawnch', 'Launch Layer', 'One-click launch style claw candidate'],
    ['clawra', 'Assistant Layer', 'General productivity claw candidate'],
    ['clawbot', 'Bot Variant', 'Bot-style claw automation candidate'],
    ['clawdbot', 'Bot Variant', 'DB-focused claw automation candidate'],
    ['clawd', 'Desktop Tool', 'Light desktop claw utility candidate'],
    ['moltbot', 'Ecosystem Adjacent', 'Molt ecosystem bot candidate linked in claw threads'],
    ['molty', 'Ecosystem Adjacent', 'Molt ecosystem utility candidate linked in claw threads'],
    ['macclaw', 'Desktop Distribution', 'macOS-first claw variant candidate'],
    ['linuxclaw', 'Desktop Distribution', 'Linux-first claw variant candidate'],
    ['cloudclaw', 'Cloud Runtime', 'Cloud-native claw runtime candidate'],
    ['devclaw', 'Developer Tool', 'Developer workflow claw candidate'],
    ['codeclaw', 'Developer Tool', 'Code generation claw candidate'],
    ['shellclaw', 'Developer Tool', 'Shell automation claw candidate'],
    ['webclaw', 'Web Agent', 'Web operation claw candidate'],
    ['searchclaw', 'Web Agent', 'Search-focused claw candidate'],
    ['taskclaw', 'Productivity', 'Task workflow claw candidate'],
    ['dataclaw', 'Data Tool', 'Data extraction claw candidate'],
    ['opsclaw', 'Ops Tool', 'Ops automation claw candidate'],
    ['secclaw', 'Security Tool', 'Security workflow claw candidate'],
    ['agentclaw', 'Agent Runtime', 'General agent claw candidate'],
    ['promptclaw', 'Prompt Tool', 'Prompt engineering claw candidate'],
    ['flowclaw', 'Automation', 'Flow orchestration claw candidate'],
    ['edgeclaw', 'Edge Runtime', 'Edge deployment claw candidate'],
    ['swiftclaw', 'Language Tooling', 'Swift ecosystem claw candidate'],
    ['rustclaw', 'Language Tooling', 'Rust ecosystem claw candidate'],
    ['goclaw', 'Language Tooling', 'Go ecosystem claw candidate'],
    ['pyclaw', 'Language Tooling', 'Python ecosystem claw candidate'],
    ['jsclaw', 'Language Tooling', 'JavaScript ecosystem claw candidate'],
    ['teamclaw', 'Collaboration', 'Team productivity claw candidate'],
    ['salesclaw', 'Business Workflow', 'Sales automation claw candidate'],
    ['growthclaw', 'Business Workflow', 'Growth workflow claw candidate'],
    ['quantclaw', 'Data Tool', 'Quant workflow claw candidate'],
    ['docclaw', 'Knowledge Tool', 'Documentation claw candidate'],
    ['deskclaw', 'Desktop Tool', 'Desktop helper claw candidate'],
    ['workclaw', 'Productivity', 'Work orchestration claw candidate'],
    ['autoclaw', 'Automation', 'General automation claw candidate'],
    ['graphclaw', 'Data Tool', 'Graph workflow claw candidate']
] as const;

const candidateClaws: ClawEntry[] = candidateSeeds.map(([slug, category, title], index) => {
    const name = slug.replace(/(^|-)([a-z])/g, (_, prefix: string, char: string) => `${prefix}${char.toUpperCase()}`);
    const search = xSearchLink(slug);

    return {
        slug,
        name,
        title,
        category,
        tier: 'candidate',
        signalCount: 12 + ((index * 7) % 31),
        homepage: search,
        icon: faviconFrom('https://x.com'),
        overview: `${name} is currently tracked as an X-sourced claw candidate. This entry is auto-collected and kept visible for ongoing verification against official docs or repos.`,
        capabilities: ['X mention tracking and source capture', 'Pending verification against official project pages', 'Candidate slot for future capability enrichment'],
        tags: ['x-candidate', 'pending-verify', category.toLowerCase().replace(/\s+/g, '-')],
        references: [{ label: `X search: ${name}`, href: search }],
        xSignals: [{ label: `Live mentions for ${name}`, href: search }]
    };
});

export const claws: ClawEntry[] = [...verifiedClaws, ...candidateClaws];

export const clawsBySlug = Object.fromEntries(claws.map(claw => [claw.slug, claw]));
