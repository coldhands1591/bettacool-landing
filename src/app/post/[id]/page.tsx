import type { Metadata } from "next";
import Image from "next/image";

const API_BASE_URL =
    process.env.API_BASE_URL || "https://api.bettacool.com/api";

const APP_STORE_URL =
    "https://apps.apple.com/app/bettacool/id6741442231";
const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.bettacool.app";

const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const PlayStoreIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.89 9.48l2.706-2.706-11.46-6.406 8.754 9.112zm2.706 1.412L14.5 15.412l-8.754 9.112 11.46-6.406-2.706-2.706zM21.243 11.09l-3.13-1.751-2.983 2.983 2.984 2.984 3.13-1.752a1.07 1.07 0 000-1.906v-.558z" />
    </svg>
);

interface PostData {
    id: string;
    content?: string;
    user?: {
        displayName?: string;
        profileUrl?: string;
    };
    mediaUrls?: string[];
}

async function getPost(id: string): Promise<PostData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/post/${id}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);

    const title = post?.user?.displayName
        ? `${post.user.displayName} บน bettacool`
        : "โพสต์บน bettacool";
    const description = post?.content
        ? post.content.slice(0, 200)
        : "ดูโพสต์นี้บน bettacool — แอปสำหรับคนรักปลากัด";
    const image = post?.mediaUrls?.[0] || undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://bettacool.com/post/${id}`,
            siteName: "bettacool",
            type: "article",
            locale: "th_TH",
            ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(image && { images: [image] }),
        },
    };
}

export default async function PostSharePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#0f172a] flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto text-center space-y-6">
                {/* Logo */}
                <div className="flex justify-center items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                        <Image src="/images/icon.png" alt="bettacool logo" width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-3xl font-extrabold tracking-wide brand-gradient">
                        bettacool
                    </span>
                </div>

                {/* Post Preview Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                    {post?.mediaUrls?.[0] && (
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.mediaUrls[0]}
                                alt="โพสต์"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {post?.user?.displayName && (
                        <p className="text-white/60 text-sm">
                            โพสต์โดย{" "}
                            <span className="text-white font-medium">
                                {post.user.displayName}
                            </span>
                        </p>
                    )}

                    {post?.content && (
                        <p className="text-white/80 text-base leading-relaxed line-clamp-4">
                            {post.content}
                        </p>
                    )}

                    {!post && (
                        <p className="text-white/60 text-base">
                            เปิดแอป bettacool เพื่อดูโพสต์นี้
                        </p>
                    )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <a
                        href={`bettacool://post/${id}`}
                        className="block w-full py-3.5 px-6 bg-brand-gradient text-white font-semibold rounded-xl shadow-lg shadow-[#4361ee]/25 hover:shadow-[#4361ee]/40 transition-all duration-200 active:scale-[0.98]"
                    >
                        เปิดในแอป bettacool
                    </a>

                    <div className="flex gap-3">
                        <a
                            href={APP_STORE_URL}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur text-white text-sm font-medium rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
                        >
                            <AppleIcon className="w-[18px] h-[18px]" />
                            App Store
                        </a>
                        <a
                            href={PLAY_STORE_URL}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur text-white text-sm font-medium rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
                        >
                            <PlayStoreIcon className="w-[18px] h-[18px]" />
                            Google Play
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-white/30 text-xs">
                    bettacool — บ้านของคนรักปลากัด 🐟
                </p>
            </div>
        </main>
    );
}
