'use client';
import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        });
        router.push('/chat');
    };

    return (
        <div className="flex flex-col w-1/2 mt-5 rounded-md bg-slate-200">
            <label className="mx-auto mt-5">Sign In</label>
            <div className="flex flex-col w-full my-5">
                <input
                    className="mx-5 rounded-md px-1"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    className="mx-5 rounded-md px-1 mt-2"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <button
                className="mx-5 rounded-md bg-blue-400 hover:bg-blue-300"
                onClick={handleSignIn}
            >
                Sign In
            </button>
            <Link
                className="mt-1 mb-1 text-center text-slate-700 hover:text-blue-500"
                href="/signup"
            >
                Sign Up
            </Link>
        </div>
    );
}
