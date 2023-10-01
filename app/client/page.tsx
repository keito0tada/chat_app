'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"

import type { Database } from "@/database.types"

type Todo = Database['public']['Tables']['todo']['Row']

export default function Page(){
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const supabase = createClientComponentClient<Database>();

    useEffect(() => {
        const getData =async () => {
            const {data, error} = await supabase.from('todo').select();
            console.log(`unko ${error}`);
            setTodos(data);
        }
        getData()
    }, [])
    console.log(todos);
    return todos ? <pre>{JSON.stringify(todos)}</pre> : <p>loading</p>
}