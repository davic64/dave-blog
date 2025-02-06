export class Post {
  constructor({
    id,
    title,
    content,
    date = new Date(),
    meta = {},
    image,
    views = 0,
    status = "draft",
  }) {
    this.id = id;
    this.status = status;
    this._validate(title, content);
    this.title = title;
    this.content = content;
    this.date = date;
    this.image = image;
    this.meta = {
      tags: meta.tags || [],
      seoTitle: this.title,
      seoDescription: this._generateSEODescription(),
    };
    this.slug = this._generateSlug();
    this.views = views;
  }

  _validate(title, content) {
    if (!title || title.length < 5) throw new Error("Título inválido");
    if (!content || content.length < 100)
      throw new Error("Contenido demasiado corto");
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

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      date: this.date,
      meta: this.meta,
      image: this.image,
      status: this.status,
      slug: this.slug,
      views: this.views,
    };
  }

  incrementViews() {
    this.views++;
  }
}
