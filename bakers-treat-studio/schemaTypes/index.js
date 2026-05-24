// index.js
import category from './category'
import product from './product'
import feedback from './feedback' // 1. Import the feedback file
import adminAuth from './adminAuth'

export const schemaTypes = [product, category, feedback, adminAuth] // 2. Add it here