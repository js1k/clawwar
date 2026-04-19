'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type ClawIconProps = {
    name: string;
    src?: string;
    size?: number;
    className?: string;
};

function hashHue(text: string) {
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
        hash = (hash * 31 + text.charCodeAt(i)) % 360;
    }
    return hash;
}

function initials(name: string) {
    return name
        .split(/[\s-]+/)
        .map(segment => segment[0]?.toUpperCase())
        .filter(Boolean)
        .slice(0, 2)
        .join('');
}

export function ClawIcon({ name, src, size = 56, className = '' }: ClawIconProps) {
    const [failed, setFailed] = useState(false);

    const fallbackStyle = useMemo(() => {
        const hue = hashHue(name);
        return {
            background: `linear-gradient(135deg, hsl(${hue} 75% 55%), hsl(${(hue + 48) % 360} 72% 38%))`
        };
    }, [name]);

    if (!src || failed) {
        return (
            <div
                className={`inline-flex items-center justify-center rounded-2xl text-sm font-black text-white ${className}`}
                style={{ ...fallbackStyle, width: size, height: size }}>
                {initials(name)}
            </div>
        );
    }

    return (
        <Image
            alt={`${name} icon`}
            className={`rounded-2xl object-cover ${className}`}
            height={size}
            onError={() => setFailed(true)}
            src={src}
            unoptimized
            width={size}
        />
    );
}
