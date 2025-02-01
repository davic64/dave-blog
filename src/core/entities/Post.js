export class Post {
  constructor({ title, content, date = new Date(), meta = {}, image }) {
    this._validate(title, content);
    this.title = title;
    this.content = content;
    this.date = date;
    this.image = image;
    this.slug = this._generateSlug();
    this.meta = {
      tags: meta.tags || [],
      seoTitle: meta.seoTitle || title,
      seoDescription: meta.seoDescription || this._generateSEODescription(),
    };
  }

  _validate(title, content) {
    if (!title || title.length < 5) throw new Error("Título inválido");
    // if (!content || content.length < 100)
    //   throw new Error("Contenido demasiado corto");
  }

  _generateSEODescription() {
    return `${this.title} - ${this.content.substring(0, 150)}...`;
  }

  _generateSlug() {
    return this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
}
