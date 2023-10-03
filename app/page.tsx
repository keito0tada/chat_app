'use client';
import Chat from '@/components/chat/Chat';
import { Database } from '@/database.types';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Frame = {
    Chat: 0,
    Setting: 1,
} as const;
export type Frame = (typeof Frame)[keyof typeof Frame];
export type Profile = Database['public']['Tables']['profiles']['Row'];

export default function Page() {
    const [frame, setFrame] = useState<Frame>(Frame.Chat);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        const getUserData = async () => {
            const {
                data: { user: userData },
            } = await supabase.auth.getUser();
            setUser(userData);
            if (userData === null) {
                return;
            }
            const { data: profileData, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', userData.id);
            if (profileData === null) {
                return;
            }
            setProfile(profileData[0]);
        };
        getUserData();
    }, []);

    const ReturnFrame = () => {
        if (user === null || profile === null) {
            return <label>user or profile are null.</label>;
        }
        switch (frame) {
            case Frame.Chat:
                return (
                    <Chat user={user} profile={profile} setFrame={setFrame} />
                );
            case Frame.Setting:
                return <></>;
        }
    };
    return ReturnFrame();
}
