import React from 'react';
import FlipMove from 'react-flip-move';

import NoteItem from 'components/NoteItem/NoteItem';

import './NoteList.scss';
import { Note, Tag } from 'interfaces/interfaces';

type NoteListProps = {
  fetchNotes: () => Promise<Note[]>;
  fetchNote: (id: number) => Promise<Note>;
  clearSelectedNote: () => void;
  delNote: (data: any) => Promise<any>;
  searchByTag: (tag?: Tag) => void;
  setFolder: (folder: string) => void;
  notes: Note[];
  selectedNote: Note;
}

type NoteListState = {
}

export default class NoteList extends React.Component<NoteListProps, NoteListState> {
  constructor(props: NoteListProps) {
    super(props);
    this.onDelNote = this.onDelNote.bind(this);
  }

  onDelNote(id: number) {
    const data = { id };
    this.props.delNote(data)
      .then((res) => {
        if (res && res.status === 200) {
          this.props.fetchNotes();
          this.props.clearSelectedNote();
        }
      });
  }

  render() {
    return (
      <div className="note-list">
        <FlipMove duration={150} easing="ease-out">
          {this.props.notes.map((note: Note, index: number) => (
            <NoteItem
              data={note}
              key={index}
              selectedNote={this.props.selectedNote}
              fetchNote={this.props.fetchNote}
              fetchNotes={this.props.fetchNotes}
              delNote={this.onDelNote}
              searchByTag={this.props.searchByTag}
              setFolder={this.props.setFolder}
            />
          ))}
        </FlipMove>
      </div>
    );
  }
}
