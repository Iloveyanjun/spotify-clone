"use client";

import {
    addLikedTrack,
    checkTrackLiked,
    getUser,
    removeLikedTrack,
} from "@/app/actions";
import styles from "@/app/heart.module.css";
import { useTrackContext } from "@/context/player-context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function LikeBtn() {
    const router = useRouter();
    const likeBtn = useRef<HTMLButtonElement>(null);
    const [isLiked, setIsLiked] = useState(false);
    // 獲取spotify歌曲ID 把spotify歌曲ID添加到喜歡列表
    const { spotifyTrackID, trackIndex } = useTrackContext();

    // 使用useEffect檢查歌曲是否已經被添加到喜歡列表
    useEffect(() => {
        async function checkLiked() {
            if (spotifyTrackID) {
                const user = await getUser();
                if (user) {
                    // 檢查歌曲是否已經被添加到喜歡列表
                    const liked = await checkTrackLiked(
                        user.id,
                        spotifyTrackID[trackIndex]
                    );
                    setIsLiked(liked);
                }
            }
        }
        checkLiked();
    }, [trackIndex]);

    // 喜歡按鈕的點擊事件
    async function handleClick() {
        const user = await getUser();
        if (user === null) {
            // go to login page
            router.push("/login");
        } else if (!spotifyTrackID) {
            console.log("no track is playing");
        } else if (likeBtn.current) {
            // 如果按鈕為不喜歡狀態, 則添加動畫
            if (!isLiked) {
                likeBtn.current.classList.add(styles.animate);
                setTimeout(() => {
                    likeBtn.current?.classList.remove(styles.animate);
                }, 300);
            }

            if (spotifyTrackID) {
                if (!isLiked) {
                    // 如果有播放的歌曲, 則添加到喜歡列表
                    await addLikedTrack(user.id, spotifyTrackID[trackIndex]);
                } else {
                    // 把喜歡的歌曲從喜歡列表中移除
                    await removeLikedTrack(user.id, spotifyTrackID[trackIndex]);
                }
                setIsLiked(!isLiked);
            }
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <button
                    ref={likeBtn}
                    className={styles.button}
                    onClick={handleClick}
                >
                    {isLiked ? (
                        <FavoriteIcon className="text-spotify" />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </button>
            </div>
        </div>
    );
}
