'use client';
import { Database } from '@/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
    const [handleName, setHandleName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    handleName: handleName,
                },
            },
        });
        router.refresh();
    };

    return (
        <div className="flex flex-col w-1/2 mt-5 rounded-md bg-slate-200">
            <label className="mx-auto mt-5">Sign Up</label>
            <div className="flex flex-col w-full my-5">
                <input
                    className="mx-5 rounded-md"
                    placeholder="handle name"
                    name="handleName"
                    value={handleName}
                    onChange={(e) => setHandleName(e.target.value)}
                ></input>
                <input
                    className="mx-5 mt-2 rounded-md"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    className="mx-5 rounded-md mt-2"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <button
                className="mx-5 rounded-md bg-blue-400 hover:bg-blue-300"
                onClick={handleSignUp}
            >
                Sign Up
            </button>
            <Link
                className="mt-1 mb-1 text-center text-slate-700 hover:text-blue-500"
                href="/signin"
            >
                Sign In
            </Link>
        </div>
    );
}
