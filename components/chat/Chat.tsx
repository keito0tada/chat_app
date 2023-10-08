'use client';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Database } from '@/database.types';
import MessageField from '@/components/chat/MessageField';
import ChatHeader from '@/components/chat/ChatHeader';
import { channel } from 'diagnostics_channel';

type Message = Database['public']['Tables']['messages']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];
type Channel = Database['public']['Tables']['channels']['Row'];

export default function Chat({
    profile,
    channel,
}: {
    profile: Profile | undefined;
    channel: Channel | undefined;
}) {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [content, setContent] = useState<string>('');
    const supabase = createClientComponentClient<Database>();
    const handleInsertMessages = () => {
        try {
            supabase
                .channel('getNewMessage')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'messages' },
                    (payload) => {
                        console.log(payload);
                        console.log(messages);
                        const {
                            id,
                            created_at,
                            author_id,
                            content,
                            channel_id,
                        } = payload.new;
                        setMessages((message) =>
                            message === null
                                ? [
                                      {
                                          id,
                                          created_at,
                                          author_id,
                                          content,
                                          channel_id,
                                      },
                                  ]
                                : message.concat([
                                      {
                                          id,
                                          created_at,
                                          author_id,
                                          content,
                                          channel_id,
                                      },
                                  ])
                        );
                    }
                )
                .subscribe();
            return () => supabase.channel('getNewMessage').unsubscribe();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const getMessages = async () => {
            if (profile === undefined || channel === undefined) return;
            const { data, error } = await supabase
                .from('messages')
                .select()
                .eq('channel_id', channel.id);
            setMessages(data);
        };
        getMessages();
        handleInsertMessages();
    }, []);
    return (
        <div className="box-border flex-auto mr-1 bg-red-100">
            <div className="flex flex-col-reverse w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-slate-200 overflow-y-scroll">
                {profile !== undefined &&
                    messages?.map((value, index) => {
                        return (
                            <MessageField
                                profile={profile}
                                message={value}
                                key={index}
                            />
                        );
                    })}
            </div>
            <div className="box-border flex w-full h-8 bg-green-100">
                <input
                    className="flex-1 rounded-md px-1 border-2 border-slate-300"
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button
                    className="flex-none rounded-md w-16 h-full bg-purple-500 hover:bg-purple-400 text-white"
                    onClick={async (e) => {
                        setContent('');
                        if (profile !== undefined && channel !== undefined) {
                            const { data, error } = await supabase
                                .from('messages')
                                .insert({
                                    channel_id: channel.id,
                                    content: content,
                                    author_id: profile.id,
                                });
                        }
                    }}
                >
                    送信
                </button>
            </div>
            {/*}
        <div className="box-border flex flex-col-reverse grow mr-1 px-1 py-1 bg-red-100">
            <div className="box-border flex flex-none self-center mb-1 w-full h-8 bg-green-100">
                <input
                    className="flex-1 rounded-md px-1 border-2 border-slate-300"
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button
                    className="flex-none rounded-md w-16 h-full bg-purple-500 hover:bg-purple-400 text-white"
                    onClick={async (e) => {
                        setContent('');
                        if (profile !== null && channel !== undefined) {
                            const { data, error } = await supabase
                                .from('messages')
                                .insert({
                                    channel_id: channel.id,
                                    content: content,
                                    author_id: profile.id,
                                });
                        }
                    }}
                >
                    送信
                </button>
            </div>
            <div className="box-border min-h-0 flex-none bg-purple-100 overflow-y-scroll">
                {profile !== null &&
                    messages?.map((value, index) => {
                        return (
                            <MessageField
                                profile={profile}
                                message={value}
                                key={index}
                            />
                        );
                    })}
            </div>
            {/*
        <div className="flex-1 bg-red-100 px-1 py-1">
            <div className="flex flex-col w-full h-full bg-blue-100">
                <div className="min-w-0 self-center w-full overflow-hidden">
                    <div className="overflow-y-scroll">
                        {profile !== null &&
                            messages?.map((value, index) => {
                                return (
                                    <MessageField
                                        profile={profile}
                                        message={value}
                                        key={index}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className="flex flex-none self-center mb-1 w-full h-8 bg-green-100">
                    <input
                        className="flex-1 rounded-md mr-1"
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <button
                        className="flex-none rounded-md w-16 h-full bg-purple-500 hover:bg-purple-400 text-white"
                        onClick={async (e) => {
                            setContent('');
                            if (profile !== null && channel !== undefined) {
                                const { data, error } = await supabase
                                    .from('messages')
                                    .insert({
                                        channel_id: channel.id,
                                        content: content,
                                        author_id: profile.id,
                                    });
                                console.log(data);
                                console.log(error);
                            }
                        }}
                    >
                        送信
                    </button>
                </div>
            </div>
                    </div>*/}
        </div>
    );
}
