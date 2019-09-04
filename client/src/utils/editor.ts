export class Editor {
  editor: HTMLTextAreaElement;
  changeEvent: () => void;

  constructor(editor: React.ReactInstance, changeEvent: () => void) {
    this.editor = editor as HTMLTextAreaElement;
    this.changeEvent = changeEvent;
  }

  public getValue(): string {
    return this.editor.value;
  }

  public setValue(value: string) {
    this.editor.value = value;
  }

  public onKeyDownEditor(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Tab') {
      event.preventDefault();
      this.insertChar('  ');
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.setIndentForNewLine();
      this.changeEvent();
    }

    if (event.ctrlKey && event.key === ']') {
      this.nextMarker();
    }
  }

  public insertChar(char: string): void {
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    const text = this.editor.value;
    const before = text.substring(0, start);
    const after  = text.substring(end, text.length);
    this.editor.value = (before + char + after);
    this.editor.innerHTML = this.editor.value;
    this.editor.selectionStart = this.editor.selectionEnd = start + char.length;
    this.editor.focus();
  }

  public setIndentForNewLine(): void {
    const start = this.editor.selectionStart;
    const text = this.editor.value;
    const before = text.substring(0, start);
    const lastBreakLine = before.lastIndexOf("\n");
    const prevLine = text.substr(lastBreakLine + 1);

    const startPos = prevLine.search(/\S/);
    const firstChars = prevLine.trim().substr(0, 2);
    this.insertChar("\n");

    if (startPos > -1) {
      if (['* ', '- '].includes(firstChars)) {
        let indent = ' '.repeat(startPos);
        indent += firstChars;
        this.insertChar(indent);
      }
    }
  }

  public addNewLineAtEnd() {
    const lastChar = this.editor.value.substr(this.editor.value.length - 1);
    if (lastChar !== "\n") {
      this.editor.value += "\n";
      this.editor.focus();
    }
  }

  public nextMarker() {

  }
}
