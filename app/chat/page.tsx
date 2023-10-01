'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

import { Database } from '@/database.types';

type Message = Database['public']['Tables']['messages']['Row'];

export default function Page() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const supabase = createClientComponentClient<Database>();
    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('messages').select();
            setMessages(data);
        };
        getData();
    }, []);
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
        </>
    );
}
