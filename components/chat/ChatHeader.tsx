import { Frame } from '@/app/page';
import { Database } from '@/database.types';
import { Dispatch, SetStateAction } from 'react';

type Profile = Database['public']['Tables']['profiles']['Row'];
export default function ChatHeader({ profile }: { profile: Profile | null }) {
    return (
        <header>
            <div className="w-screen h-8 bg-slate-700">
                <nav>
                    <button className="text-slate-200 hover:text-slate-300">
                        {profile === null ? 'user not found' : profile.name}
                    </button>
                </nav>
            </div>
        </header>
    );
}
