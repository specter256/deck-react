import React from 'react';
import Gallery from 'react-photo-gallery';

import { Image } from 'interfaces/interfaces';

import './Images.scss';

type ImagesProps = {
  fetchImages: () => Promise<void>;
  images: Image[];
}

type ImagesState = {
}

export default class Images extends React.Component<ImagesProps, ImagesState> {
  photos: any = [];

  constructor(props: ImagesProps) {
    super(props);

    this.props.fetchImages().then((images) => {
      this.props.images.forEach((image: Image) => {
        this.photos.push({
          src: `api/images/${image.filename}`,
          width: 1,
          height: 1,
        });
      });
    });
  }

  render() {
    return (
      <div className="images-container">
        <Gallery photos={this.photos} direction={"column"}/>
      </div>
    );
  }
}
