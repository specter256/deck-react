import React from 'react';

import NoteItem from 'components/NoteItem/NoteItem';

import './NoteList.scss';
import { Note } from 'interfaces/interfaces';

type NoteListProps = {
  notes: Note[];
}

type NoteListState = {
}

export default class NoteList extends React.Component<NoteListProps, NoteListState> {
  render() {
    return (
      this.props.notes.map((note: Note, index: number) => {
        return <NoteItem data={note} key={index}/>
      })
    );
  }
}
