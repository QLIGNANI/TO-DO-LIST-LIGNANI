import React from 'react'

const Badge = ({ text, alt }) => {
    return (
        <span className="mx-4 inline-flex items-center justify-center gap-1 rounded bg-emerald-500 px-1.5 text-xl text-white">
            {text}<span className="sr-only"> {alt}</span>
        </span>
    )
}

export default Badge