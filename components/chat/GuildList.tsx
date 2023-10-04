import { Database } from '@/database.types';

type Guild = Database['public']['Tables']['guilds']['Row'];
export default function GuildList({ guilds }: { guilds: Guild[] | null }) {
    return (
        <div className="flex-none mx-3 bg-blue-100">
            {guilds?.map((value, index) => {
                return <div key={index}>{value.name}</div>;
            })}
        </div>
    );
}
