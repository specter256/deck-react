import React from 'react';
import { MdCheck, MdClose, MdDelete } from "react-icons/md";

import { Note, Tag } from 'interfaces/interfaces';

import './NoteItem.scss';

type NoteItemProps = {
  fetchNotes: () => Promise<Note[]>;
  fetchNote: (id: number) => Promise<Note>;
  delNote: (id: number) => void;
  searchByTag: (tag?: Tag) => void;
  setFolder: (folder: string) => void;
  data: Note;
  selectedNote: Note;
}

type NoteItemState = {
  showDelConfirm: boolean;
}

export default class NoteItem extends React.Component<NoteItemProps, NoteItemState> {
  constructor(props: NoteItemProps) {
    super(props);

    this.state = {
      showDelConfirm: false
    };

    this.onShowDelConfirm = this.onShowDelConfirm.bind(this);
    this.onHideDelConfirm = this.onHideDelConfirm.bind(this);
    this.onSelectNote = this.onSelectNote.bind(this);
    this.onDelNote = this.onDelNote.bind(this);
  }

  onSelectNote() {
    this.props.fetchNote(this.props.data.id);
    this.props.setFolder('notes');
  }

  onDelNote() {
    this.props.delNote(this.props.data.id);
    this.setState({ showDelConfirm: false });
  }

  onShowDelConfirm() {
    this.setState({ showDelConfirm: true });
  }

  onHideDelConfirm() {
    this.setState({ showDelConfirm: false });
  }

  getSelectedClass(): string {
    if (
      this.props.selectedNote
      && this.props.selectedNote.id === this.props.data.id
    ) {
      return 'selected';
    }

    return '';
  }

  searchByTag(tag?: Tag) {
    this.props.searchByTag(tag);
  }

  parseText() {
    const text = this.props.data.text;
    const lines: any = text.split('\n').slice(0, 5);

    lines.forEach((line: any, index: number) => {
      if (line.startsWith('# ')) {
        const content = line.substr(2);
        lines[index] = <div className="item-text-marker" key={index}>{content}</div>;
      } else if (line.startsWith('* ')) {
        const content = line.substr(2);
        lines[index] = <li key={index}>{content}</li>;
      } else if (line.trim() === '---') {
        lines[index] = <div key={index}><hr/></div>;
      } else {
        lines[index] = <div key={index}>{line || ' '}</div>;
      }
    });

    return lines;
  }

  render() {
    return (
      <div className={"item-container " + this.getSelectedClass()}>
        <div
          className="item-left-col"
          onClick={this.onSelectNote}
        >
          <div className="item-text">
            {this.parseText()}
          </div>
          <div className="item-tag-list">
            {this.props.data.tags.map((tag: Tag, index: number) => (
              <span
                className="item-tag"
                onClick={() => this.searchByTag(tag)}
                key={index}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div className="item-update-date">
            {this.props.data.update_date}
          </div>
        </div>
        <div className="item-right-col">
          <div className={`item-del ${this.state.showDelConfirm === true ? 'hidden' : ''}`}>
            <MdDelete onClick={this.onShowDelConfirm}/>
          </div>

          <div className={`item-del-confirm ${this.state.showDelConfirm === false ? 'hidden' : ''}`}>
            <MdCheck onClick={this.onDelNote}/>
            <MdClose onClick={this.onHideDelConfirm}/>
          </div>
        </div>
      </div>
    );
  }
}
