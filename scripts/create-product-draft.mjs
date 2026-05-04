#!/usr/bin/env node

let raw = ''

process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  raw += chunk
})

process.stdin.on('end', () => {
  const lines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const name = lines[0] || 'Supplier Product Draft'
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'supplier-product-draft'

  const draft = {
    name,
    category: 'to-be-confirmed',
    shortDescription: 'Draft record awaiting verified supplier information.',
    longDescription:
      'Draft product record reserved for a JISOO-packaged item. Public copy, INCI list, claims, usage, and regional compliance must be completed after supplier documentation and internal review.',
    keyBenefits: ['Benefit pending supplier documentation'],
    ingredients: ['Ingredient list pending verified INCI documentation'],
    usageInstructions: 'Usage instructions pending supplier documentation and internal review.',
    skinType: ['To be confirmed'],
    tags: ['supplier-review'],
    price: undefined,
    images: [{ id: `${slug}-image-1`, src: '/assets/placeholders/placeholder.svg', alt: `${name} placeholder`, isMain: true }],
    supplierNotes: raw.trim(),
  }

  process.stdout.write(`${JSON.stringify(draft, null, 2)}\n`)
})
