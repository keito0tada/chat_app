'use client';
import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Dispatch, SetStateAction, useState } from 'react';

type Channel = Database['public']['Tables']['channels']['Row'];
export default function ChannelList({
    guild_id,
    channels,
    activeChannel,
    setActiveChannel,
    createNewChannel,
}: {
    guild_id: string | undefined;
    channels: Channel[] | null;
    activeChannel: Channel | null;
    setActiveChannel: Dispatch<SetStateAction<Channel | null>>;
    createNewChannel: (name: string) => Promise<void>;
}) {
    const [isActiveChannelGenMenu, setIsActiveChannelGenMenu] =
        useState<boolean>(false);
    const [channelName, setChannelName] = useState<string>('');
    const supabase = createClientComponentClient<Database>();
    return (
        <div className="flex-none w-32 mr-1 bg-purple-100">
            {isActiveChannelGenMenu ? (
                <>
                    <button
                        className="absolute bg-slate-300 bg-opacity-25 w-screen h-screen top-0 left-0"
                        onClick={() => {
                            setIsActiveChannelGenMenu(false);
                        }}
                    ></button>
                    <div className="flex flex-col absolute w-1/2 h-1/2 bg-red-200">
                        <label>チャンネルを作成</label>
                        <input
                            type="text"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        ></input>
                        <button
                            type="button"
                            onClick={async () => {
                                if (guild_id !== undefined) {
                                    await createNewChannel(channelName);
                                }
                            }}
                        >
                            作成
                        </button>
                    </div>
                </>
            ) : undefined}
            <button
                type="button"
                onClick={() => {
                    setIsActiveChannelGenMenu(true);
                }}
            >
                +
            </button>
            {channels?.map((value, index) => {
                return activeChannel === null ||
                    activeChannel.id !== value.id ? (
                    <div
                        className="rounded-md hover:bg-purple-200 text-center hover:underline"
                        key={index}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveChannel(value)}
                        >
                            {value.name}
                        </button>
                    </div>
                ) : (
                    <div
                        className="rounded-md bg-purple-200 text-center hover:underline"
                        key={index}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveChannel(value)}
                        >
                            {value.name}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
