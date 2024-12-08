// Helper to format timestamps
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  
  // Mock function to simulate bot response
  export const getBotResponse = async (userMessage) => {
    // Replace this logic with actual API integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`You said: "${userMessage}". How can I assist further?`);
      }, 1000);
    });
  };
  