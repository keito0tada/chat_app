import { User } from '@supabase/supabase-js';

export default function ChatHeader({ user }: { user: User | null }) {
    return (
        <header>
            <div className="w-96 h-8 bg-slate-700">
                <nav>
                    <p className="text-slate-200">{user?.email}</p>
                </nav>
            </div>
        </header>
    );
}
