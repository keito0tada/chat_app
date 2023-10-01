'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { use, useEffect, useState } from 'react';

import { Database } from '@/database.types';

type Message = Database['public']['Tables']['messages']['Row'];

export default function Page() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [authorId, setAuthorID] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string>('');
    const supabase = createClientComponentClient<Database>();
    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('messages').select();
            setMessages(data);
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setAuthorID(user?.id);
        };
        getData();
    }, []);
    console.log(`user id ${authorId}`);
    console.log(`content ${content}`);
    return (
        <>
            <p className="text-white">aaaaa</p>
            {messages?.map((value, index) => {
                return (
                    <p className="text-white" key={index}>
                        {value.content}
                    </p>
                );
            })}
            <input
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button
                className="bg-blue-500 text-white"
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
