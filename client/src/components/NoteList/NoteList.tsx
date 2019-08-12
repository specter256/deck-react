import React from 'react';
import FlipMove from 'react-flip-move';

import NoteItem from 'components/NoteItem/NoteItem';

import './NoteList.scss';
import { Note } from 'interfaces/interfaces';

type NoteListProps = {
  fetchNotes: () => Promise<void>;
  delNote: (data: any) => Promise<any>;
  notes: Note[];
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
        if (res.status === 200) {
          this.props.fetchNotes();
        }
      });
  }

  render() {
    return (
      <FlipMove duration={150} easing="ease-out">
        {this.props.notes.map((note: Note, index: number) => (
          <NoteItem
            data={note}
            key={index}
            fetchNotes={this.props.fetchNotes}
            delNote={this.onDelNote}/>
        ))}
      </FlipMove>
    );
  }
}
