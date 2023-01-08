import React from 'react'

const Button = (props) => {
  return (
    <button className={props.class} type={props.type} disabled={props?.disabled ?? false} onClick={props.onClick}>
        {props.icon && props.icon}
        {props.text && <span>{props.text}</span>}
    </button>
  )
}

export default Button;