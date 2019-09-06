import React from 'react';
import Gallery from 'react-photo-gallery';

import Image from '../Image/Image';
import './Images.scss';

type ImagesProps = {
  images: any[];
  fetchImages: () => Promise<any[]>;
  delImage: (data: any) => Promise<any>;
}

type ImagesState = {
}

export default class Images extends React.Component<ImagesProps, ImagesState> {
  delImage(id: number) {
    const data = { id };
    this.props.delImage(data)
      .then((res) => {
        if (res && res.status === 200) {
          this.props.fetchImages();
        }
      });
  }

  render() {
    const imageRenderer =
      ({ index, key, photo }: any) => (
        <Image
          delImage={() => this.delImage(photo.id)}
          key={key}
          index={index}
          photo={photo}
          margin={'2px'}
        />
      );

    let gallery;

    if (this.props.images.length > 0) {
      gallery = <Gallery
                  photos={this.props.images}
                  renderImage={imageRenderer}/>;
    }

    return (
      <div className="images-container">
        { gallery }
      </div>
    );
  }
}
