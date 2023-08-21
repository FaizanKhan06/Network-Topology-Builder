import React, { forwardRef } from 'react';

const ComponentMenuBtn = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      style={props.style}
      className={`resizers_container deleteElement_btn ${props.translate_pos} pointer_event_all`}
      onClick={props.removeComponent}
    >
      <span className="material-symbols-outlined isp">{props.btn_icon}</span>
    </button>
  );
});

ComponentMenuBtn.defaultProps = {
  translate_pos: '',
  btn_icon: 'close',
  style: {},
};

export default ComponentMenuBtn;
