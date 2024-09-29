// utils/fetchUserData.js
export const fetchUserData = async (email) => {
    if (!email) return null; // Return null if no email is provided
  
    try {
      const response = await fetch(`/api/signup?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data; // Return the fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // Return null in case of error
    }
  };
  