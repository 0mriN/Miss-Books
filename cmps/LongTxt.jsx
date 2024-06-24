const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    if (txt.length <= length) {
        return <div>{txt}</div>
    }
    const text = isExpanded ? txt : `${txt.slice(0, length)}...`
    return (
        <section>
            {text}
            <span style={{ color: 'green', cursor: 'pointer', marginLeft: '5px' }}
                onClick={toggleExpanded}>
                {isExpanded ? 'Read less' : 'Read more'}
            </span>
        </section>

    )
}