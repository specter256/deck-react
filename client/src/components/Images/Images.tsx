import React from 'react';
import Gallery from 'react-photo-gallery';

import './Images.scss';

type ImagesProps = {
  images: any[];
}

type ImagesState = {
}

export default class Images extends React.Component<ImagesProps, ImagesState> {
  render() {
    let gallery;

    if (this.props.images.length > 0) {
      gallery = <Gallery
                  photos={this.props.images}
                  direction={"column"}/>;
    }

    return (
      <div className="images-container">
        { gallery }
      </div>
    );
  }
}
