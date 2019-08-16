import React from 'react';
import { MdCheck, MdClose, MdDelete } from "react-icons/md";

import { Note, Tag } from 'interfaces/interfaces';

import './NoteItem.scss';

type NoteItemProps = {
  fetchNotes: () => Promise<void>;
  fetchNote: (id: number) => Promise<void>;
  delNote: (id: number) => void;
  selectTag: (tag?: Tag) => void;
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

  selectTag(tag?: Tag) {
    this.props.selectTag(tag);
  }

  render() {
    const delIcon =
      <div className="item-del">
        <MdDelete onClick={this.onShowDelConfirm}/>
      </div>

    const delConfirmIcons =
      <div className="item-del-confirm">
        <MdCheck onClick={this.onDelNote}/>
        <MdClose onClick={this.onHideDelConfirm}/>
      </div>

    return (
      <div className={"item-container " + this.getSelectedClass()}>
        <div
          className="item-left-col"
          onClick={this.onSelectNote}>
          <div className="item-text">
            {this.props.data.text}
          </div>
          <div className="item-update-date">
            {this.props.data.update_date}
          </div>
          <div className="item-tag-list">
            {this.props.data.tags.map((tag: Tag, index: number) => (
              <span
                className="item-tag"
                onClick={() => this.selectTag(tag)}
                key={index}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="item-right-col">
          {this.state.showDelConfirm === false ? delIcon : null}
          {this.state.showDelConfirm === true ? delConfirmIcons : null}
        </div>
      </div>
    );
  }
}
