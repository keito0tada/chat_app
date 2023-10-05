import { Database } from '@/database.types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Channel = Database['public']['Tables']['channels']['Row'];
export default function ChannelList({
    channels,
}: {
    channels: Channel[] | null;
}) {
    return (
        <div className="flex-none w-32 mr-1 bg-purple-100">
            {channels?.map((value, index) => {
                return (
                    <div className="rounded-md hover:bg-purple-200 text-center hover:underline">
                        <Link
                            href={`/chat/${value.guild_id}/${value.id}`}
                            key={index}
                        >
                            {value.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
