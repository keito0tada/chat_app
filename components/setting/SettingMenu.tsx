import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingMenu() {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/signin');
    };
    return (
        <div className="flex flex-col w-32 h-full px-1 py-1">
            <div className="grow flex flex-col bg-green-100">
                <Link href="/setting/profile">プロフィール</Link>
                <Link href={'/setting/notification'}>通知</Link>
            </div>
            <button
                className="bg-red-600 hover:bg-red-500 text-slate-100"
                onClick={handleSignOut}
            >
                ログアウト
            </button>
        </div>
    );
}
