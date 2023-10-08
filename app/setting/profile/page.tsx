'use client';
import SettingMenu from '@/components/setting/SettingMenu';
import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Profile = Database['public']['Tables']['profiles']['Row'];
export default function Page() {
    const [handleName, setHandleName] = useState<string>();
    const [profile, setProfile] = useState<Profile | null>(null);
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    useEffect(() => {
        const getProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user === null) {
                router.push('/login');
                console.log('user is null');
                return;
            }
            const { data: profileData, error: fetchProfileError } =
                await supabase.from('profiles').select().eq('id', user.id);
            if (
                profileData === null ||
                fetchProfileError !== null ||
                profileData.length != 1
            ) {
                router.push('/login');
                console.log(profileData);
                return;
            }
            setProfile(profileData[0]);
            setHandleName(profileData[0] === null ? '' : profileData[0].name);
        };
        getProfile();
    }, []);
    return (
        <div className="flex justify-start w-screen h-screen">
            <SettingMenu />
            <div className="flex flex-col flex-1 bg-blue-100">
                <label className="text-xl">プロフィール</label>
                <label>・ユーザーネーム</label>
                <input
                    placeholder="ユーザー名"
                    type="text"
                    value={handleName}
                    onChange={(e) => setHandleName(e.target.value)}
                />
                <button
                    className="rounded-md w-32 h-8 bg-purple-400 hover:bg-purple-300"
                    onClick={async () => {
                        if (profile === null) {
                            return;
                        }
                        await supabase
                            .from('profiles')
                            .update({ name: handleName })
                            .eq('id', profile.id);
                    }}
                >
                    更新
                </button>
            </div>
        </div>
    );
}
