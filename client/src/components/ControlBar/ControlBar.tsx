import React from 'react';
import { MdSave } from 'react-icons/md';

import { Note } from 'interfaces/interfaces';

import './ControlBar.scss';

type ControlBarProps = {
  addNote: () => void;
  updNote: () => void;
  toggleEditMode: () => void;
  editMode: boolean;
  selectedNote: Note;
}

type ControlBarState = {
}

export default class ControlBar extends React.Component<ControlBarProps, ControlBarState> {
  constructor(props: ControlBarProps) {
    super(props);
    this.onSaveNote = this.onSaveNote.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  onSaveNote() {
    if (this.props.selectedNote) {
      this.props.updNote();
    } else {
      this.props.addNote();
    }
  }

  toggleEditMode() {
    this.setState({selectedNote: null});
    this.props.toggleEditMode()
  }

  render() {
    return (
      <div className="control-bar">
        <button
          onClick={this.toggleEditMode}>
          {this.props.editMode ? 'View' : 'Edit'}
        </button>
        <button
          onClick={this.onSaveNote}
          title="Save note">
          <MdSave/>
        </button>
      </div>
    );
  }
}
