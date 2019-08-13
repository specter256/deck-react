import React from 'react';
import SplitPane from 'react-split-pane';

import ControlBar from 'components/ControlBar/ControlBar';
import { Note } from 'interfaces/interfaces';

import './NoteContent.scss';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

type NoteContentProps = {
  addNote: (data: any) => Promise<any>;
  updNote: (data: any) => Promise<any>;
  fetchNotes: () => Promise<void>;
  toggleEditMode: () => void;
  editMode: boolean;
  selectedNote: Note;
}

type NoteContentState = {
  value: string;
  markdown: string;
  selectedNote?: Note;
}

export default class NoteContent extends React.Component<NoteContentProps, NoteContentState> {
  constructor(props: NoteContentProps) {
    super(props);

    this.state = {
      value: '',
      markdown: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updNote = this.updNote.bind(this);
    this.onKeyDownEditor = this.onKeyDownEditor.bind(this);
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      prevState.selectedNote === undefined
      || prevState.selectedNote.id !== nextProps.selectedNote.id
    ) {
      const data = nextProps.selectedNote;

      if (!data) {
        return null;
      }

      return {
        value: data.text,
        markdown: md.render(data.text),
        selectedNote: data,
      }
    }

    return null;
  }

  addNote() {
    const data = {
      text: this.state.value,
    };

    this.props.addNote(data)
      .then((res) => {
        if (res.status === 200) {
          this.props.fetchNotes();
        }
      });
  }

  updNote() {
    const data = {
      id: this.props.selectedNote.id,
      text: this.state.value,
    };

    this.props.updNote(data)
      .then((res) => {
        if (res.status === 200) {
          this.props.fetchNotes();
        }
      });
  }

  handleChange(event: any) {
    this.setState({
      value: event.target.value,
      markdown: md.render(event.target.value),
    });
  }

  onKeyDownEditor(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      // this.setState(prevState => ({
      //   value: prevState.value + '  ',
      // }));
    }
  }

  createMarkdown() {
    return {__html: this.state.markdown};
  }

  render() {
    const editor =
      <textarea
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.onKeyDownEditor}>
      </textarea>

    const preview =
      <div
        className="previewContainer"
        dangerouslySetInnerHTML={this.createMarkdown()}>
      </div>

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
              selectedNote={this.props.selectedNote}
              addNote={this.addNote}
              updNote={this.updNote}
              toggleEditMode={this.props.toggleEditMode}
              editMode={this.props.editMode}/>
            <div style={{ height: '100%' }}>
              { this.props.editMode ? editor : preview }
            </div>
          </SplitPane>
        </section>
      </div>
    );
  }
}
