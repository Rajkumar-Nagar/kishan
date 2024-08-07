
"use client"
import React, { useLayoutEffect } from 'react'

const useDarkTheme = () => {
    useLayoutEffect(() => {
        document.querySelector("html")?.classList.add("dark")

        return () => document.querySelector("html")?.classList.remove("dark")
    }, [])

    return (
        null
    )
}

export default useDarkTheme
