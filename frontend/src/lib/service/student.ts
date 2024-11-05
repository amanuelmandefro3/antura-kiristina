import axios from 'axios';

interface Student {
  fullName: string;
  age: number;
  email: string;
  phoneNumber?: string;
  churchName: string;
  address: string;
  familyMemberName: string;
  familyPhoneNumber: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
}

export const registerStudent = async (student: Student) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/student/register`, student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw new Error(error.response?.data?.msg || 'An error occurred during registration');
    }
    throw error;
  }
};