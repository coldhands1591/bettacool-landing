import type { Metadata } from "next";

const API_BASE_URL =
    process.env.API_BASE_URL || "https://api.bettacool.com/api";

const APP_STORE_URL =
    "https://apps.apple.com/app/bettacool/id6741442231";
const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.bettacool.app";

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
                <div className="flex justify-center mb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-white text-2xl font-bold">B</span>
                    </div>
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
                        className="block w-full py-3.5 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]"
                    >
                        เปิดในแอป bettacool
                    </a>

                    <div className="flex gap-3">
                        <a
                            href={APP_STORE_URL}
                            className="flex-1 py-3 px-4 bg-white/10 backdrop-blur text-white text-sm font-medium rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
                        >
                            App Store
                        </a>
                        <a
                            href={PLAY_STORE_URL}
                            className="flex-1 py-3 px-4 bg-white/10 backdrop-blur text-white text-sm font-medium rounded-xl border border-white/10 hover:bg-white/15 transition-colors"
                        >
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
