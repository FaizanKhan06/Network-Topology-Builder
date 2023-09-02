import React from 'react'
import PropTypes from 'prop-types';
import iconsDictionary from '../JsonFiles/IconDictionaryFile';

export default function IconsDictionary({icon,sx}) {
  const iconData = iconsDictionary[icon];

  const { component, sx: iconSx } = iconData;
  const mergedSx = { ...iconSx, ...sx };
  return (
    <>
        {React.cloneElement(component, { sx: mergedSx })}
    </>
  )
}

IconsDictionary.propTypes = {
  icon: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

IconsDictionary.defaultProps = {
  sx: {},
};

