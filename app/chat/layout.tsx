'use client';

import ChannelList from '@/components/chat/ChannelList';
import ChatHeader from '@/components/chat/ChatHeader';
import GuildList from '@/components/chat/GuildList';
import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createContext } from 'react';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Channel = Database['public']['Tables']['channels']['Row'];
type Guild = Database['public']['Tables']['guilds']['Row'];

export const guildsContext = createContext<Guild[] | null>(null);
export const channelsContext = createContext<Channel[] | null>(null);
export const memberProfilesContext = createContext<Profile[] | null>(null);
export const userProfileContext = createContext<Profile | undefined>(undefined);

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<Profile | undefined>(
        undefined
    );
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [activeGuild, setActiveGuild] = useState<Guild | null>(null);
    const [memberProfiles, setMemberProfiles] = useState<Profile[] | null>(
        null
    );
    const [channels, setChannels] = useState<Channel[] | null>(null);
    const [guilds, setGuilds] = useState<Guild[] | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        const getData = async () => {
            let guild_id: string | undefined = undefined;
            let channel_id: string | undefined = undefined;
            //fetch auth
            const {
                data: { user: userData },
                error: fetchAuthError,
            } = await supabase.auth.getUser();
            if (userData === null || fetchAuthError !== null) {
                router.push('/signin');
                return;
            }
            setUser(userData);
            //fetch guild ids accessible to user
            const {
                data: accessibleGuildIdsData,
                error: fetchAccessibleGuildIdsData,
            } = await supabase
                .from('guild_users')
                .select()
                .eq('user_id', userData.id);
            if (
                accessibleGuildIdsData === null ||
                fetchAccessibleGuildIdsData !== null
            ) {
                router.push('/signin');
                return;
            }
            //fetch guilds
            const { data: guildsData, error: fetchGuildError } = await supabase
                .from('guilds')
                .select()
                .in(
                    'id',
                    accessibleGuildIdsData.map((value) => value.guild_id)
                );
            if (guildsData === null || fetchGuildError) {
                router.push('/signin');
                return;
            }
            setGuilds(guildsData);
            if (guildsData.length > 0) {
                if (
                    activeGuild === null ||
                    guildsData.find((value) => value.id === activeGuild.id) ===
                        undefined
                ) {
                    setActiveGuild(guildsData[0]);
                    guild_id = guildsData[0].id;
                } else {
                    guild_id = activeGuild.id;
                }
            } else {
                setActiveGuild(null);
                guild_id = undefined;
                return;
            }
            //fetch member profiles on guilds
            const { data: guildMemberIdData, error: fetchGuildMemberIDError } =
                await supabase
                    .from('guild_users')
                    .select()
                    .eq('guild_id', guild_id);
            if (
                guildMemberIdData === null ||
                fetchGuildMemberIDError !== null
            ) {
                router.push('/signin');
                return;
            }
            const { data: profilesData, error: fetchProfilesData } =
                await supabase
                    .from('profiles')
                    .select()
                    .in(
                        'id',
                        guildMemberIdData.map((value) => value.user_id)
                    );
            if (profilesData === null || fetchProfilesData !== null) {
                router.push('/signin');
                return;
            }
            setMemberProfiles(profilesData);
            setUserProfile(
                profilesData.find((value) => value.id === userData.id)
            );
            //fetch channel ids accessible to user
            const {
                data: accessibleChannelIdsData,
                error: fetchAccessibleGuildIdsError,
            } = await supabase
                .from('channel_users')
                .select()
                .eq('user_id', userData.id);
            if (
                accessibleChannelIdsData === null ||
                fetchAccessibleGuildIdsError !== null
            ) {
                router.push('/signin');
                return;
            }
            //fetch channels accessible to user
            const { data: channelsData, error: fetchChannelsError } =
                await supabase
                    .from('channels')
                    .select()
                    .eq('guild_id', guild_id)
                    .in(
                        'id',
                        accessibleChannelIdsData.map(
                            (value) => value.channel_id
                        )
                    );
            if (channelsData === null || fetchChannelsError !== null) {
                router.push('/signin');
                return;
            }
            setChannels(channelsData);
            if (channelsData.length > 0) {
                if (
                    activeChannel === null ||
                    channelsData.find(
                        (value) => value.id === activeChannel.id
                    ) === undefined
                ) {
                    setActiveChannel(channelsData[0]);
                    channel_id = channelsData[0].id;
                } else {
                    channel_id = activeChannel.id;
                }
            } else {
                setActiveChannel(null);
                channel_id = undefined;
                return;
            }
            console.log(guild_id);
            console.log(channel_id);
            if (guild_id === undefined) {
                router.push('/chat');
            } else {
                if (channel_id === undefined) {
                    router.push(`/chat/${guild_id}`);
                } else {
                    router.push(`/chat/${guild_id}/${channel_id}`);
                }
            }
        };
        getData();
    }, [activeChannel, activeGuild]);
    return (
        <div>
            <ChatHeader profile={userProfile} />
            <div className="flex">
                <GuildList guilds={guilds} setActiveGuild={setActiveGuild} />
                <ChannelList channels={channels} />
                <guildsContext.Provider value={guilds}>
                    <channelsContext.Provider value={channels}>
                        <memberProfilesContext.Provider value={memberProfiles}>
                            <userProfileContext.Provider value={userProfile}>
                                {children}
                            </userProfileContext.Provider>
                        </memberProfilesContext.Provider>
                    </channelsContext.Provider>
                </guildsContext.Provider>
            </div>
        </div>
    );
}
