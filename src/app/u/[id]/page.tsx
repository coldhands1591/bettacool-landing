import type { Metadata } from "next";

const API_BASE_URL =
    process.env.API_BASE_URL || "https://api.bettacool.com/api";

const APP_STORE_URL =
    "https://apps.apple.com/app/bettacool/id6741442231";
const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.bettacool.app";

interface UserData {
    id: string;
    displayName?: string;
    profileUrl?: string;
    bio?: string;
}

async function getUser(id: string): Promise<UserData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/user/${id}/profile`, {
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
            url: `https://bettacool.com/u/${id}`,
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
                <div className="flex justify-center mb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-white text-2xl font-bold">B</span>
                    </div>
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

                    {user?.displayName && (
                        <h1 className="text-white text-xl font-semibold">
                            {user.displayName}
                        </h1>
                    )}

                    {user?.bio && (
                        <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                            {user.bio}
                        </p>
                    )}

                    {!user && (
                        <p className="text-white/60 text-base">
                            เปิดแอป bettacool เพื่อดูโปรไฟล์นี้
                        </p>
                    )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <a
                        href={`bettacool://u/${id}`}
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
