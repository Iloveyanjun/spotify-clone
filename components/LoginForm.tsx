"use client";

import { login } from "@/app/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/types";
import { useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function LoginForm() {
    const [errorMsg, setErrorMsg] = useState<boolean>(false);
    // 使用 react-hook-form 來處理表單
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchema) => {
        const user = {
            email: data.email,
            password: data.password,
        };
        // 如果登入失敗，顯示錯誤信息
        login(user).then((res?) => {
            if (res?.error === "Invalid login credentials") {
                setErrorMsg(true);
            }
        });

        reset();
    };

    return (
        <div className="flex flex-col justify-center self-center items-center bg-[#121212] py-10 w-[730px] mt-8 rounded-md">
            <h1 className="font-bold text-3xl my-5">Log in to Fake Spotify</h1>
            <div className="w-[70%]">
                <hr className="h-px my-8  border-0 dark:bg-[#2a2a2a]" />
            </div>
            {/* 伺服器錯誤信息 */}
            {errorMsg && (
                <div className="flex items-center bg-red-600 w-[70%] text-xs px-4 py-2 my-3">
                    <ErrorOutlineOutlinedIcon className="mr-3" />
                    用戶名稱或密碼不正確
                </div>
            )}
            {/* 表單區域 */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col font-bold mb-3">
                    <label>Email</label>
                    <input
                        {...register("email")}
                        type="text"
                        className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                        placeholder="Email"
                        name="email"
                    />
                    {errors.email && (
                        <p className="text-red-500">{`${errors.email.message}`}</p>
                    )}
                </div>
                <div className="flex flex-col font-bold">
                    <label>Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                        placeholder="Password"
                        name="password"
                    />
                    {errors.password && (
                        <p className="text-red-500">{`${errors.password.message}`}</p>
                    )}
                </div>
                <button
                    className="rounded-full bg-spotify text-black py-3 mt-4 font-bold hover:bg-green-500 w-[324px]"
                    disabled={isSubmitting}
                >
                    Log in
                </button>
            </form>
        </div>
    );
}
