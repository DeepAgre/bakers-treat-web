export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (e.g. ₹850)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cakes', value: 'cakes' },
          { title: 'Hampers', value: 'hampers' },
          { title: 'Cookies', value: 'cookies' },
          { title: 'Brownies', value: 'brownies' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}