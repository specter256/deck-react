import React from 'react';
import SplitPane from 'react-split-pane';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import ControlBar from 'components/ControlBar/ControlBar';
import { Note } from 'interfaces/interfaces';
import { store } from 'store/store';
import { Editor } from 'utils/editor';

import './NoteContent.scss';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const animatedComponents = makeAnimated();

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

type NoteContentProps = {
  addNote: (data: any) => Promise<any>;
  updNote: (data: any) => Promise<any>;
  fetchNotes: () => Promise<void>;
  toggleEditMode: () => void;
  clearSelectedNote: () => void;
  editMode: boolean;
  selectedNote: Note;
}

type NoteContentState = {
  value: string;
  markdown: string;
  selectedNote?: Note;
}

export default class NoteContent extends React.Component<NoteContentProps, NoteContentState> {
  editor: any;

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
    this.onChangeSelectedItem = this.onChangeSelectedItem.bind(this);
  }

  componentDidMount() {
    function selectedItem(state: any) {
      return state.fetchNote.data;
    }

    this.editor = new Editor(this.refs.editor);
    this.observeStore(store, selectedItem, this.onChangeSelectedItem);
  }

  onChangeSelectedItem(currState: any) {
    if (!currState) {
      this.setState({
        value: '',
        markdown: '',
        selectedNote: undefined,
      });
      this.editor.setValue('');
      return;
    }

    if (
      this.state.selectedNote !== undefined &&
      currState.id === this.state.selectedNote.id
    ) {
      return;
    }

    this.setState({
      value: currState.text,
      markdown: md.render(currState.text),
      selectedNote: currState,
    });
  }

  observeStore(store: any, select: any, onChange: any) {
    let currentState: any;

    function handleChange() {
      let nextState = select(store.getState());
      if (nextState !== currentState) {
        currentState = nextState;
        onChange(currentState);
      }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  }

  addNote() {
    this.editor.addNewLineAtEnd();

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
    this.editor.addNewLineAtEnd();
    this.setState({
      value: this.editor.getValue(),
    }, () => {
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
    });
  }

  handleChange(event: any) {
    this.setState({
      value: event.target.value,
      markdown: md.render(event.target.value),
    });
  }

  onKeyDownEditor(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    this.editor.onKeyDownEditor(event);
  }

  createMarkdown() {
    return {__html: this.state.markdown};
  }

  isEditorHidden() {
    return this.props.editMode ? '' : 'hidden';
  }

  isPeviewHidden() {
    return this.props.editMode ? 'hidden' : '';
  }

  render() {
    const editor =
      <textarea
        className={this.isEditorHidden()}
        ref="editor"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.onKeyDownEditor}>
      </textarea>

    const preview =
      <div
        className={"previewContainer " + this.isPeviewHidden()}
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
              clearSelectedNote={this.props.clearSelectedNote}
              addNote={this.addNote}
              updNote={this.updNote}
              toggleEditMode={this.props.toggleEditMode}
              editMode={this.props.editMode}/>
            <div style={{ height: '100%' }}>
              <div className="select-tag-container">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={selectOptions}
                  placeholder="Select tags..."
                  theme={theme => ({
                    ...theme,
                    padding: '10px',
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      neutral0: 'var(--b_medium)',
                      neutral20: 'var(--b_dark)',
                      neutral30: 'var(--b_dark)',
                      primary: 'var(--b_dark)',
                      primary25: 'var(--b_light)',
                      primary50: 'var(--b_dark)',
                      dangerLight: 'var(--accent_1)',
                      neutral10: 'var(--b_light)',
                      neutral80: 'var(--f_medium)',
                    },
                  })}/>
              </div>
              { editor }
              { preview }
            </div>
          </SplitPane>
        </section>
      </div>
    );
  }
}
