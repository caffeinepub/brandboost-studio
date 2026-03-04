export function generateCannedReply(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Thank you for reaching out! As your professional business assistant, I'm here to provide expert guidance on:

• Strategic marketing planning and execution
• Comprehensive business analysis and planning
• Customer acquisition and retention strategies
• Content creation and optimization guidance
• Performance measurement and optimization
• Data-driven decision making frameworks

I can provide detailed step-by-step guidance, create process flowcharts, develop algorithms, and assist with analytics interpretation.

How may I assist you today?`;
  }

  if (lowerMessage.includes('marketing')) {
    return 'I can help you with marketing strategies! Consider focusing on:\n\n• Social media content creation\n• Email marketing campaigns\n• SEO optimization\n• Paid advertising strategies\n• Brand positioning\n\nWhat specific marketing challenge would you like to address?';
  }

  if (lowerMessage.includes('analytics') || lowerMessage.includes('data')) {
    return 'Business analytics is crucial for growth! I can help you:\n\n• Track key performance indicators (KPIs)\n• Analyze customer behavior\n• Measure ROI on campaigns\n• Create financial reports\n• Identify growth opportunities\n\nWould you like to explore any of these areas?';
  }

  if (lowerMessage.includes('content') || lowerMessage.includes('post')) {
    return 'Content creation is key to engagement! Try our Photo & Video Maker tools to:\n\n• Create professional posters\n• Generate engaging video content\n• Design social media graphics\n• Build brand consistency\n\nVisit the Photo/Video Maker section to get started!';
  }

  return 'I understand you need assistance with your business. I specialize in:\n\n• Marketing strategy and execution\n• Business analytics and reporting\n• Content creation guidance\n• Growth optimization\n\nCould you provide more details about what you\'d like help with?';
}
