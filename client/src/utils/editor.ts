export class Editor {
  editor: any;

  constructor(editor: React.ReactInstance) {
    this.editor = editor;
  }

  public getValue(): string {
    return this.editor.value;
  }

  public setValue(value: string) {
    this.editor.value = value;
  }

  public insertChar(char: string): void {
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    const text = this.editor.value;
    const before = text.substring(0, start);
    const after  = text.substring(end, text.length);
    this.editor.value = (before + char + after);
    this.editor.selectionStart = this.editor.selectionEnd = start + char.length;
    this.editor.focus();
  }

  public setIndentForNewLine(): void {
    const lastBreakLine = this.editor.value.lastIndexOf("\n");
    const prevLine = this.editor.value.substr(lastBreakLine + 1);
    const startPos = prevLine.search(/\S/);
    this.insertChar("\n");

    if (startPos > -1) {
      this.insertChar(' '.repeat(startPos))
    }
  }

  public addNewLineAtEnd() {
    const lastChar = this.editor.value.substr(this.editor.value.length - 1);
    if (lastChar !== "\n") {
      this.editor.value += "\n";
    }
  }
}
