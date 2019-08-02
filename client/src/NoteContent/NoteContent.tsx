import React from 'react';
import { MdSave } from 'react-icons/md';
import './NoteContent.scss';

interface NoteContentProps {
}

interface NoteContentState {
}

export default class NoteContent extends React.Component<NoteContentProps, NoteContentState> {
  render() {
    return (
      <div id="editor-content-wrap">
        <section id="editor-content">
          <button type="submit"><MdSave/></button>
          <div className="input-container">
            <input placeholder="Enter title"/>
          </div>
          <textarea></textarea>
        </section>
      </div>
    );
  }
}
