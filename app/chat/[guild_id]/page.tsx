'use client';
import { useContext } from 'react';
import { guildsContext } from '../layout';
export default function Page() {
    const guilds = useContext(guildsContext);

    return (
        <label>チャンネルが存在しません。チャンネルを作ってみましょう。</label>
    );
}
