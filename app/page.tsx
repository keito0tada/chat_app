'use client';
import Chat from '@/components/chat/Chat';
import { Database } from '@/database.types';
import {
    User,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        const getUserData = async () => {
            const {
                data: { user: userData },
            } = await supabase.auth.getUser();
            setUser(userData);
            if (user !== null) {
                router.push('/login');
            }
        };
        getUserData();
    }, []);

    return (
        <div className="flex justify-start w-screen">
            <div className="mx-0 bg-red-100">1</div>
            <div className="mx-0 bg-blue-100">2</div>
        </div>
    );
}
