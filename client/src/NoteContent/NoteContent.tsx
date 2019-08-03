import React from 'react';
import axios from 'axios';
import { MdSave } from 'react-icons/md';
import './NoteContent.scss';

interface NoteContentProps {
  onSave: any;
}

interface NoteContentState {
  value: string;
}

export default class NoteContent extends React.Component<NoteContentProps, NoteContentState> {
  constructor(props: NoteContentProps) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event: any) {
    axios.post('api/notes/add', {
        text: this.state.value,
      })
      .then(response => {
        this.props.onSave();
      })
      .catch(error => {
        console.log('error:', error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div id="editor-content-wrap">
        <section id="editor-content">
          <form onSubmit={this.handleSubmit}>
            <button type="submit"><MdSave/></button>
            <div className="input-container">
              <input placeholder="Enter title"/>
            </div>
            <textarea
              value={this.state.value}
              onChange={this.handleChange}>
            </textarea>
          </form>
        </section>
      </div>
    );
  }
}
