'use client';
import { useContext } from 'react';
import { guildsContext } from '../layout';
export default function Page() {
    const guilds = useContext(guildsContext);

    return <label>{guilds?.[0]?.name}</label>;
}
