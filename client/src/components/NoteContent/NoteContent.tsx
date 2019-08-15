import React from 'react';
import SplitPane from 'react-split-pane';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import ControlBar from 'components/ControlBar/ControlBar';
import { Note, Tag } from 'interfaces/interfaces';
import { store } from 'store/store';
import { Editor } from 'utils/editor';

import './NoteContent.scss';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const animatedComponents = makeAnimated();

type NoteContentProps = {
  addNote: (data: any) => Promise<any>;
  updNote: (data: any) => Promise<any>;
  fetchNotes: () => Promise<void>;
  toggleEditMode: () => void;
  clearSelectedNote: () => void;
  editMode: boolean;
  selectedNote: Note;
  tags: Tag[];
}

type NoteContentState = {
  value: string;
  markdown: string;
  selectedNote?: Note;
  tagsOptions: [];
  selectedTags: [];
}

export default class NoteContent extends React.Component<NoteContentProps, NoteContentState> {
  editor: any;

  constructor(props: NoteContentProps) {
    super(props);

    this.state = {
      value: '',
      markdown: '',
      tagsOptions: [],
      selectedTags: [],
    };

    this.handleChangeEditor = this.handleChangeEditor.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.addNote = this.addNote.bind(this);
    this.updNote = this.updNote.bind(this);
    this.handleKeyDownEditor = this.handleKeyDownEditor.bind(this);
    this.onChangeSelectedItem = this.onChangeSelectedItem.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
  }

  componentDidMount() {
    function selectedItemSelector(state: any) {
      return state.fetchNote.data;
    }

    function tagsSelector(state: any) {
      return state.fetchTags.items;
    }

    this.editor = new Editor(this.refs.editor);
    this.observeStore(store, selectedItemSelector, this.onChangeSelectedItem);
    this.observeStore(store, tagsSelector, this.onChangeTags);
  }

  onChangeTags(currState: any) {
    this.setState({
      tagsOptions: this.parseTags(currState)
    });
  }

  onChangeSelectedItem(currState: any) {
    if (!currState) {
      this.setState({
        value: '',
        markdown: '',
        selectedNote: undefined,
        selectedTags: [],
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
      selectedTags: this.parseTags(currState.tags)
    });
  }

  parseTags(data: any) {
    const tags = data.map((tag: Tag) => {
      return {
        value: tag.id,
        label: tag.name,
      };
    });

    return tags;
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
      tags: this.state.selectedTags,
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
        tags: this.state.selectedTags,
      };

      this.props.updNote(data)
        .then((res) => {
          if (res.status === 200) {
            this.props.fetchNotes();
          }
        });
    });
  }

  handleChangeEditor(event: any) {
    this.setState({
      value: event.target.value,
      markdown: md.render(event.target.value),
    });
  }

  handleChangeSelect(option: any) {
    this.setState({
      selectedTags: option
    });
  }

  handleKeyDownEditor(event: React.KeyboardEvent<HTMLTextAreaElement>) {
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
        onChange={this.handleChangeEditor}
        onKeyDown={this.handleKeyDownEditor}>
      </textarea>

    const preview =
      <div
        className={"preview-container " + this.isPeviewHidden()}
        dangerouslySetInnerHTML={this.createMarkdown()}>
      </div>

    const selectTag =
      <div className="select-tag-container">
        <Select
          value={this.state.selectedTags}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={this.state.tagsOptions}
          onChange={this.handleChangeSelect}
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
              { selectTag }
              { editor }
              { preview }
            </div>
          </SplitPane>
        </section>
      </div>
    );
  }
}
