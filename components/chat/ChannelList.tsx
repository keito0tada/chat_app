import { Database } from '@/database.types';
import { useRouter } from 'next/navigation';

type Channel = Database['public']['Tables']['channels']['Row'];
export default function ChannelList({
    guild_id,
    channels,
}: {
    guild_id: string | null;
    channels: Channel[] | null;
}) {
    return (
        <div className="flex-none bg-purple-100">
            <label>{guild_id}</label>
            {channels?.map((value, index) => {
                return <div key={index}>{value.name}</div>;
            })}
        </div>
    );
}
