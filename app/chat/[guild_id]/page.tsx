'use client';
import ChannelList from '@/components/chat/ChannelList';
import ChatHeader from '@/components/chat/ChatHeader';
import GuildList from '@/components/chat/GuildList';
import { Database } from '@/database.types';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
type Profile = Database['public']['Tables']['profiles']['Row'];
type Channel = Database['public']['Tables']['channels']['Row'];
type Guild = Database['public']['Tables']['guilds']['Row'];

export default function Page({
    params: { guild_id },
}: {
    params: { guild_id: string };
}) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [activeGuild, setActiveGuild] = useState<Guild | undefined>(
        undefined
    );
    const [guilds, setGuilds] = useState<Guild[] | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        const getData = async () => {
            //fetch auth
            const {
                data: { user: userData },
            } = await supabase.auth.getUser();
            if (userData === null) {
                router.push('/signin');
                return;
            }
            setUser(userData);
            //fetch profile
            const { data: profileData, error: fetchProfileError } =
                await supabase.from('profiles').select().eq('id', userData.id);
            if (
                profileData === null ||
                fetchProfileError !== null ||
                profileData.length !== 1
            ) {
                router.push('/signin');
                return;
            }
            setProfile(profileData[0]);
            //fetch guilds
            const { data: guildsData, error: errorFetchGuild } = await supabase
                .from('guilds')
                .select();
            if (guildsData === null) {
                router.push('/signin');
                return;
            }
            setGuilds(guildsData);
            //find active guild data
            setActiveGuild(guildsData.find((value) => value.id === guild_id));
            //fetch channels
            const { data: channelsData, error: fetchChannelsError } =
                await supabase
                    .from('channels')
                    .select()
                    .eq('guild_id', guild_id);
            if (channelsData === null || fetchChannelsError !== null) {
                router.push('/signin');
                return;
            }
            setChannels(channelsData);
        };
        getData();
    }, []);
    return (
        <div>
            <ChatHeader profile={profile} />
            <div className="flex">
                <GuildList guilds={guilds} />
                <ChannelList channels={channels} />
            </div>
        </div>
    );
}