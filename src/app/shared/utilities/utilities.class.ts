export class Utilities {
  /**
   * Validates keyboard input to allow only numbers, minus sign, and navigation keys
   * @param event The keyboard event to validate
   * @returns true if the key pressed is a number, minus sign, or an allowed special key
   *          (arrows, backspace, delete, tab), or if ctrl/cmd key is held down
   */
  public validateNumericInput(event: KeyboardEvent): boolean {
    let input;
    const e = event;
    const key = e.keyCode || e.which;

    // Allow keyboard shortcuts (ctrl/cmd + key)
    if (e.metaKey || e.ctrlKey) {
      return true;
    }

    // Allow navigation keys: arrows, backspace, delete, tab
    if (key === 37 || key === 38
      || key === 39 || key === 40 || key === 8 || key === 46 || key === 9) {
      return true;
    }

    // Allow minus/hyphen key (ASCII code 45)
    if (key === 45) {
      return true;
    }

    input = String.fromCharCode(key);
    return /^[0-9]+$/.test(input);
  }

  /**
   * Generates a random RGB color string
   * Used as fallback when a predefined color is not available for a pet type
   * @returns Random RGB color string in the format 'rgb(r, g, b)'
   */
  public getRandomColor(): string {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  }
}
