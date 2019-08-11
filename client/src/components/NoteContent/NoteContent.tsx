import React from 'react';
import SplitPane from 'react-split-pane';

import ControlBar from 'components/ControlBar/ControlBar';

import './NoteContent.scss';

type NoteContentProps = {
  saveNote: (data: any) => Promise<any>;
  fetchNotes: () => Promise<void>;
}

type NoteContentState = {
  value: string;
}

export default class NoteContent extends React.Component<NoteContentProps, NoteContentState> {
  constructor(props: NoteContentProps) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  saveNote() {
    const data = {
      text: this.state.value,
    };
    this.props.saveNote(data)
      .then((res) => {
        if (res.status === 200) {
          this.props.fetchNotes();
        }
      });
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div id="editor-content-wrap">
        <section id="editor-content">
          <SplitPane
            split="horizontal"
            allowResize={false}
            minSize={75}
            defaultSize={75}
            resizerStyle={{ background: 'none' }}>
            <ControlBar
              saveNote={this.saveNote}/>
            <div style={{ height: '100%' }}>
              <div className="input-container">
                <input placeholder="Enter title"/>
              </div>
              <textarea
                value={this.state.value}
                onChange={this.handleChange}>
              </textarea>
            </div>
          </SplitPane>
        </section>
      </div>
    );
  }
}
