import React from 'react';

import './Image.scss';

const cont: any = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative'
};

const Image = ({ index, photo, margin, delImage }: any) => {
  return (
    <div
      className="img-wrap"
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
    >
      <span className="close-icon" onClick={delImage}>&times;</span>
      <img alt={index} {...photo} />
    </div>
  );
};

export default Image;
