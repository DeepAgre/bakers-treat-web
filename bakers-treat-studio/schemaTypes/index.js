// bakers-treat-studio/schemaTypes/index.js
import { product } from './product'
import { category } from './category'
import { feedback } from './feedback'
import { adminAuth } from './adminAuth' // Import your new schema

export const schemaTypes = [product, category, feedback, adminAuth]