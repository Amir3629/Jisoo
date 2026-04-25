export function draftReviewReply(reviewText: string): string {
  const mentionsIrritation = /irritation|burn|rash|reaction|stinging/i.test(reviewText)
  if (mentionsIrritation) {
    return 'Thank you for sharing your experience, and we are truly sorry to hear this. Please stop using the product temporarily and perform a patch test before retrying. Our care team can help with return/support options and a safer routine recommendation for your skin profile. Please contact JISOO support and we will arrange a human follow-up right away.'
  }
  return 'Thank you for your feedback. We appreciate your honesty and would love to support you better. Our team can suggest a more suitable JISOO routine and help with product guidance, exchange, or return options. Please contact JISOO support so we can follow up personally.'
}
