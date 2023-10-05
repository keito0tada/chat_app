'use client';
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
type Guild = Database['public']['Tables']['guilds']['Row'];

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [guilds, setGuilds] = useState<Guild[] | null>(null);
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
                router.push('signin');
                return;
            }
            setGuilds(guildsData);
        };
        getData();
    }, []);
    return (
        <div>
            <ChatHeader profile={profile} />
            <div className="flex">
                <GuildList guilds={guilds} />
            </div>
        </div>
    );
}
