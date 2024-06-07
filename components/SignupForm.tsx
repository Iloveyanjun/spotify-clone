"use client";

import { signup } from "@/app/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, signupSchema } from "@/lib/types";

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
    });
    console.log("isSubmitting", isSubmitting);

    const onSubmit = (data: SignupSchema) => {
        const user = {
            email: data.email,
            password: data.password,
        };
        signup(user);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center mt-[5%]">
                <div className="flex flex-col">
                    <h1 className="text-5xl flex-wrap w-[324px] font-bold mb-10 ">
                        註冊即可開始收聽
                    </h1>
                    {/* Email */}
                    <label htmlFor="" className="font-bold">
                        電子郵件地址
                    </label>
                    <input
                        {...register("email")}
                        type="text"
                        className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                        placeholder="name@domain.com"
                        name="email"
                    />
                    {/* 如果有錯誤在顯示出錯誤訊息 */}
                    {errors.email && (
                        <p className="text-red-500">{`${errors.email.message}`}</p>
                    )}
                    {/* 密碼 */}
                    <label htmlFor="" className="font-bold mt-2">
                        創建密碼
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                        name="password"
                    />
                    {errors.password && (
                        <p className="text-red-500">{`${errors.password.message}`}</p>
                    )}
                    {/* 確認密碼 */}
                    <label htmlFor="" className="font-bold mt-2">
                        確認密碼
                    </label>
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        className="w-[324px] rounded-sm px-4 py-3 mt-2 bg-secondary border border-gray-500 hover:border-white transition-[0.3s]"
                        name="confirmPassword"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                    )}
                    {/* 送出按鈕 */}
                    <button
                        className="rounded-full bg-spotify text-black py-3 mt-4 font-bold hover:bg-green-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting === true ? (
                            <svg
                                className={`animate-spin h-5 self-center ml-4 w-5 text-white`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            "註冊"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
