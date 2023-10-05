import { Database } from '@/database.types';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Guild = Database['public']['Tables']['guilds']['Row'];
export default function GuildList({ guilds }: { guilds: Guild[] | null }) {
    return (
        <div className="flex-none mx-1 w-16 bg-blue-100">
            <button className="w-full bg-red-100">+</button>
            {guilds?.map((value, index) => {
                return (
                    <Link href={`/chat/${value.id}`} key={index}>
                        {value.name}
                    </Link>
                );
            })}
        </div>
    );
}
