import React from 'react';
import { MdSave } from 'react-icons/md';

import './ControlBar.scss';

type ControlBarProps = {
  saveNote: () => void;
}

type ControlBarState = {
}

export default class ControlBar extends React.Component<ControlBarProps, ControlBarState> {
  constructor(props: ControlBarProps) {
    super(props);
    this.onSaveNote = this.onSaveNote.bind(this);
  }

  onSaveNote() {
    this.props.saveNote();
  }

  render() {
    return (
      <div className="control-bar">
        <button onClick={this.onSaveNote}><MdSave/></button>
      </div>
    );
  }
}
