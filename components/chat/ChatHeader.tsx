import { Database } from '@/database.types';
import Link from 'next/link';

type Profile = Database['public']['Tables']['profiles']['Row'];
export default function ChatHeader({
    profile,
}: {
    profile: Profile | undefined;
}) {
    return (
        <header>
            <div className="flex justify-end w-screen h-8 bg-slate-700">
                <nav>
                    <Link
                        className="text-slate-200 hover:text-slate-300"
                        href="/setting/profile"
                    >
                        {profile === undefined
                            ? 'user not found'
                            : profile.name}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
