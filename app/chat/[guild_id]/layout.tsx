'use client';
import ChannelList from '@/components/chat/ChannelList';
import { Database } from '@/database.types';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

type Channel = Database['public']['Tables']['channels']['Row'];
export const channelsContext = createContext<Channel[] | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [channels, setChannels] = useState<Channel[] | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();
    const { guild_id } = useParams();
    useEffect(() => {
        const getData = async () => {
            let channel_id: string | undefined;
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
                    router.push(`/chat/${guild_id}/${channel_id}`);
                } else {
                    channel_id = activeChannel.id;
                    router.push(`/chat/${guild_id}/${channel_id}`);
                }
            } else {
                setActiveChannel(null);
                channel_id = undefined;
                router.push(`/chat/${guild_id}`);
            }
        };
        getData();
    }, [activeChannel]);

    return (
        <>
            <channelsContext.Provider value={channels}>
                <ChannelList channels={channels} />
                {children}
            </channelsContext.Provider>
        </>
    );
}