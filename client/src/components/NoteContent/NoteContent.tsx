import React from 'react';
import SplitPane from 'react-split-pane';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import ControlBar from 'components/ControlBar/ControlBar';
import Images from 'components/Images/Images';
import { Note, Tag } from 'interfaces/interfaces';
import { store } from 'store/store';
import { Editor } from 'utils/editor';

import './NoteContent.scss';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
  html: true,
  linkify: true,
});
const animatedComponents = makeAnimated();

type NoteContentProps = {
  addNote: (data: any) => Promise<any>;
  updNote: (data: any) => Promise<any>;
  fetchNotes: () => Promise<Note[]>;
  fetchNote: (id: number) => Promise<Note>;
  toggleViewEdit: () => void;
  clearSelectedNote: () => void;
  searchByText: () => void;
  delImage: (id: number) => Promise<void>;
  setFolder: (folder: string) => void;
  fetchImages: () => Promise<any[]>;
  folder: string;
  editMode: boolean;
  selectedNote: Note;
  tags: Tag[];
  images: any[];
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
    this.editor.changeEvent = this.handleChangeEditor;
    this.editor.addUpdNote = () => { this.addUpdNote(); };
    this.editor.toggleViewEdit = () => { this.props.toggleViewEdit(); };

    this.observeStore(store, selectedItemSelector, this.onChangeSelectedItem);
    this.observeStore(store, tagsSelector, this.onChangeTags);
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

  addUpdNote() {
    if (this.props.selectedNote) {
      this.updNote();
    } else {
      this.addNote();
    }
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

    this.editor.setValue(currState.text);
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

  addNote() {
    this.editor.addNewLineAtEnd();

    const data = {
      text: this.state.value,
      tags: this.state.selectedTags,
    };

    this.props.addNote(data)
      .then((res) => {
        if (res && res.status === 200) {
          this.props.fetchNotes();
          this.props.fetchNote(res.id)
            .then((note?: Note) => {
              this.setState({
                selectedNote: note,
              });
            });
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
          if (res && res.status === 200) {
            this.props.fetchNotes();
          }
        });
    });
  }

  handleChangeEditor() {
    this.setState({
      value: this.editor.getValue(),
      markdown: md.render(this.editor.getValue()),
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

  isFolderHidden(folder: string) {
    return this.props.folder === folder ? '' : 'hidden';
  }

  render() {
    const editor =
      <textarea
        className={this.isEditorHidden()}
        ref="editor"
        onChange={this.handleChangeEditor}
        onKeyDown={this.handleKeyDownEditor}>
      </textarea>

    const preview =
      <div
        className={"preview-container " + this.isPeviewHidden()}
        dangerouslySetInnerHTML={this.createMarkdown()}>
      </div>

    const selectTag =
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
            neutral0: 'var(--background_high)', // combo background
            neutral20: 'var(--border_high)',    // combo border
            neutral30: 'var(--border_low)',     // combo border on hover
            primary: 'var(--background_med)',   // combo border on focus
            primary25: 'var(--background_med)', // combo item background on hover
            primary50: 'var(--background_low)', // combo item background on click
            danger: 'var(--accent)',            // delete icon on hover
            dangerLight: 'var(--border_low)',   // delete button background on hover
            neutral10: 'var(--background_med)', // selected tag background
            neutral80: 'var(--foreground_low)', // combo text color
          },
        })}/>

    return (
      <div id="note-content-wrap">
        <section id="note-content">
          <SplitPane
            split="horizontal"
            allowResize={false}
            minSize={75}
            defaultSize={75}
            resizerStyle={{ background: 'none' }}
            pane2Style={{ overflow: 'auto' }}
          >
            <ControlBar
              selectedNote={this.props.selectedNote}
              clearSelectedNote={this.props.clearSelectedNote}
              addNote={this.addNote}
              updNote={this.updNote}
              toggleViewEdit={this.props.toggleViewEdit}
              editMode={this.props.editMode}
              searchByText={this.props.searchByText}
              setFolder={this.props.setFolder}
            />
            <div style={{ height: '100%' }}>
              <div className={"editor-folder " + this.isFolderHidden('notes')}>
                { selectTag }
                { editor }
                { preview }
              </div>
              <div className={"images-folder " + this.isFolderHidden('images')}>
                <Images
                  images={this.props.images}
                  fetchImages={this.props.fetchImages}
                  delImage={this.props.delImage}
                />
              </div>
            </div>
          </SplitPane>
        </section>
      </div>
    );
  }
}
