import React from 'react';
import { MdNote, MdImage, MdDelete } from "react-icons/md";
import FlipMove from 'react-flip-move';

import { Tag } from 'interfaces/interfaces';

import './TagList.scss';

type TagListProps = {
  fetchTags: () => Promise<void>;
  addTag: (data: any) => Promise<void>;
  delTag: (data: any) => Promise<void>;
  fetchNotes: () => Promise<void>;
  tags: Tag[];
}

type TagListState = {
}

export default class TagList extends React.Component<TagListProps, TagListState> {
  tagInput: any;

  constructor(props: TagListProps) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  fetchNotes = () => {
    this.props.fetchNotes();
  }

  fetchImages = () => {
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

  onDelTag(id: number) {
    this.props.delTag({ id })
      .then((res: any) => {
        if (res.status === 200) {
          this.props.fetchTags();
        }
      });
  }

  render() {
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
        <ul className="tags-container">
          <FlipMove duration={150} easing="ease-out">
            {this.props.tags.map((tag: Tag, index: number) => (
              <li key={index}>
                <button>{tag.name}</button>
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
