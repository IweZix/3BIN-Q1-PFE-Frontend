class Category {
  category: string;
  subCategories: string[];

  constructor(category: string, subCategories: string[]) {
    this.category = category;
    this.subCategories = subCategories;
  }
}

export default Category;
