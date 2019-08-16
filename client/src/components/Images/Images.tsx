import React from 'react';

import { Image } from 'interfaces/interfaces';

import './Images.scss';

type ImagesProps = {
  fetchImages: () => Promise<void>;
  images: Image[];
}

type ImagesState = {
}

export default class Images extends React.Component<ImagesProps, ImagesState> {
  constructor(props: ImagesProps) {
    super(props);
  }

  render() {
    const maxImagesPerRow = 5;

    return (
      <div>
        {this.props.images.map((image: Image, index: number) => (
          <span>{image.filename}</span>
        ))}
      </div>
    );
  }
}
