import type { Metadata } from "next";
import Image from "next/image";
import { API_BASE_URL, APP_STORE_URL, PLAY_STORE_URL, SITE_URL, DEEP_LINK_SCHEME } from "@/lib/config";
import { AppleIcon, PlayStoreIcon, UserIcon, HeartIcon, CommentIcon } from "@/lib/icons";

interface PostData {
    id: string;
    postTypeKey?: string;
    caption?: string;
    imageUrl?: string;
    likeCount: number;
    commentCount: number;
    authorDisplayName?: string;
    authorUsername?: string;
    authorProfileUrl?: string;
    salePrice?: string;
    saleStatus?: string;
    auctionStartPrice?: number;
    auctionFinalPrice?: number;
    auctionStatus?: string;
}

async function getPost(id: string): Promise<PostData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/public-web/post/${id}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.success ? json.data : null;
    } catch {
        return null;
    }
}

function getPostTypeBadge(post: PostData) {
    switch (post.postTypeKey) {
        case "sale":
            return (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                        ขาย
                    </span>
                    {post.salePrice && (
                        <span className="text-emerald-400 font-bold text-sm">
                            ฿{post.salePrice}
                        </span>
                    )}
                    {post.saleStatus && post.saleStatus !== "available" && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                            {post.saleStatus === "sold" ? "ขายแล้ว" : "จองแล้ว"}
                        </span>
                    )}
                </div>
            );
        case "auction":
            return (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                        ประมูล
                    </span>
                    {post.auctionFinalPrice ? (
                        <span className="text-amber-400 font-bold text-sm">
                            ฿{post.auctionFinalPrice.toLocaleString()}
                        </span>
                    ) : post.auctionStartPrice ? (
                        <span className="text-amber-400/70 text-sm">
                            เริ่มต้น ฿{post.auctionStartPrice.toLocaleString()}
                        </span>
                    ) : null}
                    {post.auctionStatus && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.auctionStatus === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/10 text-white/50"
                            }`}>
                            {post.auctionStatus === "Active" ? "กำลังประมูล" : "จบแล้ว"}
                        </span>
                    )}
                </div>
            );
        default:
            return (
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30">
                    โชว์
                </span>
            );
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);

    const title = post?.authorDisplayName
        ? `${post.authorDisplayName} บน bettacool`
        : "โพสต์บน bettacool";
    const description = post?.caption
        ? post.caption.slice(0, 200)
        : "ดูโพสต์นี้บน bettacool — แอปสำหรับคนรักปลากัด";
    const image = post?.imageUrl || undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/post/${id}`,
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
                    {/* Image */}
                    {post?.imageUrl && (
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.imageUrl}
                                alt="โพสต์"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Post Type Badge */}
                    {post && (
                        <div className="flex justify-center">
                            {getPostTypeBadge(post)}
                        </div>
                    )}

                    {/* Author Info */}
                    {post?.authorDisplayName && (
                        <div className="flex items-center gap-3 justify-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 border border-white/20 overflow-hidden shrink-0">
                                {post.authorProfileUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={post.authorProfileUrl}
                                        alt={post.authorDisplayName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="text-left">
                                <p className="text-white text-sm font-medium leading-tight">
                                    {post.authorDisplayName}
                                </p>
                                {post.authorUsername && (
                                    <p className="text-white/40 text-xs">
                                        @{post.authorUsername}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Caption */}
                    {post?.caption && (
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-3 text-left whitespace-pre-line">
                            {post.caption}
                        </p>
                    )}

                    {/* Engagement Stats */}
                    {post && (
                        <div className="flex items-center justify-center gap-5 text-white/40 text-xs pt-2 border-t border-white/5">
                            <span className="flex items-center gap-1.5">
                                <HeartIcon className="w-3.5 h-3.5 text-rose-400" />
                                {post.likeCount}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CommentIcon className="w-3.5 h-3.5 text-sky-400" />
                                {post.commentCount}
                            </span>
                        </div>
                    )}

                    {!post && (
                        <p className="text-white/60 text-base text-center">
                            เปิดแอป bettacool เพื่อดูโพสต์นี้
                        </p>
                    )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <a
                        href={`${DEEP_LINK_SCHEME}post/${id}`}
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
