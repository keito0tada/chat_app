import { Database } from '@/database.types';

type Message = Database['public']['Tables']['messages']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export default function MessageField({
    profile,
    message,
}: {
    profile: Profile;
    message: Message;
}) {
    return (
        <div className="flex flex-col rounded-md mx-2 mt-3 bg-slate-100">
            <label className="w-fit px-1 rounded-md bg-green-300">
                {profile.name}
            </label>
            <label className="pl-8 text-black">{message.content}</label>
            <label className="self-end">
                {new Date(message.created_at).toLocaleString()}
            </label>
        </div>
    );
}
