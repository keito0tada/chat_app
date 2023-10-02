import { Database } from '@/database.types';

type Message = Database['public']['Tables']['messages']['Row'];

export default function MessageField({ message }: { message: Message }) {
    return (
        <div className="rounded-md mt-3 bg-slate-200">
            <p className="text-black">{message.content}</p>
        </div>
    );
}
