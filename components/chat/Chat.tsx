'use client';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Database } from '@/database.types';
import MessageField from '@/components/chat/MessageField';
import ChatHeader from '@/components/chat/ChatHeader';
import { Frame, Profile } from '@/app/page';

type Message = Database['public']['Tables']['messages']['Row'];

export default function Chat({
    user,
    profile,
    setFrame,
}: {
    user: User;
    profile: Profile;
    setFrame: Dispatch<SetStateAction<Frame>>;
}) {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [authorId, setAuthorID] = useState<string | undefined>(undefined);
    const [content, setContent] = useState<string>('');
    const supabase = createClientComponentClient<Database>();
    useEffect(() => {
        const getMessages = async () => {
            const { data, error } = await supabase.from('messages').select();
            setMessages(data);
        };
        getMessages();
    }, []);
    return (
        <>
            <ChatHeader
                handleName={profile?.name ?? 'null'}
                setFrame={setFrame}
            />
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
