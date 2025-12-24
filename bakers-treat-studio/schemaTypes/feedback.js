// studio/schemas/feedback.js
export default {
  name: 'feedback',
  title: 'Customer Feedback',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'email',
      title: 'Customer Email (Optional)',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: Rule => Rule.required().min(10).max(500),
    },
    {
      name: 'isApproved',
      title: 'Approved by Admin',
      type: 'boolean',
      description: 'Only approved feedback will be visible on the website.',
      initialValue: false, // All new feedback starts as NOT approved
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      },
      readOnly: true,
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'aiFlaggedReason',
      title: 'AI Flag Reason',
      type: 'string',
      description: 'Reason if AI flagged the review (e.g., "Contains spam", "Negative but vague")',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'comment',
      isApproved: 'isApproved',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, isApproved, rating } = selection;
      const status = isApproved ? 'Approved ✅' : 'Pending ⏳';
      const stars = '⭐'.repeat(rating);
      return {
        title: `${title} (${stars})`,
        subtitle: `${status} - ${subtitle.substring(0, 50)}...`,
      };
    },
  },
};