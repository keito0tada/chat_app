'use client';
import { Profile } from '@/app/page';
import ChannelList from '@/components/chat/ChannelList';
import Chat from '@/components/chat/Chat';
import ChatHeader from '@/components/chat/ChatHeader';
import GuildList from '@/components/chat/GuildList';
import { Database } from '@/database.types';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Message = Database['public']['Tables']['messages']['Row'];
type Channel = Database['public']['Tables']['channels']['Row'];
type Guild = Database['public']['Tables']['channels']['Row'];

export default function Page({
    params: { guild_id, channel_id },
}: {
    params: { guild_id: string; channel_id: string };
}) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [activeGuildID, setActiveGuildID] = useState<string | null>(null);
    const [activeChannelID, setActiveChannelID] = useState<string | null>(null);
    const [guilds, setGuilds] = useState<Guild[] | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);
    const [messages, setMessages] = useState<Message[] | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        const getData = async () => {
            const {
                data: { user: userData },
            } = await supabase.auth.getUser();
            if (userData === null) {
                router.push('/login');
            }
            setUser(userData);
            const { data: guilds, error: errorFetchGuild } = await supabase
                .from('guilds')
                .select();
            if (guilds === null) {
                router.push('login');
                return;
            }
            setGuilds(guilds);
            const { data: channels, error: errorFetchChannel } = await supabase
                .from('channels')
                .select();
            if (channels === null) {
                router.push('login');
            }
            setChannels(channels);
            const { data: messageData, error: fetchMessagesError } =
                await supabase
                    .from('messages')
                    .select()
                    .eq('channel_id', channel_id);
            if (messageData === null) {
                return;
            }
            setMessages(messageData);
        };
        getData();
    }, []);
    return (
        <>
            <ChatHeader profile={profile} />
            <div className="grid justify-start">
                <GuildList guilds={guilds} />
                <ChannelList guild_id={activeGuildID} channels={channels} />
                <Chat user={user} profile={profile} />
            </div>
            <div className="flex justify-end">
                <div>1</div>
                <div>2</div>
            </div>
        </>
    );
}
