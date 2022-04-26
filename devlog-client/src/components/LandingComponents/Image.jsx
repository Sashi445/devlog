import React from 'react'

const Image = ({divClass,src,imgClass,style}) => {
    return (
        <div className={divClass }>
            <img
             src={src} 
             className={imgClass}
             alt=""
             style={style} />
        </div>
    )
}
Image.defaultProps={
    divClass:"col-md-6",
    imgClass:"img-fluid rounded-end",
    style:{}
}

export default Image
