import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard() {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();
    useEffect(() => {
        const getSupabaseSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if(data === null){
                router.push('/login');
            }
        };
        getSupabaseSession();
    }, []);
}
