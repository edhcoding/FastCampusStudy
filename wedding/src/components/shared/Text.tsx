import React from 'react'

interface TextProps {
  children: string
}

// intro의 줄바꿈이 안되는 현상이 있어서 만든 컴포넌트임

export default function Text({ children }: TextProps) {
  const message = children.split('\n').map((str, i, array) => {
    return (
      <React.Fragment key={i}>
        {str}
        {i === array.length - 1 ? null : <br />}
        {/* 인덱스가 첫 번째라면 무시하고 */}
      </React.Fragment>
    )
  })

  return <div>{message}</div>
}
