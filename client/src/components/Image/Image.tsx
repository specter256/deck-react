import React from 'react';

import './Image.scss';

const cont: any = {
  backgroundColor: '#fff',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative'
};

const Image = ({ photo, margin, showImage, delImage }: any) => {
  return (
    <div
      className="img-wrap"
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
    >
      <span className="close-icon" onClick={delImage}>&times;</span>
      <img onClick={showImage} alt="" {...photo} />
    </div>
  );
};

export default Image;
