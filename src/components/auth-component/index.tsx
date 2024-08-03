"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

export const SignedIn = ({ children }: React.PropsWithChildren) => {
    const { data: session } = useSession()

    if (!session?.user) return null;

    return (
        children
    )
}


export const SignedOut = ({ children }: React.PropsWithChildren) => {
    const { data: session } = useSession()

    if (session?.user) return null;

    return (
        children
    )
}