// bakers-treat-studio/schemaTypes/adminAuth.js
export const adminAuth = {
  name: 'adminAuth',
  title: 'Admin Authentication',
  type: 'document',
  fields: [
    { name: 'username', title: 'Username', type: 'string' },
    { name: 'password', title: 'Password', type: 'string' }
  ]
}