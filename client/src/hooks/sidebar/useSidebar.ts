import { useState, useCallback } from "react"

export const useSidebar = () => {
    const [open, setOpen] = useState(false)

    const toggle = useCallback(() => {
        setOpen(prevOpen => !prevOpen)
    }, [])

    return { open, toggle }
}