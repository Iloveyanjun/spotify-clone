import SignupForm from "@/components/SignupForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    //如果已經登入，就導向首頁
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/");
    }




    return <SignupForm />;
}
