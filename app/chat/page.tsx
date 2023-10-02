'use client';

import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

import { Database } from '@/database.types';
import MessageField from '@/components/chat/MessageField';
import ChatHeader from '@/components/chat/Header';

type Message = Database['public']['Tables']['messages']['Row'];

export default function Page() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [authorId, setAuthorID] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<User | null>(null);
    const [content, setContent] = useState<string>('');
    const supabase = createClientComponentClient<Database>();
    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('messages').select();
            setMessages(data);
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setAuthorID(user?.id);
        };
        getData();
    }, []);
    return (
        <>
            <ChatHeader user={user} />
            <div className="w-1/2 bg-slate-100">
                {messages?.map((value, index) => {
                    return <MessageField message={value} key={index} />;
                })}
            </div>
            <input
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button
                className="rounded-md px-10 py-2 bg-purple-500 hover:bg-purple-400 text-white"
                onClick={async (e) => {
                    setContent('');
                    if (authorId !== undefined) {
                        const { data, error } = await supabase
                            .from('messages')
                            .insert({ content: content, author_id: authorId });
                        console.log(data);
                        console.log(error);
                    }
                }}
            >
                送信
            </button>
        </>
    );
}
