import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 400, margin: 50 };
const SliderComponent =(props)=>{
  //console.log("props 4rm child",props)
  return (<div>
    <div style={wrapperStyle}>
      <Slider
       min={props.min}
        max={props.max}
       handle={handle}
       onChange={props.onChange} />
    </div>
  </div>)
}

export default SliderComponent;