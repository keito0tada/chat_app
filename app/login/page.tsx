'use client';

import Link from 'next/link';
import Messages from './messages';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Database } from '@/database.types';

export default function Login() {
    const [handleName, setHandleName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        router.refresh();
    };
    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log(`login ${error}`);
        router.refresh();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div className="mt-5 rounded-md bg-slate-100">
            <input
                className="outline outline-offset-2 outline-blue-100 bg-slate-300"
                placeholder="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleSignUp}>Sign up</button>
            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    );
}
