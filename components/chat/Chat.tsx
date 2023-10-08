'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useContext, useEffect, useState } from 'react';

import { Database } from '@/database.types';
import MessageField from '@/components/chat/MessageField';
import { memberProfilesContext, userProfileContext } from '@/app/chat/layout';

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
    const memberProfiles = useContext(memberProfilesContext);
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
                                : [
                                      {
                                          id,
                                          created_at,
                                          author_id,
                                          content,
                                          channel_id,
                                      },
                                  ].concat(message)
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
                .eq('channel_id', channel.id)
                .order('created_at', { ascending: false });
            setMessages(data);
        };
        getMessages();
        handleInsertMessages();
    }, []);
    return (
        <div className="box-border flex-auto mr-1 bg-red-100">
            <div className="flex flex-col-reverse w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-slate-200 overflow-y-scroll">
                {memberProfiles !== null &&
                    messages?.map((value, index) => {
                        return (
                            <MessageField
                                profile={memberProfiles.find(
                                    (value2) => value2.id === value.author_id
                                )}
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
        </div>
    );
}
