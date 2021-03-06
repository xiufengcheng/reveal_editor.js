class UndoRedo {
  constructor(editor) {
    this.editor = editor;
    this.initialize();
  }

  initialize() {
    this.queue = [];
    this.pointer = null;
  }

  couldUndo() {
    return this.pointer !== null && this.pointer > 0;
  }

  couldRedo() {
    return this.pointer !== null && this.pointer < this.queue.length - 1;
  }

  enqueue() {
    const innerHtml = this.editor.services.snapshot(this.editor);

    this.queue.splice(this.pointer);
    this.queue.push(innerHtml);
    this.pointer = this.queue.length;
  }

  undo() {
    if (!this.couldUndo()) {
      return false;
    }
    if (this.queue.length === this.pointer) {
      const innerHtml = this.editor.services.snapshot(this.editor);
      this.queue.push(innerHtml);
    }
    this.pointer -= 1;
    this.editor.reload({ html: this.queue[this.pointer] });
    return true;
  }

  redo() {
    if (!this.couldRedo()) {
      return false;
    }
    this.pointer += 1;
    this.editor.reload({ html: this.queue[this.pointer] });

    return true;
  }
}

export default UndoRedo;
