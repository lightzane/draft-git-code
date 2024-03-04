export class TextUtil {
  static slug(text: string) {
    return text
      .replace(/[^a-z 0-9-]/gi, '') // remove special characters
      .replace(/\s/g, '-') // replace spaces with dashes
      .toLowerCase();
  }

  static pascal(text: string) {
    return this.slug(text)
      .split('-')
      .map((w) => `${w[0].toUpperCase()}${w.substring(1)}`)
      .join(' ');
  }
}
