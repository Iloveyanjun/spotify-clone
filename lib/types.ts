import { z } from "zod";

export const signupSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password can't be empty" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// 專輯名稱, 專輯id, 專輯封面, 專輯單曲總數
export type AlbumData = {
    id: string;
    name: string;
    totalTracks: number;
    cover: string;
    // 誰出的專輯
    artist: { name: string; id: string }[];
    releaseDate: string;
    // 每首歌曲的名稱、id、時間
    tracks: {
        name: string;
        id: string;
        duration: number;
        // feature artists
        artists: { name: string; id: string }[];
    }[];
};

// 用來儲存藝術家陣列中的每個物件的類型
export type Artist = {
    name: string;
    id: string;
};

export type PlaylistTrackData = {
    index: number;
    name: string;
    // track id
    id: string;
    cover: string;
    // 單曲所在專輯封面
    duration: number;
    addedAt: string;
    album: { name: string; id: string };
    artists: { name: string; id: string }[];
};
