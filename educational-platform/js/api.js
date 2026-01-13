const API = {

  baseURL: 'https://educational-api.dhimanparas605.workers.dev/',

  async getCourses() {
    const res = await fetch(`${this.baseURL}/api/courses`);
    if (!res.ok) throw new Error('Failed to load courses');
    return res.json();
  },

  async submitContactForm(data) {
    const res = await fetch(`${this.baseURL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }
};
