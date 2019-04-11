import React from 'react'

export default function PlayAgain({ again }) {


    return (
        <div className="menu-item">
            <button className="btn" onClick={() => again()}>Play again?</button>
        </div>
    )
}
