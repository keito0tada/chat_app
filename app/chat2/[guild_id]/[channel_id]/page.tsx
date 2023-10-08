'use client';
import Chat from '@/components/chat/Chat';
import { useContext } from 'react';
import { channelsContext, userProfileContext } from '../../layout';

export default function Page({
    params: { guild_id, channel_id },
}: {
    params: { guild_id: string; channel_id: string };
}) {
    const userProfile = useContext(userProfileContext);
    const channels = useContext(channelsContext);

    return (
        <Chat
            profile={userProfile}
            channel={channels?.find((value) => value.id === channel_id)}
        />
    );
}
