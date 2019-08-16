import React from 'react';
import { MdNote, MdImage, MdDelete, MdClose } from "react-icons/md";
import FlipMove from 'react-flip-move';

import { Tag } from 'interfaces/interfaces';

import './TagList.scss';

type TagListProps = {
  setFolder: (folder: string) => void;
  fetchTags: () => Promise<void>;
  addTag: (data: any) => Promise<void>;
  delTag: (data: any) => Promise<void>;
  fetchNotes: () => Promise<void>;
  searchByTag: (tag?: Tag) => void;
  fetchImages: () => Promise<void>;
  tags: Tag[];
  searchTag: Tag;
}

type TagListState = {
}

export default class TagList extends React.Component<TagListProps, TagListState> {
  tagInput: any;

  constructor(props: TagListProps) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  fetchNotes() {
    this.props.fetchNotes();
    this.props.setFolder('notes');
  }

  fetchImages() {
    this.props.fetchImages().then((images) => {
      console.log(images);
    });
    this.props.setFolder('images');
  }

  handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      this.props.addTag({
        name: event.target.value,
      }).then(() => {
        this.tagInput.value = '';
        this.props.fetchTags();
      });
    }
  }

  searchByTag(tag?: Tag) {
    this.props.searchByTag(tag);
  }

  onDelTag(id: number) {
    this.props.delTag({ id })
      .then((res: any) => {
        if (res.status === 200) {
          this.props.fetchTags();
        }
      });
  }

  render() {
    const { searchTag } = this.props;

    const searchTagBadge =
      <div className="search-tag-badge" onClick={() => this.searchByTag()}>
        <span className="label">{searchTag ? searchTag.name : ''}</span>
        <MdClose/>
      </div>

    return (
      <div className="tag-list">
        <div className="input-container">
          <input
            type="text"
            ref={(ref) => this.tagInput = ref}
            placeholder="Enter new tag..."
            onKeyDown={this.handleKeyDown}/>
        </div>
        <ul>
          <li className="fixed">
            <MdNote/><button onClick={() => this.fetchNotes()}>Notes</button>
          </li>
          <li className="fixed">
            <MdImage/><button onClick={() => this.fetchImages()}>Images</button>
          </li>
        </ul>
        {searchTag ? searchTagBadge : ''}
        <ul className="tags-container">
          <FlipMove duration={150} easing="ease-out">
            {this.props.tags.map((tag: Tag, index: number) => (
              <li key={index}>
                <button onClick={() => this.searchByTag(tag)}>{tag.name}</button>
                <div className="tag-del">
                  <MdDelete onClick={() => this.onDelTag(tag.id)}/>
                </div>
              </li>
            ))}
          </FlipMove>
        </ul>
      </div>
    );
  }
}
