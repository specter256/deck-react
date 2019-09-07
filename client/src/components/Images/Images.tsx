import React from 'react';
import Gallery from 'react-photo-gallery';
import ImageViewer from 'react-simple-image-viewer';

import Image from '../Image/Image';
import './Images.scss';

type ImagesProps = {
  images: any[];
  fetchImages: () => Promise<any[]>;
  delImage: (data: any) => Promise<any>;
}

type ImagesState = {
  isViewerOpen: boolean;
  currentImage: number;
}

export default class Images extends React.Component<ImagesProps, ImagesState> {
  constructor(props: ImagesProps) {
    super(props);

    this.state = {
      isViewerOpen: false,
      currentImage: 0,
    };
  }

  delImage(id: number) {
    const data = { id };
    this.props.delImage(data)
      .then((res) => {
        if (res && res.status === 200) {
          this.props.fetchImages();
        }
      });
  }

  showImage(photo: any) {
    this.setState({
      isViewerOpen: true,
      currentImage: this.props.images.findIndex(i => i.id === photo.id),
    });
  }

  render() {
    const { isViewerOpen, currentImage } = this.state;
    const { images } = this.props;
    let gallery;

    const imageRenderer =
      ({ key, photo }: any) => (
        <Image
          key={key}
          photo={photo}
          showImage={() => this.showImage(photo)}
          delImage={() => this.delImage(photo.id)}
          margin={'2px'}
        />
      );

    if (images.length > 0) {
      gallery = <Gallery photos={images} renderImage={imageRenderer}/>;
    }

    return (
      <div className="images-container">
        { gallery }

        {isViewerOpen && (
          <ImageViewer
            src={ images.map(i => i.src) }
            currentIndex={ currentImage }
            onClose={() => this.setState({ isViewerOpen: false })}
          />
        )}
      </div>
    );
  }
}
