import { Database } from '@/database.types';

type Message = Database['public']['Tables']['messages']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

function toMessageTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export default function MessageField({
    profile,
    message,
}: {
    profile: Profile | undefined;
    message: Message;
}) {
    return (
        <div className="box-border flex flex-col rounded-md mx-2 bg-slate-100">
            <label className="w-fit px-1 rounded-md bg-green-300">
                {profile === undefined ? 'unknown' : profile.name}
            </label>
            <label className="pl-8 text-black">{message.content}</label>
            <label className="text-right">
                {toMessageTimestamp(message.created_at)}
            </label>
        </div>
    );
}
