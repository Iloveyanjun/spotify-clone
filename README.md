# Spotify Clone
使用next.js, supabase, vercel, tailwindcss的簡易版spotify複製
## 功能
* 用戶註冊/登入
* 按讚喜歡的歌曲
* 歌曲歌詞同步
* 播放完畢後推薦歌曲
* 進度條跳轉音樂

### 如何在本地運行
確保你有安裝[node.js](https://nodejs.org/en)
打開`.env.example`
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
YOUTUBE_API_KEY=
```
把你的[supabase](https://supabase.com/), [vercel](https://vercel.com/), [google](https://console.cloud.google.com/)以及[spotify](https://developer.spotify.com/)中的API KEY輸入進去。並把名字改為`.env.local`

在終端輸入
```
npm i
```
最後就能運行了
```
npm run dev
```

