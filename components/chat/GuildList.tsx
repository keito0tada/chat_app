import { Database } from '@/database.types';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Guild = Database['public']['Tables']['guilds']['Row'];
export default function GuildList({ guilds }: { guilds: Guild[] | null }) {
    return (
        <div className="flex-none mx-1 w-16 px-1 pt-1 bg-blue-100">
            <button className="w-14 h-14 rounded-xl bg-red-100 hover:bg-red-200">
                +
            </button>
            {guilds?.map((value, index) => {
                return (
                    <div
                        className="mt-1 pt-4 w-14 h-14 rounded-xl bg-red-100 hover:bg-red-200 text-center"
                        key={index}
                    >
                        <Link href={`/chat/${value.id}`}>{value.name}</Link>
                    </div>
                );
            })}
        </div>
    );
}
