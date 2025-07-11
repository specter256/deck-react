import React, { ChangeEvent } from 'react';
import { MdSave, MdAddBox, MdPageview, MdEdit, MdHighlight } from 'react-icons/md';

import { Note } from 'interfaces/interfaces';
import { Themes } from 'utils/themes';

import './ControlBar.scss';

type ControlBarProps = {
  addNote: () => void;
  updNote: () => void;
  toggleViewEdit: (isEdit?: boolean) => void;
  clearSelectedNote: () => void;
  searchByText: (text?: string) => void;
  setFolder: (folder: string) => void;
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
    this.props.setFolder('notes');
    this.props.toggleViewEdit(true);
    const editor = document.querySelector('textarea');

    if (editor) {
      editor.value = '';
      setTimeout(() => { editor.focus(); });
    }
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

  toggleTheme() {
    Themes.toggle();
  }

  render() {
    return (
      <div className="control-bar">
        <button
          onClick={this.onNewNote}
          title="New note"
        >
          <MdAddBox/>
        </button>
        <button
          onClick={this.onSaveNote}
          title="Save note"
        >
          <MdSave/>
        </button>
        <button
          onClick={this.toggleViewEdit}
          title="Toggle edit / preview mode"
        >
          {this.props.editMode ? <MdPageview/> : <MdEdit/>}
        </button>
        <button
          onClick={this.toggleTheme}
          title="Toggle day / night mode"
        >
          <MdHighlight/>
        </button>
        <div className="input-container">
          <input
            type="text"
            ref={(ref) => this.searchInput = ref}
            placeholder="Search"
            onChange={this.handleChangeSearchInput}
          />
        </div>
      </div>
    );
  }
}
