import React, { ChangeEvent } from 'react';
import { MdSave, MdAddBox } from 'react-icons/md';

import { Note } from 'interfaces/interfaces';

import './ControlBar.scss';

type ControlBarProps = {
  addNote: () => void;
  updNote: () => void;
  toggleViewEdit: () => void;
  clearSelectedNote: () => void;
  searchByText: (text?: string) => void;
  editMode: boolean;
  selectedNote: Note;
}

type ControlBarState = {
}

export default class ControlBar extends React.Component<ControlBarProps, ControlBarState> {
  searchInput: any;

  constructor(props: ControlBarProps) {
    super(props);
    this.onNewNote = this.onNewNote.bind(this);
    this.onSaveNote = this.onSaveNote.bind(this);
    this.toggleViewEdit = this.toggleViewEdit.bind(this);
    this.handleChangeSearchInput = this.handleChangeSearchInput.bind(this);
  }

  onNewNote() {
    this.props.clearSelectedNote();
  }

  onSaveNote() {
    if (this.props.selectedNote) {
      this.props.updNote();
    } else {
      this.props.addNote();
    }
  }

  toggleViewEdit() {
    this.props.toggleViewEdit()
  }

  handleChangeSearchInput(event: ChangeEvent<HTMLInputElement>) {
    this.props.searchByText(event.target.value);
  }

  render() {
    return (
      <div className="control-bar">
        <button
          onClick={this.toggleViewEdit}>
          {this.props.editMode ? 'View' : 'Edit'}
        </button>
        <button
          onClick={this.onNewNote}
          title="New note">
          <MdAddBox/>
        </button>
        <button
          onClick={this.onSaveNote}
          title="Save note">
          <MdSave/>
        </button>
        <div className="input-container">
          <input
            type="text"
            ref={(ref) => this.searchInput = ref}
            placeholder="Search"
            onChange={this.handleChangeSearchInput}/>
        </div>
      </div>
    );
  }
}
