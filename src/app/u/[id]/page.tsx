import type { Metadata } from "next";
import Image from "next/image";
import { API_BASE_URL, APP_STORE_URL, PLAY_STORE_URL, SITE_URL, DEEP_LINK_SCHEME } from "@/lib/config";
import { AppleIcon, PlayStoreIcon } from "@/lib/icons";

interface UserData {
    id: string;
    displayName?: string;
    username?: string;
    profileUrl?: string;
    bio?: string;
    totalFollowing: number;
    totalFollowers: number;
    totalPosts: number;
}

async function getUser(id: string): Promise<UserData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/public-web/user/${id}/profile`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.success ? json.data : null;
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
    const user = await getUser(id);

    const title = user?.displayName
        ? `${user.displayName} — bettacool`
        : "โปรไฟล์บน bettacool";
    const description = user?.bio
        ? user.bio.slice(0, 200)
        : "ดูโปรไฟล์นี้บน bettacool — แอปสำหรับคนรักปลากัด";
    const image = user?.profileUrl || undefined;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/u/${id}`,
            siteName: "bettacool",
            type: "profile",
            locale: "th_TH",
            ...(image && { images: [{ url: image, width: 400, height: 400 }] }),
        },
        twitter: {
            card: "summary",
            title,
            description,
            ...(image && { images: [image] }),
        },
    };
}

export default async function ProfileSharePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await getUser(id);

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

                {/* Profile Preview Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                    {/* Avatar */}
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 border-2 border-white/20 overflow-hidden">
                            {user?.profileUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={user.profileUrl}
                                    alt={user.displayName || "โปรไฟล์"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg
                                        className="w-12 h-12 text-white/30"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name & Username */}
                    <div className="text-center">
                        {user?.displayName && (
                            <h1 className="text-white text-xl font-semibold">
                                {user.displayName}
                            </h1>
                        )}
                        {user?.username && (
                            <p className="text-white/60 text-sm mt-1">
                                @{user.username}
                            </p>
                        )}
                    </div>

                    {/* Stats Grid */}
                    {user && (
                        <div className="flex items-center justify-center gap-6 py-2 border-y border-white/5">
                            <div className="text-center">
                                <p className="text-white font-semibold">{user.totalFollowers || 0}</p>
                                <p className="text-white/40 text-xs">ผู้ติดตาม</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold">{user.totalFollowing || 0}</p>
                                <p className="text-white/40 text-xs">กำลังติดตาม</p>
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold">{user.totalPosts || 0}</p>
                                <p className="text-white/40 text-xs">โพสต์</p>
                            </div>
                        </div>
                    )}

                    {/* Bio */}
                    {user?.bio && (
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line text-center">
                            {user.bio}
                        </p>
                    )}

                    {!user && (
                        <p className="text-white/60 text-base text-center">
                            เปิดแอป bettacool เพื่อดูโปรไฟล์นี้
                        </p>
                    )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <a
                        href={`${DEEP_LINK_SCHEME}u/${id}`}
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
