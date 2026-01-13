// api.js - API interactions
const API = {
    baseURL: 'https://api.example.com', // Replace with actual API URL

    async getCourses() {
        try {
            // Mock API call
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        { id: 1, title: 'Web Development', description: 'Learn HTML, CSS, JS' },
                        { id: 2, title: 'Data Science', description: 'Master Python and data analysis' },
                        { id: 3, title: 'Machine Learning', description: 'Explore AI and ML concepts' }
                    ]);
                }, 1000);
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    },

    async submitContactForm(data) {
        try {
            // Mock API call
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ success: true, message: 'Message sent successfully' });
                }, 1000);
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            return { success: false, message: 'Failed to send message' };
        }
    }
};