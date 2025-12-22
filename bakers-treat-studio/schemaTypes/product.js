export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }], 
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'variants',
      title: 'Pricing & Sizes',
      type: 'array',
      description: 'Add sizes like "500g", "1kg", or "6 Pieces" with their respective prices.',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'size', type: 'string', title: 'Size/Weight (e.g. 500g or 12pc)' },
            { name: 'price', type: 'number', title: 'Price (INR)' }
          ],
          preview: {
            select: {
              title: 'size',
              subtitle: 'price'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'No size defined',
                subtitle: subtitle ? `₹${subtitle}` : 'No price defined'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'isSeasonal',
      title: 'Is Seasonal?',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this for Ganesh Chaturthi or Raksha Bandhan specials',
    },
    {
      name: 'isSoldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
      description: 'Turn this on to show the "Sold Out" badge on the website',
    },
  ],
}