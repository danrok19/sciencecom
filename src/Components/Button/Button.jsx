import React from 'react';
import './button.css';
import classNames from 'classnames';

const Button = ({children, primary, accept, secondary, decline, edition, disabled, ...rest}) => {

    const classSetup = classNames(rest.className, 'common',{
        'primary': primary,
        'accept': accept,
        'secondary': secondary,
        'decline': decline,
        'edition': edition
    })
  return (
    <button className={classSetup} style={rest.style} onClick={rest.onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
